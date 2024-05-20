import { Text, TextInput, View, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { useContext, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from '../styles/styles.js';
import { AuthContext } from '../context/AuthContext.js';

import Button from '../components/Button.jsx';

const isMobile = Dimensions.get('window').width < 600;

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext)
  const [erro, setErro] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    try {
      const response = await login(mail, password);
      if (response === "success") {
        navigation.navigate('LoggedArea');
      } else {
        setErro(response);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      setErro("Erro ao autenticar usuário");
    }
  }

  async function recuperarSenha() {
  
  }

  return (
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        <Text style={isMobile ? styles.overlayTitleMobile : styles.overlayTitle}> ACMA </Text>

        <MaterialIcons name="sports" style={isMobile ? styles.overlayTitleMobile : styles.overlayIcon} />

      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}> LOGIN </Text>
        <TextInput style={styles.input} value={mail} onChangeText={setMail} placeholder='Usuário' />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Senha' secureTextEntry />
        <Button onPress={handleLogin}>
          ENTRAR
        </Button>
        <Text>
          {erro}
        </Text>
        <TouchableOpacity onPress={recuperarSenha} style={{ marginTop: 10, color: '#ff7e26' }}>
          Recuperar senha
        </TouchableOpacity>
      </View>
    </View>
  );
}
