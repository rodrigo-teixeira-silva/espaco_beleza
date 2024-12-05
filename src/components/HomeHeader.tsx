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
    <SafeAreaView style={{ backgroundColor: "#A3A3A3" }}>
      <HStack
        pt="$16"
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

export function Home() {
  const [produtos, setProdutos] = useState([
    "Limpeza de pele",
    "Alongamento de cílios",
    "Clareamento",
    "Preenchimento",
    "Produto 1",
    "Produto 2",
    "Produto 3",
  ]);

  const [group, setGroup] = useState([
    "Produtos",
    "Consultas",
    "Treinamentos",
    "Vendas",
    "Clientes",
  ]);

  const [groupSelected, setGroupSelected] = useState<string | undefined>(
    undefined
  );

  return (
    <VStack flex={1} backgroundColor="#DBDBDB">
      <HomeHeader />

      <FlatList
        data={group}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ margin: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="#000e21" fontSize="$sm" fontFamily="$heading">
            Aulas
          </Heading>

          <Text color="#000e21" fontSize="$sm" fontFamily="$body">
            {produtos.length}
          </Text>
        </HStack>

        <FlatList
          data={produtos}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ProductCard style={{marginBottom: 16}}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
