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

import BackagroundImg from "@assets/background.png";

import { Eye, EyeOff } from "lucide-react-native";

import Logo from "@assets/logo.svg";
import { useState } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native";
import { View } from "@gluestack-ui/themed";

export function RecoverPassword() {
  const [borderColor, setBorderColor] = useState("#7C7C8A");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignin() {
    navigation.navigate("Signin");
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
          <Heading color="$gray100">Recuperar conta</Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ color: "#000000" }}
          />
        

          <Button title="Enviar email" />
        </Center>

        <Center flex={1} justifyContent="flex-end" mt="$4">
         
          <Button
            title="Voltar para tela de login"
            variant="outline"
            onPress={handleSignin}
          />
        </Center>
      </VStack>
    </VStack>
  );
}
