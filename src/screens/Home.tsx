import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, HStack, Text, VStack, Icon } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import { UserPhoto } from "../components/UserPhoto";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import BackagroundImg from "@assets/mainBackground.png";
import { StatusBar } from "expo-status-bar";

export function HomeHeader() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <HStack pt="$4" pb="$5" px="$8" alignItems="center" gap="$4" w="100%">
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
    <>
      <StatusBar style="light" backgroundColor="#A3A3A3" />
      <VStack flex={1} backgroundColor="#DBDBDB">
        <HomeHeader />

        <FlatList
          data={group}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={
                groupSelected?.toUpperCase() === item.toLocaleLowerCase()
              }
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
            renderItem={({ item }) => <ProductCard />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ItemSeparatorComponent={() => <VStack height={12} />}
          />
        </VStack>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#A3A3A3",
    paddingTop: 20,
    width: "100%",
  },
});
