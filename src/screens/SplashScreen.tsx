import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Center, Image, VStack } from "@gluestack-ui/themed";
import { StatusBar } from "react-native";

import background from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SplashScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    // Configurar a StatusBar transparente com ícones escuros
    StatusBar.setBarStyle("dark-content"); // Ícones escuros
    StatusBar.setBackgroundColor("transparent"); // Cor de fundo transparente
    StatusBar.setTranslucent(true); // Tornar a StatusBar translúcida
  }, []);

  return (
    <Center flex={1}>
      {/* Imagem de fundo */}
      <Image
        w="$full"
        h="$full"
        source={background}
        defaultSource={background}
        alt="estética e beleza"
        position="absolute"
      />
      {/* Conteúdo central ajustado */}
      <Center flex={1}>
        <VStack flex={1} justifyContent="flex-end" alignItems="center" mb={100}>
          <Logo width={160} height={160} />
          <Text color="#7C7C8A" fontSize="$2xl" fontWeight="bold">
            LORENA
          </Text>
        </VStack>
      </Center>
    </Center>
  );
}
