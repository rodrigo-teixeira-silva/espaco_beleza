import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Center, Image, VStack } from "@gluestack-ui/themed";
import { StatusBar, Animated } from "react-native"; // Importação do Animated do React Native

import gold from "@assets/gold.png";
import Logo from "@assets/logo.svg";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Loading } from "@components/Loading";

export function SplashScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [showLoading, setShowLoading] = useState(false); // Para controlar a exibição do loading
  const logoScale = new Animated.Value(1); // Controla a escala do logo
  const logoOpacity = new Animated.Value(1); // Controla a opacidade do logo
  const eloreOpacity = new Animated.Value(0); // Controla a opacidade da palavra "Élore"
  const loadingOpacity = new Animated.Value(0); // Controla a opacidade do componente Loading

  useEffect(() => {
    // Animações sequenciais para logo e texto "Élore"
    Animated.sequence([
      // Animação do logo
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.5, // Reduz a escala do logo
          duration: 1000, // Duração da animação do logo
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0, // Faz o logo desaparecer
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // Animação do texto "Élore" após a animação do logo
      Animated.timing(eloreOpacity, {
        toValue: 1, // Torna a palavra "Élore" visível
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Mostra o loading após a animação do texto "Élore"
    setTimeout(() => {
      setShowLoading(true); // Mostra o loading após a transição
      Animated.timing(loadingOpacity, {
        toValue: 1, // Aumenta a opacidade do loading
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000); // Mostra o loading após 2s da animação do logo

    const navigationTimer = setTimeout(() => {
      navigation.navigate("Started");
    }, 5000); // Tempo total para a navegação (3s de splash + 2s de transição)

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  useEffect(() => {
    // Configurar a StatusBar transparente com ícones escuros
    StatusBar.setBarStyle("dark-content"); // Ícones escuros
    StatusBar.setBackgroundColor("transparent"); // Cor de fundo transparente
    StatusBar.setTranslucent(true); // Tornar a StatusBar translúcida
  }, []);

  return (
    <Center flex={1}>
      <Image
        w="$full"
        h="$full"
        source={gold}
        defaultSource={gold}
        alt="estética e beleza"
        position="absolute"
      />
      {/* Conteúdo central ajustado */}
      <Center flex={1} position="relative" justifyContent="center" alignItems="center">
        <VStack flex={1} justifyContent="center" alignItems="center" position="absolute">
          <Animated.View
            style={{
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
              position: "absolute", // Garante que o logo fique no mesmo lugar enquanto anima
              top: 0, // Alinha o logo no topo da tela, antes de transitar
            }}
          >
            <Logo width={160} height={160} />
          </Animated.View>
          <Animated.View
            style={{
              opacity: eloreOpacity,
              position: "absolute", // Garante que o texto também se mantenha centralizado
              top: 180, // Posiciona o texto abaixo do logo com um pequeno espaçamento
            }}
          >
            <Text color="#00000" fontSize="$3xl" fontWeight="bold" >
              LORE
            </Text>
          </Animated.View>
          {showLoading && (
            <Animated.View
              style={{
                opacity: loadingOpacity,
                position: "absolute", // Garante que o loading fique no centro da tela
                top: "100%", // Posiciona o loading abaixo do texto
              }}
            >
              <Loading />
            </Animated.View>
          )}
        </VStack>
      </Center>
    </Center>
  );
}
