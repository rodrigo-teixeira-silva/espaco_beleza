import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed";
import BackagroundImg from "@assets/background.png";

import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Signin() {
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
          <Logo />

          <Text color="$#7C7C8A" fontSize="$3xl" mt="$2">
            Espaço estetica
          </Text>
        </Center>

        <Center gap="$2">
          <Heading color="$gray100">Acesse a conta</Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            style= {{color: "#000000" }}
          />
          <Input 
            placeholder="senha" 
            secureTextEntry 
            style={{ color: "#000000"}}
          />

          <Button 
            title="Acessar" 
            />
        
        </Center>
      </VStack>
    </VStack>
  );
}
