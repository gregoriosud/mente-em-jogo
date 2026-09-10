import React, { useState, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ImageBackground, Platform } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [campoAtivo, setCampoAtivo] = useState('');
  const [erroMsg, setErroMsg] = useState('');

  useFocusEffect(
    useCallback(() => { 
      setEmail(''); 
      setSenha(''); 
      setErroMsg(''); 
    }, [])
  );

  const fazerLogin = async () => {
    setErroMsg(''); 
    
    const emailDigitado = email.trim().toLowerCase();
    const senhaDigitada = senha.trim();
    
    if (!emailDigitado || !senhaDigitada) { 
      setErroMsg('Preencha seu e-mail e senha.'); 
      return; 
    }
    
    try {
      const contasSalvas = await AsyncStorage.getItem('@lista_usuarios');

      if (contasSalvas !== null) {
        const listaUsuarios = JSON.parse(contasSalvas);
        
        const usuarioEncontrado = listaUsuarios.find((conta: any) => {
          const emailBanco = (conta.email || '').trim().toLowerCase();
          const senhaBanco = (conta.senha || '').trim();
          return emailBanco === emailDigitado && senhaBanco === senhaDigitada;
        });
        
        if (usuarioEncontrado) {
          await AsyncStorage.setItem('@conta_usuario', JSON.stringify(usuarioEncontrado));
          await AsyncStorage.setItem('@is_logged', 'true'); 
          router.push({ pathname: '/dashboard', params: { atualiza: Date.now() } });
        } else { 
          setErroMsg('E-mail ou senha inválidos!'); 
        }
      } else { 
        setErroMsg('Nenhuma conta encontrada. Cadastre-se!'); 
      }
    } catch (error) { 
      setErroMsg('Falha ao tentar logar.'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../assets/images/inicial.1.png')} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.content}>
            
            <View style={styles.header}>
              <Text style={styles.title}>BEM-VINDO</Text>
              <View style={styles.linhaSutil} />
            </View>

            <View style={styles.form}>
              <TextInput 
                style={[styles.input, campoAtivo === 'email' && styles.inputAtivo]} 
                placeholder="E-mail" 
                placeholderTextColor="rgba(255,255,255,0.70)" 
                keyboardType="email-address" 
                autoCapitalize="none" 
                value={email} 
                onChangeText={setEmail} 
                onFocus={() => setCampoAtivo('email')} 
                onBlur={() => setCampoAtivo('')} 
              />
              
              <TextInput 
                style={[styles.input, campoAtivo === 'senha' && styles.inputAtivo]} 
                placeholder="Senha" 
                placeholderTextColor="rgba(255,255,255,0.70)" 
                secureTextEntry 
                value={senha} 
                onChangeText={setSenha} 
                onFocus={() => setCampoAtivo('senha')} 
                onBlur={() => setCampoAtivo('')} 
              />
              
              {erroMsg !== '' && (
                <Text style={styles.errorText}>{erroMsg}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={fazerLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableOpacity>
              
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Não tem uma conta?</Text>
                <TouchableOpacity onPress={() => router.push('/cadastro')}>
                  <Text style={styles.registerLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
                <Text style={styles.btnVoltarText}>Voltar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#9b74ff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  }, 
  background: { 
    flex: 1, 
    width: '100%', 
    height: '100%' 
  }, 
  overlay: {
    flex: 1,
    justifyContent: 'center', // Volta a centralizar no meio
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, // Empurra suavemente para baixo sem exagerar
  },
  content: { 
    width: '100%', 
    maxWidth: 400, 
    alignItems: 'center', 
  }, 
  header: { 
    width: '100%', 
    alignItems: 'center',
    marginBottom: 20
  }, 
  title: { 
    fontSize: 34, 
    fontWeight: '900', 
    color: '#EAF2FF', 
    letterSpacing: 1, 
    textAlign: 'center', 
    textShadowColor: 'rgba(255, 255, 255, 0.2)', 
    textShadowOffset: { width: 0, height: 2 }, 
    textShadowRadius: 10 
  }, 
  linhaSutil: { 
    height: 2, 
    width: 150, 
    backgroundColor: '#FFFFFF', 
    opacity: 0.4, 
    marginTop: 10 
  }, 
  form: { 
    width: '100%', 
    alignItems: 'center',
    marginTop: 10 
  }, 
  input: { 
    width: '100%', 
    height: 55, 
    borderWidth: 1, 
    borderColor: 'rgba(234,242,255,0.55)', 
    borderRadius: 30, 
    paddingHorizontal: 22, 
    marginBottom: 16, 
    color: '#FFFFFF', 
    backgroundColor: 'rgba(255,255,255,0.16)', 
    fontSize: 16 
  }, 
  inputAtivo: { 
    borderColor: '#EAF2FF', 
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.22)' 
  }, 
  errorText: { 
    color: '#FF8A8A', 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    textAlign: 'center' 
  }, 
  button: { 
    backgroundColor: '#4A61D8', 
    width: '80%', 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: 'center', 
    marginTop: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 5, 
    elevation: 8 
  }, 
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  }, 
  registerContainer: { 
    flexDirection: 'row', 
    marginTop: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }, 
  registerText: { 
    color: '#EAF2FF', 
    fontSize: 15 
  }, 
  registerLink: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: 'bold', 
    marginLeft: 5, 
    textDecorationLine: 'underline' 
  },
  btnVoltar: {
    marginTop: 20,
    padding: 10
  },
  btnVoltarText: {
    color: '#FFF', 
    fontSize: 15, 
    textDecorationLine: 'underline'
  }
});