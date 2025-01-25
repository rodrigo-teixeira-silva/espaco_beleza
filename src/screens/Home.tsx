import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StatusBar } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "../service/api";

import {
  VStack,
  Center,
  Heading,
  HStack,
  Text,
  Image,
  useToast,
  Toast, 
  ToastDescription, 
  ToastTitle
} from "@gluestack-ui/themed";
import { HomeHeader } from "@components/HomeHeader";
import { ProductCard } from "@components/ProductCards";
import { Group } from "@components/Groups";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { Carrousel } from "@components/Carrousel";
import { Input } from "@components/Input";
import { WhatsAppButton } from "@components/WhatzAppButoon";
import gold from "@assets/gold.png";
import { AppError } from "@utils/AppError";
import { Loading } from '@components/Loading';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [produtos, setProdutos] = useState<ExerciseDTO[]>([]); // Array de ExerciseDTO
  const [group, setGroup] = useState<string[]>([]); // Lista de grupos musculares
  const [groupSelected, setGroupSelected] = useState<string | undefined>(
    undefined
  );

  const navigation = useNavigation<appNavigatorRoutesProps>();
  const toast = useToast();

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

  function handleOpenProcedimentsDetails(productId: string) {
    navigation.navigate("product", { productId: productId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      const groups = response.data;
      setGroup(groups);

      // Definir o primeiro grupo como selecionado por padrão
      if (groups.length > 0) {
        setGroupSelected(groups[0]);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";
        toast.show({
         
          placement: "top",
          duration: 3000, // Duração de 3 segundos
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id;
            return (
              <Toast nativeID={uniqueToastId}  variant="solid">
                <ToastTitle>{title}</ToastTitle>
                <ToastDescription>
                  {isAppError
                    ? "Erro: " + error.message
                    : "Não foi possível carregar os grupos musculares"}
                </ToastDescription>
              </Toast>
            );
          },
        });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await 
      api.get(`/exercises/bygroup/${groupSelected}`);
      
      setProdutos(response.data);


    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios";
      // toast.show({
      //   title,
      //   placement: "top",
      //   bgColor: "red.500",
      // });
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups(); // Carrega os grupos ao montar o componente
  }, []);

  useEffect(() => {
    // Carrega os exercícios quando o grupo padrão é definido
    if (groupSelected) {
      fetchExercisesByGroup();
    }
  }, [groupSelected]);

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
              {produtos.length} Produtos
            </Text>
          </HStack>

          <FlatList
            data={produtos}
            keyExtractor={(product) => product.id} // Usando ID como chave única
            renderItem={({ item: product }) => (
              <ProductCard
                data={product}
                onPress={() => handleOpenProcedimentsDetails(product.id)}
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
