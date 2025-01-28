import { useEffect } from "react";
import { useState } from "react";
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  onChange,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import BackagroundImg from "@assets/mainBackground.png";
import { StatusBar } from "react-native";
import gold from "@assets/gold.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View as RNView,
} from "react-native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos seis dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
});

export function SignUp() {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();
  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post("/users", { name, email, password });
      console.log(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      // toast.show({
      //   title,
      //   placement: 'top',
      //   bgColor: 'red.500',
      // });
    }
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
            source={gold}
            defaultSource={gold}
            alt="estetica e beleza"
            position="absolute"
          />

          <VStack flex={1} px="$10" pb="$8">
            <Center my="$14">
              <Logo width={90} height={90} />
              <Text fontSize="$2xl" fontWeight="bold" color="#000000">
                LORE
              </Text>
            </Center>

            <Center gap="$0" flex={1}>
              <Heading color="#000000" mb="$4">
                Crie sua conta
              </Heading>

              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Informe o nome.",
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    style={{ color: "#000000" }}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Informe o email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "E-mail inválido",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ color: "#000000" }}
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    style={{ color: "#000000" }}
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirme a senha"
                    secureTextEntry
                    style={{ color: "#000000" }}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="send"
                    errorMessage={errors.password_confirm?.message}
                  />
                )}
              />

              <Button
                title="Criar e acessar"
                mb="$9"
                onPress={handleSubmit(handleSignUp)}
              />
            </Center>

            <Center justifyContent="flex-end" mt="$2">
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
