import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Center, Image } from "@gluestack-ui/themed";
import { StatusBar} from "react-native"

import BackagroundImg from "@assets/mainBackground.png";
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
    
    StatusBar.setBarStyle("dark-content")
    StatusBar.setBackgroundColor("transparent")
    StatusBar.setTranslucent(true)
  }, []);

  return (
    <Center flex={1}>
     
      <Image
        w="$full"
        h="$full"
        source={BackagroundImg}
        defaultSource={BackagroundImg}
        alt="estética e beleza"
        position="absolute"
      />
      {/* Conteúdo central */}
      <Center>
        <Logo width={160} height={160} />
        <Text color="#7C7C8A" fontSize="$2xl" fontWeight="bold">
          LORENA
        </Text>
      </Center>
    </Center>
  );
}
