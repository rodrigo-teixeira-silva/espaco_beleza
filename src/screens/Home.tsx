import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { HomeHeader } from "@components/HomeHeader";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { Carrousel } from "@components/Carrousel";

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
    "Serviços",
    "Treinamentos",
    "Parceiros ",
  ]);

  const [groupSelected, setGroupSelected] = useState<string | undefined>(
    undefined
  );

  const navigation = useNavigation<appNavigatorRoutesProps>();

  const carouselImages = [
    require("@assets/face1.png"),
    require("@assets/face2.png"),
    require("@assets/face3.png"),
  ];

  function handleOpenProcedimentsDetails(product: string) {
    navigation.navigate("product", { product });
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#202024" />
      <VStack flex={1} backgroundColor="#121214">
        {/* HomeHeader with borderBottom */}
        <VStack style={styles.headerContainer}>
          <HomeHeader />
        </VStack>

     
        <Carrousel images={carouselImages} />

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
            <Heading color="#FFFFFF" fontSize="$sm" fontFamily="$heading">
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
    borderBottomWidth: 1, 
    borderBottomColor: "#000", 
  },
});
