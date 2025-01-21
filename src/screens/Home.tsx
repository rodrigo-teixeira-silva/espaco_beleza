import React, { useState, useEffect } from "react";
import { FlatList, StatusBar  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Center,
  Heading,
  HStack,
  Text,
  Pressable,
  Image,
} from "@gluestack-ui/themed";
import { HomeHeader } from "@components/HomeHeader";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { Carrousel } from "@components/Carrousel";
import { Input } from "@components/Input";
import {WhatsAppButton} from "@components/WhatzAppButoon";
import gold from "@assets/gold.png";

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

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

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
          <Input placeholder="Buscar..." bg="#ffffc1" />
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
            <Heading color="#000000" fontSize="$sm" fontFamily="$heading">
              Aulas
            </Heading>

            <Text color="#000000" fontSize="$sm" fontFamily="$body">
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
      return <WhatsAppButton item={item} />;
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

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <>
      <VStack flex={1} backgroundColor="#121214">
        <Image
          source={gold}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          alt="Gold background"
        />
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
