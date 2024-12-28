import { useEffect, useState } from "react";
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  HStack,
  Divider,
  Pressable,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

import Logo from "@assets/logo.svg";
import loreBackground from "@assets/loreBackground.png";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup.string().required("Informe a senha."),
});

export function Signin() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const [isClicked, setIsClicked] = useState(false);

  function handleSignIn({ email, password }: FormDataProps) {
    console.log("Login realizado:", { email, password });
    // Aqui você pode implementar a lógica de autenticação, como chamada para API
  }

  function handleNewAccount() {
    navigation.navigate("SignUp");
  }

  function handleRecoverPassword() {
    navigation.navigate("RecoverPassword");
  }

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

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

              <Text color="#7C7C8A" fontSize="$2xl" mt="$2">
                Espaço estética
              </Text>
            </Center>

            <Center gap="$2" flex={1}>
              <Heading color="$gray400">Acesse sua conta</Heading>

              {/* Campo de E-mail */}
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

              {/* Campo de Senha */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    style={{ color: "#000000" }}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />

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

              {/* Botões de login social */}
              <HStack
                space="3xl"
                justifyContent="space-evenly"
                alignItems="center"
                mt="$4"
              >
                <Pressable onPress={() => console.log("Login com Google")}>
                  <Icon name="google" size={30} color="#FFFFFF" />
                </Pressable>

                <Pressable onPress={() => console.log("Login com Facebook")}>
                  <Icon name="facebook" size={30} color="#FFFFFF" />
                </Pressable>
              </HStack>
            </Center>

            {/* Navegar para recuperar senha ou criar nova conta */}
            <Center justifyContent="flex-end" mt="$6">
              <Pressable onPress={handleRecoverPassword}>
                <Text color="#7C7C8A" fontSize="$sm" fontWeight="bold">
                  Esqueceu sua senha? Clique aqui
                </Text>
              </Pressable>

              <Pressable onPress={handleNewAccount}>
                <Text
                  color={isClicked ? "$violet500" : "#7C7C8A"}
                  fontSize="$sm"
                  fontWeight="bold"
                  mt="$4"
                >
                  Ainda não tem uma conta? Clique aqui
                </Text>
              </Pressable>
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
