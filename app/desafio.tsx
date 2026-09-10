// =================================
// IMPORTAÇÕES
// =================================
import React from 'react';
import { router } from 'expo-router';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

// =================================
// TELA DE DESAFIO
// =================================
export default function DesafioScreen() {
  
  // Função para quando o usuário acertar
  const respostaCerta = () => {
    router.push('/resultado');
  };

  // Função para resposta errada
  const respostaErrada = () => {
    alert('Ops, quase lá! Tente pensar um pouquinho diferente. 🤔');
  };

  return (
    // =================================
    // ESTRUTURA PRINCIPAL
    // =================================
    <SafeAreaView style={styles.container}>
      
      {/* ================================= */}
      {/* BARRA DE STATUS */}
      {/* ================================= */}
      <StatusBar barStyle="light-content" backgroundColor="#0B0914" translucent />
      
      {/* ================================= */}
      {/* CONTEÚDO DA TELA */}
      {/* ================================= */}
      <View style={styles.content}>
        
        {/* ================================= */}
        {/* ÍCONE DE AÇÃO (RAIO) */}
        {/* ================================= */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>⚡️</Text>
        </View>

        {/* ================================= */}
        {/* CABEÇALHO */}
        {/* ================================= */}
        <View style={styles.header}>
          <Text style={styles.title}>DESAFIO RÁPIDO</Text>
          <View style={styles.linhaSutil} />
        </View>

        {/* ================================= */}
        {/* CARTÃO DO ENIGMA */}
        {/* ================================= */}
        <View style={styles.cardEnigma}>
          <Text style={styles.pergunta}>Qual número completa a sequência?</Text>
          <Text style={styles.sequencia}>2 - 4 - 8 - 16 - <Text style={styles.interrogacao}>?</Text></Text>
        </View>

        {/* ================================= */}
        {/* BOTÕES DE RESPOSTA */}
        {/* ================================= */}
        <View style={styles.botoesContainer}>
          
          <TouchableOpacity style={styles.buttonOption} onPress={respostaErrada}>
            <Text style={styles.buttonText}>24</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOption} onPress={respostaCerta}>
            <Text style={styles.buttonText}>32</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOption} onPress={respostaErrada}>
            <Text style={styles.buttonText}>20</Text>
          </TouchableOpacity>
          
        </View>

      </View>
    </SafeAreaView>
  );
}

// =================================
// ESTILOS DA TELA DE DESAFIO
// =================================
const styles = StyleSheet.create({

  // =================================
  // ESTRUTURA PRINCIPAL
  // =================================
  container: { 
    flex: 1, 
    backgroundColor: '#0B0914' // Fundo super escuro, quase preto
  },

  // =================================
  // CONTEÚDO PRINCIPAL (COM TRAVA DE LARGURA)
  // =================================
  content: { 
    flex: 1, 
    width: '100%',
    maxWidth: 450,         // Trava a largura para não esticar no PC
    alignSelf: 'center',   // Centraliza no PC
    alignItems: 'center', 
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    paddingHorizontal: 30, 
  },

  // =================================
  // ÍCONE DE RAIO
  // =================================
  iconContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(0, 255, 255, 0.1)', // Fundo ciano bem transparente
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  iconEmoji: {
    fontSize: 32,
  },

  // =================================
  // CABEÇALHO
  // =================================
  header: { 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 30,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '900', 
    color: '#FFFFFF', 
    letterSpacing: 2, 
    textAlign: 'center', 
  },
  linhaSutil: { 
    height: 2, 
    width: 80, 
    backgroundColor: '#00FFFF', // Linha ciano (neon)
    marginTop: 10, 
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },

  // =================================
  // CARTÃO DO ENIGMA
  // =================================
  cardEnigma: { 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    padding: 35, 
    borderRadius: 20, 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 40, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  pergunta: { 
    color: 'rgba(255, 255, 255, 0.7)', 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sequencia: { 
    color: '#FFFFFF', 
    fontSize: 36, 
    fontWeight: 'bold', 
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 255, 255, 0.5)', 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 15,
  },
  interrogacao: {
    color: '#00FFFF', // Interrogação em destaque neon
  },

  // =================================
  // BOTÕES DE OPÇÃO
  // =================================
  botoesContainer: { 
    width: '100%', 
    gap: 15 
  },
  buttonOption: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    paddingVertical: 18, 
    borderRadius: 15, // Mais quadrado para um visual tech/radical
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(74, 97, 216, 0.4)', // Borda azulada
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 22, 
    fontWeight: 'bold' 
  }
});