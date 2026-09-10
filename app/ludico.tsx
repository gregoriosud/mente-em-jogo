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
// DESAFIOS LÚDICOS (COM MENSAGEM E ENERGIA)
// =================================
const desafiosDaSemana: Record<number, any[]> = {
  // SÁBADO
  6: [
    { 
      icone: '🤪', 
      titulo: 'Careta no Espelho', 
      descricao: 'Vá até o espelho mais próximo e faça a careta mais engraçada que você conseguir por 10 segundos.',
      mensagemMotivacional: 'Rir de si mesmo é libertador! O humor abaixa os níveis de cortisol (o hormônio do estresse) instantaneamente.',
      energia: 10
    },
    { 
      icone: '🎨', 
      titulo: 'Desenho às Cegas', 
      descricao: 'Pegue um papel e uma caneta. Feche os olhos e tente desenhar uma casa ou um cachorro em 30 segundos.',
      mensagemMotivacional: 'A perfeição é a inimiga da diversão. O importante não é o resultado, mas se permitir brincar no processo!',
      energia: 15
    },
    { 
      icone: '🐧', 
      titulo: 'Andar Divertido', 
      descricao: 'Levante-se e ande pela sala fingindo ser um pinguim ou um robô por 1 minuto.',
      mensagemMotivacional: 'Quebrar padrões físicos comuns tira sua mente do "piloto automático" e traz você de volta para o momento presente.',
      energia: 15 
    },
    { 
      icone: '👽', 
      titulo: 'Palavra Inventada', 
      descricao: 'Invente uma palavra que não existe no dicionário e diga em voz alta qual seria o significado dela.',
      mensagemMotivacional: 'Sua imaginação não tem limites. Estimular a criatividade pura é como um parquinho de diversões para a mente!',
      energia: 10
    },
    { 
      icone: '🧸', 
      titulo: 'Memória Boa', 
      descricao: 'Feche os olhos e lembre de uma brincadeira ou desenho animado que você amava quando criança. Dê um sorriso.',
      mensagemMotivacional: 'Conectar-se com a sua criança interior traz uma alegria leve e reconfortante para o coração.',
      energia: 20 
    },
  ],
  // SEGUNDA-FEIRA (Backup)
  1: [
    { 
      icone: '🎤', titulo: 'Cantor de Chuveiro', descricao: 'Cante o refrão da sua música favorita bem alto.',
      mensagemMotivacional: 'Cantar libera endorfinas, os hormônios da felicidade! Não importa a afinação.', energia: 10
    },
    { icone: '🦸‍♂️', titulo: 'Pose de Super-Herói', descricao: 'Fique de pé com as mãos na cintura e peito estufado por 1 minuto.', mensagemMotivacional: 'A postura corporal muda como você se sente sobre si mesmo. Você é incrível!', energia: 15 },
    { icone: '😛', titulo: 'Trava-Línguas', descricao: 'Diga rápido 3 vezes: "O rato roeu a roupa do rei de Roma".', mensagemMotivacional: 'Um tropeço divertido na fala para exercitar o cérebro e dar risada.', energia: 10 },
    { icone: '✏️', titulo: 'Com a Outra Mão', descricao: 'Escreva seu nome num papel usando a mão que você não costuma usar.', mensagemMotivacional: 'Criando novas conexões neurais através do desafio motor!', energia: 10 },
    { icone: '💭', titulo: 'Superpoder', descricao: 'Se pudesse ter um superpoder só hoje, qual seria? Imagine como usaria.', mensagemMotivacional: 'Sonhar acordado é um exercício saudável de expansão mental.', energia: 20 },
  ]
};

// =================================
// TELA DA JORNADA LÚDICA
// =================================
export default function LudicoScreen() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mostrandoRecompensa, setMostrandoRecompensa] = useState(false); 

  const diaDeHoje = new Date().getDay(); 
  
  let desafiosDeHoje = desafiosDaSemana[diaDeHoje];
  if (!desafiosDeHoje || desafiosDeHoje.length < 5) {
    desafiosDeHoje = desafiosDaSemana[1]; 
  }

  const desafio = desafiosDeHoje[etapaAtual];

  const concluirDesafio = () => {
    setMostrandoRecompensa(true); 
  };

  const irParaProximo = async () => {
    try {
      // 1. Verifica se está logado
      const logadoStatus = await AsyncStorage.getItem('@is_logged');
      
      // SÓ SALVA A ENERGIA SE ESTIVER LOGADO
      if (logadoStatus === 'true') {
        const dadosSalvos = await AsyncStorage.getItem('@conta_usuario');
        
        if (dadosSalvos) {
          const conta = JSON.parse(dadosSalvos);
          
          // CHAVE ÚNICA BASEADA NO EMAIL DO USUÁRIO
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
        console.log("Usuário visitante: energia não acumulada.");
      }

      // 2. Continua o fluxo normalmente
      if (etapaAtual < desafiosDeHoje.length - 1) {
        setEtapaAtual(etapaAtual + 1); 
        setMostrandoRecompensa(false); 
      } else {
        router.replace('/dashboard'); 
      }
    } catch (error) {
      console.log('Erro ao processar energia', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9b74ff" translucent={false} />
      
      <View style={styles.content}>
        
        <Text style={styles.progresso}>
          Passo {etapaAtual + 1} de {desafiosDeHoje.length}
        </Text>

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
              <Text style={styles.recompensaTitle}>Sensacional!</Text>
              <Text style={styles.mensagemMotivacional}>{desafio.mensagemMotivacional}</Text>
              
              <View style={styles.pontosBox}>
                <Text style={styles.pontosText}>+{desafio.energia} Energias</Text>
              </View>
            </>
          )}

        </View>

        {!mostrandoRecompensa ? (
          <TouchableOpacity style={styles.button} onPress={concluirDesafio}>
            <Text style={styles.buttonText}>Fiz e me diverti!</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonContinuar} onPress={irParaProximo}>
            <Text style={styles.buttonTextContinuar}>
              {etapaAtual === desafiosDeHoje.length - 1 ? 'Coletar e Finalizar' : 'Próxima Brincadeira'}
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
    justifyContent: 'center', // Correção feita aqui!
    paddingHorizontal: 25, 
  },
  progresso: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 'bold', marginBottom: 20, letterSpacing: 1 },
  
  card: { 
    backgroundColor: '#6C38E2',
    width: '100%', 
    padding: 30, 
    borderRadius: 30, 
    alignItems: 'center', 
    borderWidth: 1.5, 
    borderColor: '#FF7F50', 
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