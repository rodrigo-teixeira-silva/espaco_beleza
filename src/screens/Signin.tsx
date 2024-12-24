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
} from "@gluestack-ui/themed";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackagroundImg from "@assets/mainBackground.png";

import Logo from "@assets/logo.svg";
import { useState } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Signin() {
  const [borderColor, setBorderColor] = useState("#7C7C8A");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Estado para gerenciar a cor do texto
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
        source={BackagroundImg}
        defaultSource={BackagroundImg}
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
            </Center>

            <Center flex={1} justifyContent="flex-end" mt="$4" >

              <Text color="#FFF" fontSize="$sm" mt="$33" mb="$7" fontFamily="$body">
               
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
        keyExtractor={(item, index) => index.toString()} // Chave única para o FlatList
        keyboardShouldPersistTaps="handled" // Evita que o teclado desapareça ao clicar nos itens
      />
    </VStack>
  );
}
