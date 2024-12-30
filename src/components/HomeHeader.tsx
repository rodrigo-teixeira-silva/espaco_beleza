import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, HStack, Text, VStack, Icon } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import { UserPhoto } from "./UserPhoto";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";

export function HomeHeader() {
  return (
    
      <SafeAreaView style={{ backgroundColor: "#202024" }}>
      <HStack
        pt="$5"
        pb="$5"
        px="$8"
        alignItems="center"
        gap="$4"
        w="100%"
      >
        <UserPhoto
          source={{ uri: "https://github.com/rodrigo-teixeira-silva.png" }}
          w="$16"
          h="$16"
          alt="Imagem do usuário"
        />

        <VStack flex={1}>
          <Text color="$gray100" fontSize="$sm">
            Olá,
          </Text>

          <Heading color="$gray100" fontSize="$md">
            Rodrigo Teixeira
          </Heading>
        </VStack>

        <Icon as={LogOut} color="$gray100" size="xl" />
      </HStack>
    </SafeAreaView>
  );
}

