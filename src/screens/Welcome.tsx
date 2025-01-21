import { useEffect } from "react";
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ButtonGroup,
  HStack,
  FlatList,
  Pressable,
  View,

} from "@gluestack-ui/themed";

import { StatusBar } from "react-native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import gold from "@assets/gold.png"

import { useState } from "react";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";

export function Welcome() {
  const [borderColor, setBorderColor] = useState("#7C7C8A");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("SignUp");
  }

  function handleSignin() {
    navigation.navigate("Signin");
  }

  function handleRecorAccount() {
    navigation.navigate("RecoverPassword")
  }

  useEffect(() => {
    
    StatusBar.setBarStyle("dark-content")
    StatusBar.setBackgroundColor("transparent")
    StatusBar.setTranslucent(true)
  }, []);

  return (
    <VStack flex={1} bg="$gray700">
      <Image
      
        w="$full"
        h={960}
        source={gold}
        defaultSource={gold}
        alt="estetica e beleza"
        position="absolute"
      />

      <FlatList
        data={[1]}
        renderItem={() => (
          <VStack flex={1} px="$10" pb="$16" mt="$1/5">
            <Center my="$14" >
              <Logo width={100} height={100} />

              <Text fontSize="$3xl" fontWeight="bold" color="#000000">
                LORE
              </Text>

              <Text color="#000000" fontSize="$2xl" mt="$2">
                
              </Text>
            </Center>

            <Center gap="$2">
              <Heading color="#000000" >Bem vindo</Heading >

              <Button title="Login" onPress={handleSignin}
              backgroundColor="#ffffc1"
              
              />

              <Button title="Criar conta" onPress={handleNewAccount} />

              <Button title="Recuperar Conta" onPress={handleRecorAccount} />
            </Center>

            <Center mt="$5">
              <View>
                <Text color="#000000" fontSize="$lg">Siga nas redes sociais</Text>
              </View>

              <HStack
                space="3xl"
                justifyContent="space-evenly"
                alignItems="center"
                mt="$4"
              >
                <Pressable onPress={() => console.log("Instagram")}>
                  <Icon name="instagram" size={30} color="$gray" />
                </Pressable>

                <Pressable onPress={() => console.log("Facebook")}>
                  <Icon name="facebook" size={30} color="#000000" />
                </Pressable>
              </HStack>
            </Center>

            <Center flex={1} justifyContent="flex-end" mt="$4"></Center>
          </VStack>
        )}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
      />
    </VStack>
  );
}
