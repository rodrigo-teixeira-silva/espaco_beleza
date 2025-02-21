import { useState } from "react";
import { ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ToastMessage } from "@components/ToastMessage";
import { Toast } from "@gluestack-ui/themed";
import { VStack, Text, Heading, Center, useToast } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";

import gold from "@assets/gold.png"; // Imagem de fundo
import { api } from "@services/api";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/rodrigo-teixeira-silva.png"
  );

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri);
        console.log("Detalhe da imagem",photoInfo)
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande. Use uma imagem de até 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        const fileExtension = photoUri.split(".").pop();
        const mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;

        const photoFile = {
          uri: photoUri,
          name: `avatar.${fileExtension}`,
          type: mimeType,
        };

        const formData = new FormData();
        formData.append("avatar", photoFile as any);

        console.log("Enviando foto para a API...", formData);

        const response = await api.patch("/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });

        console.log("Resposta da API:", response.data);

        setUserPhoto(photoUri);

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="success"
              title="Foto atualizada com sucesso!"
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error.response?.data || error);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao atualizar a foto."
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  return (
    <ImageBackground source={gold} style={{ flex: 1 }} resizeMode="cover">
      <VStack flex={1}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />

        <ScrollView
          contentContainerStyle={{
            paddingVertical: 16,
            paddingHorizontal: 30,
            flexGrow: 1,
          }}
        >
          <Center mt="$6" px="$10">
            <UserPhoto source={{ uri: userPhoto }} alt="Foto de usuário" size="xl" />

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text color="$gray500" fontFamily="$heading" mt="$2" mb="$8">
                Alterar foto
              </Text>
            </TouchableOpacity>
          </Center>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" />
            <Input value="rodrigo@gmail.com" isReadOnly />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="#000000"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar Senha
          </Heading>

          <Center w="$full" gap="$4">
            <Input placeholder="Senha antiga" secureTextEntry />
            <Input placeholder="Nova senha" secureTextEntry />
            <Input placeholder="Confirme a senha" secureTextEntry />
            <Button title="Atualizar" mb="$4" />
          </Center>
        </ScrollView>
      </VStack>
    </ImageBackground>
  );
}
