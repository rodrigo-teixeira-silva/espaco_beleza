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
  Divider,
} from "@gluestack-ui/themed";
import { StatusBar } from "react-native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import loreBackground from "@assets/loreBackground.png";

import facebook from "@assets/facebook.png";
import google from "@assets/google.png";

import Logo from "@assets/logo.svg";
import { useState } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";

export function Signin() {
  const [borderColor, setBorderColor] = useState("#7C7C8A");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("SignUp");
  }

  function handleRecoverPassword() {
    navigation.navigate("RecoverPassword");
  }



  return (
    <VStack flex={1} bg="$gray700">
      <Image
        w="$full"
        h={924}
        source={loreBackground}
        defaultSource={loreBackground}
        alt="estetica e beleza"
        position="absolute"
      />

      <FlatList
        data={[1]}
        renderItem={() => (
          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo width={70} height={70} />
              <Text fontSize="$2xl" fontWeight="bold">
                LORENA
              </Text>

              <Text color="#7C7C8A" fontSize="$2xl" mt="$2">
                Espaço estética
              </Text>
            </Center>

            <Center gap="$2">
              <Heading color="#7C7C8A">Acesse a conta</Heading>

              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ color: "#000000" }}
              />
              <Input
                placeholder="Senha"
                secureTextEntry
                style={{ color: "#000000" }}
              />

              <Button title="Acessar" />

              {/* Linha com "ou" */}
              <HStack
                alignItems="center"
                justifyContent="center"
                mt="$4"
                mb="$2"
              >
                <Divider flex={1} bg="#7C7C8A" />
                <Text color="#7C7C8A" mx="$2" fontWeight="bold">
                  ou
                </Text>
                <Divider flex={1} bg="#7C7C8A" />
              </HStack>

              <HStack
                space="3xl"
                justifyContent="space-evenly"
                alignItems="center"
                mt="$4"
              >
                <Pressable onPress={() => console.log("Google")}>
                  <Icon name="google" size={30} color="#FFFFFF" />
                </Pressable>

                <Pressable onPress={() => console.log("Facebook")}>
                  <Icon name="facebook" size={30} color="#FFFFFF" />
                </Pressable>
      
                </HStack>







            </Center>

            <Center flex={1} justifyContent="flex-end" mt="$4">
              <Text
                color="#FFF"
                fontSize="$sm"
                mt="$33"
                mb="$7"
                fontFamily="$body"
              >
                <Pressable onPress={() => setIsClicked(!isClicked)}>
                  <Text
                    color={isClicked ? "$violet500" : "#7C7C8A"}
                    fontSize="$sm"
                    fontWeight="bold"
                    onPress={handleNewAccount}
                    textAlign="center"
                  >
                    Ainda não tem uma conta? Clique aqui
                  </Text>
                </Pressable>
              </Text>
            </Center>
          </VStack>
        )}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
      />
    </VStack>
  );
}
