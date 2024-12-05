import { ScrollView, TouchableOpacity } from "react-native";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { VStack, Text, Heading, Center } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Profile() {
  return (
    <VStack flex={1} backgroundColor="#DBDBDB">
      <ScreenHeader title="Perfil" />

      <StatusBar backgroundColor="#A3A3A3" />

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 30
        }}
      >
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: "https:github.com/rodrigo-teixeira-silva.png" }}
            alt="Foto de usuário"
            size="xl"
          />

          <TouchableOpacity>
            <Text color="$gray600" fontFamily="$heading" mt="$2" mb="$8">
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>

        <Center w="$full" gap="$4">
          <Input placeholder="Nome" bg="$gray100" />
          <Input value="rodrigo@gmail.com" bg="$gray100" isReadOnly />
        </Center>

        <Heading
          alignSelf="flex-start"
          fontFamily="$heading"
          color="@gray200"
          fontSize="$md"
          mt="$12"
          mb="$2"
        >
          Alterars Senha
        </Heading>

        <Center w="$full" gap="$4">
          <Input placeholder="Senha antiga" bg="$gray100" secureTextEntry />
          <Input placeholder="Nova senha" bg="$gray100" secureTextEntry />
          <Input placeholder="Confirme a senha" bg="$gray100" secureTextEntry />
          <Button title="Atualizar" mb="$4" />
        </Center>
      </ScrollView>
    </VStack>
  );
}
