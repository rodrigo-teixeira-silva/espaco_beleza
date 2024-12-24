import { useState } from "react";
import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import BackagroundImg from "@assets/mainBackground.png";

import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View as RNView,
} from "react-native";

export function SignUp() {
  const [passwordRedefinitionVisible, setPasswordRedefinitionVisible] = useState(false);
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} bg="$gray700">
          <Image
            w="$full"
            h={924}
            source={BackagroundImg}
            defaultSource={BackagroundImg}
            alt="estetica e beleza"
            position="absolute"
          />

          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo width={70} height={70} />
              <Text fontSize="$2xl" fontWeight="bold">
                LORENA
              </Text>
            </Center>

            <Center gap="$2" flex={1}>
              <Heading color="$gray400">Crie sua conta</Heading>

              <Input placeholder="Nome" style={{ color: "#000000" }} />

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

              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                style={{ color: "#000000" }}
              />

              <Button title="Criar e acessar" mb="$9"/>
            </Center>

            <Center justifyContent="flex-end" mt="$6">
             
              <Button
                title="Voltar para login"
                variant="outline"
                mt="$2"
                onPress={handleGoBack}
              />
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
