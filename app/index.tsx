import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform } from 'react-native';

export default function HomeTabScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Gradiente idêntico ao da imagem no fundo */}
      <LinearGradient
        colors={['#927BE9', '#BFA0FC', '#D7C2FF']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Imagem de fundo isolada */}
      <Image 
        source={require('../assets/images/inicial.1.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.content}>
          
          {/* Bloco de Texto */}
          <View style={styles.header}>
            <Text style={styles.title}>
              MENTE <Text style={styles.titleSmall}>EM</Text> JOGO
            </Text>
            <View style={styles.linhaSutil} />
            <Text style={styles.subtitle}>
              Desafios diários para{'\n'}pensar, sentir e criar.
            </Text>
          </View>

          {/* Botão */}
          <TouchableOpacity style={styles.button} onPress={() => router.push('/dashboard')}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  backgroundImage: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: { 
    width: '100%', 
    maxWidth: 400, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
  },
  title: { 
    fontSize: 42, 
    fontWeight: '900', 
    color: '#EAF2FF', 
    letterSpacing: 1, 
    marginBottom: 12, 
    textShadowColor: 'rgba(255, 255, 255, 0.2)', 
    textShadowOffset: { width: 0, height: 2 }, 
    textShadowRadius: 10, 
    textAlign: 'center' 
  },
  titleSmall: { 
    fontSize: 28 
  },
  linhaSutil: { 
    height: 2, 
    width: 220, 
    backgroundColor: '#FFFFFF', 
    opacity: 0.4, 
    marginBottom: 20 
  },
  subtitle: { 
    fontSize: 22, 
    color: '#EAF2FF', 
    textAlign: 'center', 
    lineHeight: 28, 
    fontWeight: '500', 
    textShadowColor: 'rgba(0, 0, 0, 0.1)', 
    textShadowOffset: { width: 0, height: 1 }, 
    textShadowRadius: 3 
  },
  button: { 
    backgroundColor: '#4A61D8', 
    paddingVertical: 18, 
    width: '80%',
    maxWidth: 280,
    borderRadius: 30, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 5, 
    elevation: 8 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
});