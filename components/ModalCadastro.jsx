import { useState, useContext } from 'react';
import { View, Text, TextInput, Picker, Modal } from 'react-native';

import { styles } from '../styles/styles';
import { AuthContext } from '../context/AuthContext.js';
import { cadastrarUsuarios } from '../services/api.js';

import Button from '../components/Button.jsx';

export default function ModalCadastro(props) {
    const { user } = useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [perfil, setPerfil] = useState('');

    const cadastrarUsuario = async () => {
        try {
            await cadastrarUsuarios(username, senha, perfil, nome);
            props.setModalVisible(false);
            props.carregarUsuarios();
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalVisible}
            onRequestClose={() => props.setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cadastro de Usuário</Text>

                    <TextInput
                        style={styles.modalInput}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />

                    <TextInput
                        style={styles.modalInput}
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />

                    <TextInput
                        style={styles.modalInput}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />

                    {user.profileType === 'ADMINISTRACAO' && (
                        <View style={styles.modalInput}>
                            <Text>Perfil</Text>
                            <Picker
                                selectedValue={perfil}
                                onValueChange={(itemValue) => setPerfil(itemValue)}
                            >
                                <Picker.Item label="Selecione o perfil" value="" />
                                <Picker.Item label="PROFESSOR" value="PROFESSOR" />
                                <Picker.Item label="ADMINISTRACAO" value="ADMINISTRACAO" />
                                <Picker.Item label="ALUNO" value="ALUNO" />
                            </Picker>
                        </View>
                    )}

                    <Button onPress={cadastrarUsuario}>
                        Cadastrar Usuário
                    </Button>

                    <Button onPress={() => props.setModalVisible(false)}>
                        Fechar
                    </Button>
                </View>
            </View>
        </Modal>
    )
}
