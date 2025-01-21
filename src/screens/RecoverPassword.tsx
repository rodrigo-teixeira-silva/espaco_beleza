import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  Pressable,
  Icon,
  View,
} from "@gluestack-ui/themed";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {StatusBar} from "react-native"

import gold from "@assets/gold.png";
import Logo from "@assets/logo.svg";
import { useState, useEffect } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";

type FormDataEmailProps = {
  email: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
});

export function RecoverPassword() {
  const [borderColor, setBorderColor] = useState("#7C7C8A");
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Para controlar a visibilidade dos botões
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataEmailProps>({
    resolver: yupResolver(signInSchema),
  });

  function handleSignin() {
    navigation.navigate("Signin");
  }

  function handleSendEmail({ email }: FormDataEmailProps) {
    // Lógica para enviar o e-mail
    console.log("E-mail enviado!", email);
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

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
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
            source={gold}
            defaultSource={gold}
            alt="estetica e beleza"
            position="absolute"
          />

          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo width={70} height={70} />
              <Text fontSize="$2xl" fontWeight="bold" color="#000000">
                LORE
              </Text>
            </Center>

            <Center gap="$2">
              <Heading color="#000000">Recuperar conta</Heading>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ color: "#000000" }}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Button title="Enviar email" onPress={handleSubmit(handleSendEmail)} />
            </Center>
          </VStack>

          {!keyboardVisible && (
            <Center flex={1} justifyContent="flex-end" mb="$5" mx="$10">
              <Button
                title="Voltar para tela de login"
                variant="outline"
                onPress={handleSignin}
                style={{ width: "100%" }}
              />
            </Center>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
