import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  Pressable,
  Icon,
} from "@gluestack-ui/themed";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import loreBackground from "@assets/loreBackground.png";

import Logo from "@assets/logo.svg";
import { useState, useEffect } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { View } from "@gluestack-ui/themed";

export function RecoverPassword() {
  const [borderColor, setBorderColor] = useState("#7C7C8A");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Para controlar a visibilidade dos botões
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignin() {
    navigation.navigate("Signin");
  }

  function handleSendEmail() {
    // Lógica para enviar o e-mail
    console.log("E-mail enviado!");
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // O teclado apareceu, esconder os botões
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // O teclado desapareceu, mostrar os botões
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} bg="$gray700">
          <Image
            w="$full"
            h={924}
            source={loreBackground}
            defaultSource={loreBackground}
            alt="estetica e beleza"
            position="absolute"
          />

          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo width={70} height={70} />
              <Text fontSize="$2xl" fontWeight="bold">
                LORENA
              </Text>

              <Text color="$#7C7C8A" fontSize="$2xl" mt="$2">
                Espaço estética
              </Text>
            </Center>

            <Center gap="$2">
              <Heading color="$#7C7C8A">Recuperar conta</Heading>

              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ color: "#000000" }}
                onSubmitEditing={handleSendEmail} // Dispara a função quando o botão OK do teclado é pressionado
              />

              <Button title="Enviar email" onPress={handleSendEmail} />
            </Center>
          </VStack>

          {/* Só exibe os botões quando o teclado não estiver visível */}
          {!keyboardVisible && (
            <Center flex={1} justifyContent="flex-end" mb="$5" marginStart={40} marginEnd={40}>
              <Button
                title="Voltar para tela de login"
                variant="outline"
                onPress={handleSignin}
                style={{ width: "100%" }} // Define a largura total
              />
            </Center>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
