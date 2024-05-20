import { useState, useEffect, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, ScrollView, Text, Pressable, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { alert } from '../hooks/alert.js'

import { styles } from '../styles/styles';
import { listarUsuarios, excluirUsuario } from '../services/api.js';
import { userProfileTypeName } from '../hooks/userProfileTypeName.js';
import { AuthContext } from '../context/AuthContext.js';

import Button from '../components/Button.jsx';
import ModalCadastro from '../components/ModalCadastro';

const isMobile = Dimensions.get('window').width < 600;

export default function CadastroUser({ navigation }) {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = async () => {
    try {
      const listaUsuarios = await listarUsuarios(user.id);
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error.message);
    }
  };


  const handleExcluirUsuario = async (userId) => {
    try {
      await excluirUsuario(userId);
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
    }
  };

  const confirmarExclusao = (userId) => {
    alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este usuário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            handleExcluirUsuario(userId);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.username}</Text>
      <Text style={styles.itemText}>{userProfileTypeName(item.profileType)}</Text>
      <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <View style={styles.main}>

      <View style={styles.cadastroLeft}>
        <Text style={styles.title}>Cadastro de Pessoas</Text>


        <View style={styles.schoolIconContainer}>
          <Text style={isMobile ? styles.overlayTitleMobile : styles.overlayTitle}> ACMA </Text>
          <MaterialIcons name="school" style={isMobile ? styles.overlayTitleMobile : styles.overlayIcon} />
        </View>


        <Pressable onPress={() => navigation.navigate('LoggedArea')}>
          <MaterialIcons name="exit-to-app" marginBottom={20} marginLeft={20} size={35} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.cadastroRight}>
        <ModalCadastro
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          carregarUsuarios={carregarUsuarios}
        >

        </ModalCadastro>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nome</Text>
            <Text style={styles.headerText}>Username</Text>
            <Text style={styles.headerText}>Perfil</Text>
          </View>
      <ScrollView horizontal>
          <FlatList

            contentContainerStyle={styles.flatListRenderItem}
            data={usuarios}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          </ScrollView>
        </View>

        <Button onPress={() => setModalVisible(true)} marginBottom={20}>
          <Text style={styles.title}>Adicionar Usuário</Text>
        </Button>
      </View>
    </View>
  );
}
