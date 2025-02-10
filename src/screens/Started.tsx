import { useEffect } from "react";
import { StatusBar } from "react-native";
import { VStack, Image, Center, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import lorenaa from "@assets/lorenaa.png";
import Logo from "@assets/logo.svg";

export function Started() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleStarted() {
    navigation.navigate("Welcome");
  }

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <VStack flex={1} bg="$gray700">
      <Image
        w="$full"
        h="$full"
        source={lorenaa}
        defaultSource={lorenaa}
        alt="Estética e beleza"
        position="absolute"
      />

    <VStack flex={1} px="$10" pb="$20" >
        <Center flex={1} >
          <Logo width={70} height={70} />
          <Text fontSize="$2xl" fontWeight="bold" color="#000000" mt="$2">
            LORE
          </Text>
          <Text fontSize="$lg" fontWeight="bold" color="#000000" mt="$1">
            Sua beleza, nossa inspiração
          </Text>
        </Center>

        <Button title="Iniciar" onPress={handleStarted} />
      </VStack>
    </VStack>
  );
}
