import { useContext, useEffect, useState } from 'react';
import { Linking, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { styles } from '../styles/styles.js';
import { AuthContext } from '../context/AuthContext.js';

import { fetchUserFunctions } from '../services/api.js';
import { userProfileTypeName } from '../hooks/userProfileTypeName.js';


export default function LoggedArea({ navigation }) {
  const { user } = useContext(AuthContext);
  const [userFunctions, setUserFunctions] = useState([]);

  useEffect(() => {
    const loadUserFunctions = async () => {
      try {
        console.log(user)
        const userFunctions = await fetchUserFunctions(user.profileType);
        setUserFunctions(userFunctions);
      } catch (error) {
      }
    };

    loadUserFunctions();
  }, [user.profileType]);


  const handleFunctionClick = (functionName) => {
    switch (functionName) {
      case 'Cadastro de Usuários':
        navigation.navigate('CadastroUser');
        console.log(functionName);
        break;
      case 'E-mail':
        Linking.openURL('https://gmail.com/');
        console.log(functionName);
        break;
      default:

        console.log("default ", functionName);
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleFunctionClick(item.functionName)}>
      <View style={styles.functionContainer} columnWrapperStyle={{ justifyContent: 'space-between' }}>
        <AntDesign style={styles.functionIcon} size={isMobile ? 50 : 150} name={item.icon} />
        <Text style={styles.functionName}>{item.functionName}</Text>
      </View>
    </TouchableOpacity>
  );

  const isMobile = Dimensions.get('window').width < 600;

  return (
    <View style={styles.main}>
      <View style={styles.loggedContainerLeft}>
        <View style={styles.sidebar}>
          <View >
            <Text style={styles.welcome}>Bem vindo, </Text>
            <Text style={styles.title}>{user.name}</Text>
          </View>

          <View  style={styles.schoolIconContainer}>
            <Text style={isMobile ? styles.overlayTitleMobile : styles.overlayTitle}> ACMA </Text>
            <MaterialIcons name="sports" style={isMobile ? styles.overlayTitleMobile : styles.overlayIcon}/>
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <MaterialIcons name="exit-to-app" marginBottom={20} marginLeft={20}size={35} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View>

        </View>

        <Text></Text>

      </View>



      <View style={styles.loggedContainerRight}>
        <Text style={styles.titleRoxo}>Área do {userProfileTypeName(user.profileType)}</Text>
        <FlatList
          data={userFunctions}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.functionName}-${index}`}
          showsVerticalScrollIndicator={true}
          numColumns={isMobile ? 1 : 2}
          contentContainerStyle={isMobile ? styles.flatListContainerMobile : styles.flatListContainer}
          columnWrapperStyle={isMobile ? null : { justifyContent: 'space-between' }}
        />
      </View>
    </View>
  );
}