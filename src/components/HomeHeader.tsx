import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HStack, VStack, Text, Icon, Heading } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPhoto } from "./UserPhoto";
import { LogOut, Menu } from "lucide-react-native";
import { TouchableOpacity, ImageBackground } from "react-native";
import gold from "@assets/gold.png"; // Certifique-se de que o caminho para o arquivo está correto.

import { useAuth } from "@hooks/UseAuth";
type DrawerRoutes = {
  Home: undefined;
  Profile: undefined;
  History: undefined;
};

export function HomeHeader() {
  const { user } = useAuth();

  const navigation = useNavigation<DrawerNavigationProp<DrawerRoutes>>();

  return (
    <ImageBackground
      source={gold}
      style={{ width: "100%", backgroundColor: "#b9b950" }}
      resizeMode="cover"
    >
      {" "}
      <SafeAreaView>
        <HStack pt="$0" pb="$3" px="$6" alignItems="center" gap="$3" w="100%">
          <UserPhoto
            source={{ uri: "https://github.com/rodrigo-teixeira-silva.png" }}
            w="$16"
            h="$16"
            alt="Imagem do usuário"
          />

          <VStack flex={1}>
            <Text color="#000000" fontSize="$sm" fontFamily="$body">
              Olá,
            </Text>

            <Heading color="#000000" fontSize="$sm">
              {user.name}
            </Heading>
          </VStack>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon as={Menu} color="$gray100" size="xl" />
          </TouchableOpacity>
        </HStack>
      </SafeAreaView>
    </ImageBackground>
  );
}
