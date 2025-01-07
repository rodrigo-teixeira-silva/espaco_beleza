import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { VStack, Center, Heading, HStack, Text } from "@gluestack-ui/themed";
import { HomeHeader } from "@components/HomeHeader";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { Carrousel } from "@components/Carrousel";
import { Input } from "@components/Input";

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
        <VStack style={styles.headerContainer}>
          <HomeHeader />
        </VStack>

        <Center w="$full" gap="$4" style={{ marginTop: 16 }}>
          <Input placeholder="Buscar..." bg="$gray400" />
        </Center>

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
          contentContainerStyle={{ paddingHorizontal: 2 }}
          style={{ margin: 16, maxHeight: 44, minHeight: 44 }}
        />

        {/* Products */}
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
