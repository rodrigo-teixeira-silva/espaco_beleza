import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed";
import BackagroundImg from "@assets/background.png";

import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
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
          <Logo/>

          <Text color="$#f2f2f9" fontSize="$3xl" mt="$1">
            Espaço estetica
          </Text>
        </Center>

        <Center gap="$2" flex={1}>
          <Heading color="$gray100">Crie sua conta</Heading>

          <Input placeholder="Nome" style={{ color: "#000000" }} />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ color: "#000000" }}
          />

          <Input
            placeholder="senha"
            secureTextEntry
            style={{ color: "#000000" }}
          />

          <Input
            placeholder="Confirme a senha"
            secureTextEntry
            style={{ color: "#000000" }}
          />

          <Button title="Criar e acessar" />
        </Center>

        <Center justifyContent="flex-end" mt="$6">
          <Text color="$#FFFFFF" fontSize="$sm" mb="$6" fontFamily="$body">
            Ainda não tem acesso?
          </Text>

          <Button title="Voltar para login" variant="outline" mt="$2" />
        </Center>

      </VStack>
    </VStack>
  );
}
