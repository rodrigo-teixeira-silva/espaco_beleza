import { useEffect } from "react";
import {
  VStack,
  Center,
  Text,
  Heading,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import Logo from "@assets/logo.svg";
import gold from "@assets/gold.png"; // Importando a imagem de fundo
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { api } from "../service/api";
import { AppError } from "@utils/AppError";
import axios from "axios";

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
      console.log("Usuário criado com sucesso:", response.data);
      toast.show({
        title: "Conta criada com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      navigation.goBack();
    } catch (error) {
      let title = "Erro desconhecido";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          title = error.response.data?.message || "Dados inválidos enviados.";
        } else {
          title = `Erro ${error.response?.status}: Algo deu errado.`;
        }
      } else if (error instanceof AppError) {
        title = error.message;
      }

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });

      console.log("Erro detalhado:", JSON.stringify(error, null, 2));
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Usando ImageBackground para aplicar o fundo */}
        <ImageBackground
          source={gold}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
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
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
