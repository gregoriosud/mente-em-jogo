import React, { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform, ScrollView } from 'react-native';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [campoAtivo, setCampoAtivo] = useState('');
  
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const fazerCadastro = async () => {
    setMensagemErro('');
    setMensagemSucesso('');

    const nomeFormatado = nome.trim();
    const emailFormatado = email.trim().toLowerCase();
    const senhaFormatada = senha.trim();
    const confirmarSenhaFormatada = confirmarSenha.trim();

    if (!nomeFormatado || !emailFormatado || !senhaFormatada || !confirmarSenhaFormatada) { 
      setMensagemErro('Por favor, preencha todos os campos.'); 
      return; 
    }

    if (senhaFormatada !== confirmarSenhaFormatada) {
      setMensagemErro('As senhas não coincidem!');
      return;
    }

    try {
      const contasSalvas = await AsyncStorage.getItem('@lista_usuarios');
      let listaUsuarios = contasSalvas ? JSON.parse(contasSalvas) : [];

      const jaExiste = listaUsuarios.some(
        (usuario: any) => (usuario.email || '').toLowerCase() === emailFormatado
      );

      if (jaExiste) {
        setMensagemErro('Este e-mail já está cadastrado!');
        return;
      }

      const novaConta = { 
        nome: nomeFormatado, 
        email: emailFormatado, 
        senha: senhaFormatada, 
        energia: 0 
      };

      listaUsuarios.push(novaConta);

      await AsyncStorage.setItem('@lista_usuarios', JSON.stringify(listaUsuarios));
      
      setMensagemSucesso('Conta criada com sucesso! 🎉');
      
      setTimeout(() => {
        router.replace('/login');
      }, 1500);

    } catch (error) { 
      setMensagemErro('Erro interno ao tentar salvar a conta.'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Imagem posicionada de forma independente */}
      <Image 
        source={require('../assets/images/inicial.1.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          
          <View style={styles.header}>
            <Text style={styles.title}>CRIAR CONTA</Text>
            <View style={styles.linhaSutil} />
          </View>

          <View style={styles.form}>
            <TextInput 
              style={[styles.input, campoAtivo === 'nome' && styles.inputAtivo]} 
              placeholder="Seu Nome" 
              placeholderTextColor="rgba(255,255,255,0.70)" 
              value={nome} 
              onChangeText={setNome} 
              onFocus={() => setCampoAtivo('nome')} 
              onBlur={() => setCampoAtivo('')} 
            />
            
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

            <TextInput 
              style={[styles.input, campoAtivo === 'confirmarSenha' && styles.inputAtivo]} 
              placeholder="Confirmar Senha" 
              placeholderTextColor="rgba(255,255,255,0.70)" 
              secureTextEntry 
              value={confirmarSenha} 
              onChangeText={setConfirmarSenha} 
              onFocus={() => setCampoAtivo('confirmarSenha')} 
              onBlur={() => setCampoAtivo('')} 
            />
            
            {mensagemErro !== '' && <Text style={styles.errorText}>{mensagemErro}</Text>}
            
            {mensagemSucesso !== '' && (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>{mensagemSucesso}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={fazerCadastro}>
              <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Já tem uma conta?</Text>
              <TouchableOpacity onPress={() => router.replace('/login')}>
                <Text style={styles.registerLink}>Faça Login</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
              <Text style={styles.btnVoltarText}>Voltar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#9b74ff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  }, 
  backgroundImage: {
    position: 'absolute',
    top: -60, // Ajuste esse valor para subir mais (ex: -100) ou descer (ex: -20)
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '110%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30
  }, 
  content: { 
    width: '100%', 
    maxWidth: 400, 
    alignItems: 'center' 
  }, 
  header: { 
    width: '100%', 
    alignItems: 'center',
    marginBottom: 15
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
    marginBottom: 14, 
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
  successContainer: {
    backgroundColor: '#00C9A7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    elevation: 6
  },
  successText: { 
    color: '#FFFFFF',
    fontSize: 16, 
    fontWeight: 'bold', 
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