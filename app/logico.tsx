// =================================
// IMPORTAÇÕES
// =================================
import React, { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// =================================
// DESAFIOS DE LÓGICA (COM MENSAGEM, ENERGIA E RESPOSTAS)
// =================================
const desafiosDaSemana: Record<number, any[]> = {
  6: [
    { icone: '🧠', titulo: 'Memória Rápida', descricao: 'Memorize os números: 4 - 8 - 15 - 16 - 23 - 42. Feche os olhos e tente repeti-los de trás para frente.', mensagemMotivacional: 'Sua memória é como um músculo!', energia: 10 },
    { icone: '🧮', titulo: 'Matemática Mental', descricao: 'Responda rápido na sua cabeça: Quanto é 15% de 200?', mensagemMotivacional: 'Pequenos cálculos mantêm o cérebro afiado.', energia: 10, respostasAceitas: ['30', 'trinta'] },
    { icone: '🧩', titulo: 'Padrão Numérico', descricao: 'Qual é o próximo número da sequência: 2, 4, 8, 16, ... ?', mensagemMotivacional: 'Reconhecer padrões é a base da lógica!', energia: 15, respostasAceitas: ['32', 'trinta e dois'] },
    { icone: '👀', titulo: 'Foco Visual', descricao: 'Olhe ao seu redor e encontre rapidamente 3 objetos que sejam azuis.', mensagemMotivacional: 'Mudar o foco de atenção ajuda o cérebro.', energia: 10 },
    { icone: '❓', titulo: 'Charada do Dia', descricao: 'O que tem chaves, mas não abre portas?', mensagemMotivacional: 'Um piano foi uma ótima resposta 🎹', energia: 20, respostasAceitas: ['piano', 'um piano', 'o piano'] },
  ],
  1: [
    { icone: '🔤', titulo: 'Sequência', descricao: 'A, C, E, G... Qual a próxima letra?', mensagemMotivacional: 'Padrões estimulam o cérebro.', energia: 10, respostasAceitas: ['i', 'letra i'] },
    { icone: '🧮', titulo: 'Cálculo', descricao: 'Resolva rápido: 7 x 8 = ?', mensagemMotivacional: 'Memória de trabalho ativada!', energia: 10, respostasAceitas: ['56', 'cinquenta e seis'] },
    { icone: '🤔', titulo: 'Dedução', descricao: 'Se todo gato mia, e Félix é um gato, o que Félix faz?', mensagemMotivacional: 'Pensamento dedutivo.', energia: 10, respostasAceitas: ['mia', 'ele mia', 'miar'] },
    { icone: '❓', titulo: 'Enigma', descricao: 'Se você me tem, quer me compartilhar. Se me compartilha, não me tem. O que sou?', mensagemMotivacional: 'Enigmas fortalecem o cérebro.', energia: 15, respostasAceitas: ['segredo', 'um segredo', 'o segredo'] },
    { icone: '🧠', titulo: 'Contagem', descricao: 'Conte de 100 até 80, diminuindo de 3 em 3.', mensagemMotivacional: 'Excelente para o foco!', energia: 20 },
  ]
};

// =================================
// TELA DA JORNADA LÓGICA
// =================================
export default function LogicoScreen() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mostrandoRecompensa, setMostrandoRecompensa] = useState(false); 
  const [respostaUsuario, setRespostaUsuario] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const diaDeHoje = new Date().getDay(); 
  let desafiosDeHoje = desafiosDaSemana[diaDeHoje] || desafiosDaSemana[1];
  const desafio = desafiosDeHoje[etapaAtual];

  // Valida a resposta digitada (se houver) e exibe o feedback visual
  const concluirDesafio = () => {
    if (desafio.respostasAceitas) {
      const textoDigitado = respostaUsuario.trim().toLowerCase();
      const acertou = desafio.respostasAceitas.some((resposta: string) => 
        textoDigitado === resposta.toLowerCase()
      );

      if (!acertou) {
        setMensagemErro('Hum, não é bem isso... Tente de novo! 🤔');
        return; 
      }
    }

    setMensagemErro('');
    setMostrandoRecompensa(true); 
  };

  // Salva a energia com a chave individual do usuário e avança o fluxo
  const irParaProximo = async () => {
    try {
      const logadoStatus = await AsyncStorage.getItem('@is_logged');

      if (logadoStatus === 'true') {
        const dadosSalvos = await AsyncStorage.getItem('@conta_usuario');

        if (dadosSalvos) {
          const conta = JSON.parse(dadosSalvos);
          const chaveEnergiaUsuario = `@energia_${conta.email}`;

          const energiaSalva = await AsyncStorage.getItem(chaveEnergiaUsuario);
          let energiaAtual = parseInt(energiaSalva || '0', 10);

          if (isNaN(energiaAtual)) {
            energiaAtual = 0;
          }

          const novaEnergia = energiaAtual + desafio.energia;
          await AsyncStorage.setItem(chaveEnergiaUsuario, novaEnergia.toString());
          console.log(`Energia salva para ${conta.email}! Total agora:`, novaEnergia);
        }
      } else {
        console.log("Modo visitante: energia não acumulada.");
      }

      setRespostaUsuario('');
      setMensagemErro('');

      if (etapaAtual < desafiosDeHoje.length - 1) {
        setEtapaAtual(etapaAtual + 1); 
        setMostrandoRecompensa(false); 
      } else {
        router.replace('/dashboard'); 
      }
    } catch (erro) {
      console.error("Erro ao processar a energia", erro);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9b74ff" translucent={false} />
      <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <Text style={styles.progresso}>Passo {etapaAtual + 1} de {desafiosDeHoje.length}</Text>

          <View style={styles.card}>
            {!mostrandoRecompensa ? (
              <>
                <View style={styles.iconContainer}><Text style={styles.icon}>{desafio.icone}</Text></View>
                <Text style={styles.title}>{desafio.titulo}</Text>
                <Text style={styles.description}>{desafio.descricao}</Text>

                {desafio.respostasAceitas && (
                  <View style={styles.inputContainer}>
                    <TextInput 
                      style={styles.input}
                      placeholder="Qual é a resposta?"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      value={respostaUsuario}
                      onChangeText={(text) => { setRespostaUsuario(text); setMensagemErro(''); }}
                      autoCorrect={false}
                    />
                    {mensagemErro !== '' && <Text style={styles.erroText}>{mensagemErro}</Text>}
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={styles.energiaContainer}><Text style={styles.energiaIcon}>⚡</Text></View>
                <Text style={styles.recompensaTitle}>Brilhante!</Text>
                <Text style={styles.mensagemMotivacional}>{desafio.mensagemMotivacional}</Text>
                <View style={styles.pontosBox}><Text style={styles.pontosText}>+{desafio.energia} Energias</Text></View>
              </>
            )}
          </View>

          {!mostrandoRecompensa ? (
            <TouchableOpacity style={styles.button} onPress={concluirDesafio}>
              <Text style={styles.buttonText}>{desafio.respostasAceitas ? 'Verificar Resposta' : 'Resolvido!'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonContinuar} onPress={irParaProximo}>
              <Text style={styles.buttonTextContinuar}>{etapaAtual === desafiosDeHoje.length - 1 ? 'Coletar e Finalizar' : 'Próximo Desafio'}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
            <Text style={styles.btnVoltarText}>Sair do desafio</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// =================================
// ESTILOS DA TELA
// =================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9b74ff' },
  keyboardContainer: { flex: 1 },
  content: { flex: 1, width: '100%', maxWidth: 450, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 25 },
  progresso: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 'bold', marginBottom: 20, letterSpacing: 1 },
  card: { backgroundColor: '#6C38E2', width: '100%', padding: 30, borderRadius: 30, alignItems: 'center', borderWidth: 1.5, borderColor: '#87CEEB', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 10, marginBottom: 40 },
  iconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  icon: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15, textAlign: 'center' },
  description: { fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 24 },
  inputContainer: { width: '100%', marginTop: 25, alignItems: 'center' },
  input: { width: '100%', height: 55, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', color: '#FFF', fontSize: 18, paddingHorizontal: 20, textAlign: 'center', outlineStyle: 'none' as any },
  erroText: { color: '#FF8A8A', fontSize: 14, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  energiaContainer: { marginBottom: 15 },
  energiaIcon: { fontSize: 50 },
  recompensaTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 15, textAlign: 'center' },
  mensagemMotivacional: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', lineHeight: 24, fontStyle: 'italic', marginBottom: 25 },
  pontosBox: { backgroundColor: 'rgba(255, 215, 0, 0.2)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: '#FFD700' },
  pontosText: { color: '#FFD700', fontSize: 18, fontWeight: '900' },
  button: { backgroundColor: '#FFFFFF', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  buttonText: { color: '#6C38E2', fontSize: 18, fontWeight: 'bold' },
  buttonContinuar: { backgroundColor: '#FFD700', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  buttonTextContinuar: { color: '#6C38E2', fontSize: 18, fontWeight: '900' },
  btnVoltar: { marginTop: 25, padding: 10 },
  btnVoltarText: { color: 'rgba(255,255,255,0.7)', fontSize: 15, textDecorationLine: 'underline' }
});