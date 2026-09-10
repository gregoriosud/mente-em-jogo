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
  StatusBar,
} from 'react-native';

// =================================
// TELA DE RESULTADO
// =================================
export default function ResultadoScreen() {
  return (
    // =================================
    // ESTRUTURA PRINCIPAL
    // =================================
    <SafeAreaView style={styles.container}>
      
      {/* ================================= */}
      {/* BARRA DE STATUS */}
      {/* ================================= */}
      <StatusBar barStyle="light-content" backgroundColor="#1E103C" translucent />
      
      {/* ================================= */}
      {/* CONTEÚDO DA TELA */}
      {/* ================================= */}
      <View style={styles.content}>
        
        {/* ================================= */}
        {/* ÍCONE DE CONQUISTA (TROFÉU) */}
        {/* ================================= */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeEmoji}>🏆</Text>
        </View>

        {/* ================================= */}
        {/* CABEÇALHO */}
        {/* ================================= */}
        <View style={styles.header}>
          <Text style={styles.title}>MISSÃO CUMPRIDA!</Text>
          <View style={styles.linhaSutil} />
        </View>

        {/* ================================= */}
        {/* CARD DE FEEDBACK */}
        {/* ================================= */}
        <View style={styles.cardFeedback}>
          <Text style={styles.mensagemPrincipal}>
            Sua mente é rápida e analítica! 
          </Text>
          <Text style={styles.mensagemSecundaria}>
            Você acaba de provar seu potencial e desbloqueou o acesso aos desafios diários exclusivos do Mente em Jogo.
          </Text>
        </View>

        {/* ================================= */}
        {/* AVISO DE RECOMPENSA */}
        {/* ================================= */}
        <Text style={styles.ctaAviso}>
          ✨ Crie sua conta agora para salvar seu progresso.
        </Text>

        {/* ================================= */}
        {/* BOTÕES DE AÇÃO */}
        {/* ================================= */}
        <View style={styles.botoesContainer}>
          
          <TouchableOpacity 
            style={styles.buttonCadastro} 
            onPress={() => router.push('/cadastro')}
          >
            <Text style={styles.buttonTextCadastro}>CRIAR MINHA CONTA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonLogin} 
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonTextLogin}>Já tenho uma conta</Text>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

// =================================
// ESTILOS DA TELA DE RESULTADO
// =================================
const styles = StyleSheet.create({

  // =================================
  // ESTRUTURA PRINCIPAL
  // =================================
  container: { 
    flex: 1, 
    backgroundColor: '#1E103C' // Roxo escuro profundo com estilo de jogo
  },

  // =================================
  // CONTEÚDO PRINCIPAL
  // =================================
  content: { 
    flex: 1, 
    width: '100%',         // Ocupa a tela
    maxWidth: 450,         // <-- A MÁGICA AQUI: Trava o crescimento em 450px
    alignSelf: 'center',   // Centraliza esse bloco no meio da tela do PC
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 30, 
  },

  // =================================
  // BADGE / ÍCONE DE TROFÉU
  // =================================
  badgeContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)', // Detalhe dourado na borda
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  badgeEmoji: {
    fontSize: 38,
  },

  // =================================
  // CABEÇALHO
  // =================================
  header: { 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: '#FFFFFF', 
    letterSpacing: 1.5, 
    textAlign: 'center', 
    textShadowColor: 'rgba(74, 97, 216, 0.8)', 
    textShadowOffset: { width: 0, height: 2 }, 
    textShadowRadius: 10 
  },
  linhaSutil: { 
    height: 2, 
    width: 100, 
    backgroundColor: '#4A61D8', 
    marginTop: 10, 
    borderRadius: 2
  },

  // =================================
  // CARD DE FEEDBACK
  // =================================
  cardFeedback: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  mensagemPrincipal: { 
    fontSize: 17, 
    color: '#EAF2FF', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    marginBottom: 10, 
  },
  mensagemSecundaria: { 
    fontSize: 14, 
    color: 'rgba(234,242,255,0.7)', 
    textAlign: 'center', 
    lineHeight: 21, 
  },

  // =================================
  // AVISO DE RECOMPENSA
  // =================================
  ctaAviso: {
    fontSize: 14,
    color: '#FFD700', // Dourado para destacar a recompensa
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 25,
  },

  // =================================
  // BOTÕES DE AÇÃO
  // =================================
  botoesContainer: { 
    width: '100%', 
    alignItems: 'center', 
    gap: 15 
  },
  buttonCadastro: { 
    backgroundColor: '#4A61D8', 
    width: '100%', 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: 'center', 
    shadowColor: '#4A61D8', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 8, 
    elevation: 8 
  },
  buttonTextCadastro: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  buttonLogin: { 
    paddingVertical: 8,
    marginTop: 5
  },
  buttonTextLogin: { 
    color: '#EAF2FF', 
    fontSize: 15, 
    fontWeight: '600', 
    textDecorationLine: 'underline' 
  }
});