import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  Image,
} from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import { UserPhoto } from "../components/UserPhoto";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import { StatusBar } from "expo-status-bar";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { HomeHeader } from "@components/HomeHeader";

// import BackagroundImg from "@assets/mainBackground.png";



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
  const navigation = useNavigation<appNavigatorRoutesProps>();

  function handleOpenProcedimentsDetails(product: string) {
    navigation.navigate("product", { product });
  }

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
            renderItem={({ item }) => (
              <ProductCard
                onPress={() => handleOpenProcedimentsDetails(item)}
              />
            )}
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
