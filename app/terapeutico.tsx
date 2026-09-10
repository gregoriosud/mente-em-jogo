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
} from 'react-native';

// =================================
// DESAFIOS COM MENSAGEM E ENERGIA
// =================================
const desafiosDaSemana: Record<number, any[]> = {
  // SÁBADO / DOMINGO
  6: [
    { icone: '🛌', titulo: 'Ritmo Mais Lento', descricao: 'Não tenha pressa. Respire fundo 3 vezes e solte o ar devagar.', mensagemMotivacional: 'Às vezes, tudo o que precisamos é respirar e voltar para o presente.', energia: 10 },
    { icone: '🎶', titulo: 'Aumente o Som', descricao: 'Coloque sua música favorita para tocar agora mesmo.', mensagemMotivacional: 'A música tem o poder de mudar a nossa frequência.', energia: 10 },
    { icone: '💃', titulo: 'Solte o Corpo', descricao: 'Dance ou apenas balance o corpo no ritmo da música por 1 minuto.', mensagemMotivacional: 'Movimentar o corpo libera tensões acumuladas.', energia: 15 },
    { icone: '☕', titulo: 'Momento de Prazer', descricao: 'Tome algo que gosta saboreando cada mordida/gole.', mensagemMotivacional: 'Estar presente nos pequenos prazeres é a chave da paz.', energia: 10 },
    { icone: '✨', titulo: 'Afirmação', descricao: 'Leia: "Meu dia é de paz e eu estou presente no agora."', mensagemMotivacional: 'Palavras têm poder. Mente programada para o bem!', energia: 20 },
  ],
  // SEGUNDA-FEIRA (E dias de semana genéricos)
  1: [
    { icone: '🌬️', titulo: 'Respiração Inicial', descricao: 'Puxe o ar pelo nariz, segure e solte. 5 vezes.', mensagemMotivacional: 'O oxigênio é o combustível do cérebro!', energia: 10 },
    { icone: '🚀', titulo: 'Pulos', descricao: 'Dê 3 pulos.', mensagemMotivacional: 'Energia ativada!', energia: 10 },
    { icone: '💧', titulo: 'Água', descricao: 'Beba água.', mensagemMotivacional: 'Hidratação é vida!', energia: 10 },
    { icone: '🙌', titulo: 'Estique', descricao: 'Levante as mãos.', mensagemMotivacional: 'Tensão liberada.', energia: 10 },
    { icone: '✨', titulo: 'Afirmação', descricao: 'Leia: Eu posso.', mensagemMotivacional: 'Acredite em si!', energia: 10 },
  ]
};

// =================================
// TELA DO DESAFIO TERAPÊUTICO
// =================================
export default function TerapeuticoScreen() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mostrandoRecompensa, setMostrandoRecompensa] = useState(false); 

  const diaDeHoje = new Date().getDay(); 
  let desafiosDeHoje = desafiosDaSemana[diaDeHoje] || desafiosDaSemana[1];

  const desafio = desafiosDeHoje[etapaAtual];

  // Apenas exibe a tela de recompensa ao clicar em "Feito!"
  const concluirDesafio = () => {
    setMostrandoRecompensa(true); 
  };

  // Salva os pontos no Storage e avança o fluxo
  const irParaProximo = async () => {
    try {
      // 1. Verifica status de login
      const logadoStatus = await AsyncStorage.getItem('@is_logged');

      // SÓ SALVA A ENERGIA SE O USUÁRIO ESTIVER LOGADO
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

      // 2. Transição de etapa
      if (etapaAtual < desafiosDeHoje.length - 1) {
        setEtapaAtual(etapaAtual + 1); 
        setMostrandoRecompensa(false); 
      } else {
        router.replace('/dashboard'); 
      }
    } catch (erro) {
      console.error("Erro ao processar energia", erro);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9b74ff" translucent={false} />
      
      <View style={styles.content}>
        <Text style={styles.progresso}>Passo {etapaAtual + 1} de {desafiosDeHoje.length}</Text>
        
        <View style={styles.card}>
          {!mostrandoRecompensa ? (
            <>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{desafio.icone}</Text>
              </View>
              <Text style={styles.title}>{desafio.titulo}</Text>
              <Text style={styles.description}>{desafio.descricao}</Text>
            </>
          ) : (
            <>
              <View style={styles.energiaContainer}>
                <Text style={styles.energiaIcon}>⚡</Text>
              </View>
              <Text style={styles.recompensaTitle}>Muito Bem!</Text>
              <Text style={styles.mensagemMotivacional}>{desafio.mensagemMotivacional}</Text>
              <View style={styles.pontosBox}>
                <Text style={styles.pontosText}>+{desafio.energia} Energias</Text>
              </View>
            </>
          )}
        </View>

        {!mostrandoRecompensa ? (
          <TouchableOpacity style={styles.button} onPress={concluirDesafio}>
            <Text style={styles.buttonText}>Feito!</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonContinuar} onPress={irParaProximo}>
            <Text style={styles.buttonTextContinuar}>
              {etapaAtual === desafiosDeHoje.length - 1 ? 'Coletar e Finalizar' : 'Continuar Jornada'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.btnVoltarText}>Sair do desafio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// =================================
// ESTILOS DA TELA
// =================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9b74ff' },
  content: { 
    flex: 1, 
    width: '100%', 
    maxWidth: 450, 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 25 
  },
  progresso: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 'bold', marginBottom: 20, letterSpacing: 1 },
  card: { 
    backgroundColor: '#6C38E2', 
    width: '100%', 
    padding: 30, 
    borderRadius: 30, 
    alignItems: 'center', 
    borderWidth: 1.5, 
    borderColor: '#90EE90', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 10, 
    marginBottom: 40 
  },
  iconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  icon: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15, textAlign: 'center' },
  description: { fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 24 },
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