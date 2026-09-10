import React, { useState, useCallback } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';

export default function DashboardScreen() {
  const params = useLocalSearchParams(); 
  
  const [isLogged, setIsLogged] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('Visitante');
  const [energia, setEnergia] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          // 1. VERIFICA SE ESTÁ LOGADO
          const logadoStatus = await AsyncStorage.getItem('@is_logged');
          
          if (logadoStatus === 'true') {
            const dadosSalvos = await AsyncStorage.getItem('@conta_usuario');
            if (dadosSalvos) {
              const conta = JSON.parse(dadosSalvos);
              setNomeUsuario(conta.nome ? conta.nome.split(' ')[0] : 'Usuário');
              setIsLogged(true);

              // Carrega a energia atrelada ao e-mail do usuário
              const chaveEnergiaUsuario = `@energia_${conta.email}`;
              const energiaSalva = await AsyncStorage.getItem(chaveEnergiaUsuario);
              let energiaAtual = parseInt(energiaSalva || '0', 10);
              setEnergia(isNaN(energiaAtual) ? 0 : energiaAtual);
            }
          } else {
            setNomeUsuario('Visitante');
            setIsLogged(false);

            // Tenta carregar a energia genérica de visitante caso exista
            const energiaSalva = await AsyncStorage.getItem('@energia_usuario');
            let energiaAtual = parseInt(energiaSalva || '0', 10);
            setEnergia(isNaN(energiaAtual) ? 0 : energiaAtual);
          }
        } catch (error) { 
          console.log('Erro ao carregar dados', error); 
        }
      };
      
      carregarDados();
    }, [])
  );

  const fazerLogout = async () => {
    await AsyncStorage.setItem('@is_logged', 'false'); 
    router.replace('/'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9b74ff" translucent />
      <View style={styles.content}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.sideHeader} />
          
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Olá, {nomeUsuario}!</Text>
            <Text style={styles.subtitle}>Sua jornada te espera.</Text>
          </View>

          <View style={[styles.sideHeader, styles.headerRight]}>
            <View style={styles.energyBadge}>
              <Text style={styles.energyIcon}>⚡</Text>
              <Text style={styles.energyText}>{energia}</Text>
            </View>
            
            {isLogged && (
              <TouchableOpacity style={styles.btnLogout} onPress={fazerLogout}>
                <Text style={styles.btnLogoutText}>Sair</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* LISTA DE JORNADAS */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* TERAPÊUTICO */}
          <TouchableOpacity style={[styles.card, { borderColor: '#4A61D8' }]} activeOpacity={0.8} onPress={() => router.push('/terapeutico')}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🧘‍♂️</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Terapêutico</Text>
                <Text style={styles.cardDesc}>Relaxe e cuide da sua mente.</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* LÓGICO */}
          <TouchableOpacity style={[styles.card, { borderColor: '#00C9A7' }]} activeOpacity={0.8} onPress={() => router.push('/logico')}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🧩</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Lógico</Text>
                <Text style={styles.cardDesc}>Desafie seu raciocínio.</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* LÚDICO */}
          <TouchableOpacity style={[styles.card, { borderColor: '#FF7F50' }]} activeOpacity={0.8} onPress={() => router.push('/ludico')}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🎨</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Lúdico</Text>
                <Text style={styles.cardDesc}>Desperte sua criatividade.</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* BOTÃO DE LOGIN PARA VISITANTES */}
          {!isLogged && (
            <TouchableOpacity style={styles.btnAcessarConta} onPress={() => router.push('/login')}>
              <Text style={styles.btnAcessarContaText}>Fazer Login</Text>
            </TouchableOpacity>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#9b74ff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: { 
    flex: 1, 
    width: '100%', 
    maxWidth: 450, 
    alignSelf: 'center' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    paddingHorizontal: 25, 
    paddingTop: 80, // Aumentado de 45 para 80 para empurrar tudo mais para baixo
    paddingBottom: 20 
  },
  sideHeader: { width: 80 }, 
  userInfo: { flex: 1, alignItems: 'center' },
  greeting: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4, textAlign: 'center' },
  headerRight: { alignItems: 'flex-end' },
  energyBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,215,0,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFD700', marginBottom: 10 },
  energyIcon: { fontSize: 16, marginRight: 5 },
  energyText: { color: '#FFD700', fontWeight: 'bold', fontSize: 16 },
  btnLogout: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 15 },
  btnLogoutText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40, paddingTop: 15 },
  card: { backgroundColor: '#6C38E2', padding: 20, borderRadius: 25, marginBottom: 20, borderWidth: 1.5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 6 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: 45, marginRight: 20 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  cardDesc: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  btnAcessarConta: { 
    backgroundColor: '#4A61D8', 
    paddingVertical: 14, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    alignSelf: 'center', 
    alignItems: 'center', 
    marginTop: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 5, 
    elevation: 5 
  },
  btnAcessarContaText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});