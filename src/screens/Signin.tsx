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
  useToast,
  Toast,
  ToastTitle
} from "@gluestack-ui/themed";


import { useNavigation } from "@react-navigation/native";
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import GoogleIcon from "@assets/google-icon.png";
import { useAuth } from "@hooks/UseAuth";

import Logo from "@assets/logo.svg";
import gold from "@assets/gold.png";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup.string().required("Informe a senha."),
});

export function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const [isClicked, setIsClicked] = useState(false);

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      
      await signIn(email, password);
    
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde";

        setIsLoading(false);
      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor="$red500" action="error" variant="outline">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        
        ),
      });

    }finally {
      setIsLoading(false); 
    }
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
            source={gold}
            defaultSource={gold}
            alt="estetica e beleza"
            position="absolute"
          />

          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo width={70} height={70} />
              <Text color="#000000" fontSize="$2xl" fontWeight="bold">
                LORE
              </Text>
            </Center>

            <Center gap="$2" flex={1}>
              <Heading color="#000000">Acesse sua conta</Heading>

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

              <Button 
              title="Acessar" 
              onPress={handleSubmit(handleSignIn)} 
              isLoading={isLoading}
              />

              <HStack
                alignItems="center"
                justifyContent="center"
                mt="$4"
                mb="$2"
              >
                <Divider flex={1} bg="#000000" />
                <Text color="#000000" mx="$2" fontWeight="bold">
                  ou
                </Text>
                <Divider flex={1} bg="#000000" />
              </HStack>

              <HStack
                space="3xl"
                justifyContent="space-evenly"
                alignItems="center"
                mt="$4"
              >
                <Pressable onPress={() => console.log("Login com Google")}>
                  <Icon name="google" size={30} color="##000000" />
                </Pressable>

                <Pressable onPress={() => console.log("Login com Facebook")}>
                  <Icon name="facebook" size={30} color="##000000" />
                </Pressable>
              </HStack>
            </Center>

            <Center justifyContent="flex-end" mt="$6">
              <Pressable onPress={handleRecoverPassword}>
                <Text color="#000000" fontSize="$sm" fontWeight="bold">
                  Esqueceu sua senha? Clique aqui
                </Text>
              </Pressable>

              <Pressable onPress={handleNewAccount}>
                <Text
                  color={isClicked ? "$violet500" : "##000000"}
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
