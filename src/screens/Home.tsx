import React, { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { VStack, Center, Heading, HStack, Text, Pressable } from "@gluestack-ui/themed";
import { HomeHeader } from "@components/HomeHeader";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { Carrousel } from "@components/Carrousel";
import { Input } from "@components/Input";
import WatsappSvg from "@assets/whatsapp.svg";

export function Home() {
  const [produtos, setProdutos] = useState([
    "Limpeza de pele",
    "Alongamento de cílios",
    "Clareamento",
    "Preenchimento",
    "Produto 1",
    "Produto 2",
    "Produto 3",
    "Produto 4",
    "Produto 5",
  ]);

  const [group, setGroup] = useState([
    "Produtos",
    "Serviços",
    "Treinamentos",
    "Parceiros",
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

  function handleWhatsAppPress() {
    console.log("WhatsApp button pressed!");
    // Lógica para abrir o WhatsApp ou redirecionar
  }

  const renderContent = ({ item }: { item: any }) => {
    if (item.type === "header") {
      return <HomeHeader />;
    }

    if (item.type === "search") {
      return (
        <Center w="$full" gap="$4" style={{ marginTop: 16 }}>
          <Input placeholder="Buscar..." bg="$gray400" />
        </Center>
      );
    }

    if (item.type === "carousel") {
      return <Carrousel images={carouselImages} />;
    }

    if (item.type === "group") {
      return (
        <FlatList
          data={group}
          keyExtractor={(groupItem) => groupItem}
          renderItem={({ item: groupItem }) => (
            <Group
              name={groupItem}
              isActive={groupSelected === groupItem}
              onPress={() => setGroupSelected(groupItem)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 2 }}
          style={{ margin: 16, maxHeight: 44, minHeight: 44 }}
        />
      );
    }

    if (item.type === "products") {
      return (
        <VStack px="$8">
          <HStack justifyContent="space-between" mb="$5" alignItems="center">
            <Heading color="#FFFFFF" fontSize="$sm" fontFamily="$heading">
              Aulas
            </Heading>

            <Text color="#FFFFFF" fontSize="$sm" fontFamily="$body">
              {produtos.length}
            </Text>
          </HStack>

          <FlatList
            data={produtos}
            keyExtractor={(product) => product}
            renderItem={({ item: product }) => (
              <ProductCard
                onPress={() => handleOpenProcedimentsDetails(product)}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <VStack height={12} />}
          />
        </VStack>
      );
    }

    if (item.type === "whatsappButton") {
      return (
        <HStack mt="$8" justifyContent="flex-end" px="$3" alignItems="center">
          <Pressable
            onPress={handleWhatsAppPress}
            bg="$violet500"
            rounded="$full"
            p="$4"
            elevation={5}
          >
            <WatsappSvg width={50} height={50} />
          </Pressable>
        </HStack>
      );
    }

    return null;
  };

  const content = [
    { type: "header" },
    { type: "search" },
    { type: "carousel" },
    { type: "group" },
    { type: "products" },
    { type: "whatsappButton" },
  ];

  return (
    <>
      <StatusBar style="light" backgroundColor="#202024" />
      <VStack flex={1} backgroundColor="#121214">
        <FlatList
          data={content}
          keyExtractor={(item) => item.type}
          renderItem={renderContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </>
  );
}
