import React, { useState } from "react";
import {
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
  Box,
  View,
  Pressable,
  ScrollView,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft, UserPen } from "lucide-react-native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import BodySvg from "@assets/body.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { ImageBackground } from "react-native";
import gold from "@assets/gold.png";

import CustomDrawer from "@components/CustomDrawer";

type RouteParamsProps = {
  productId: string;
};

export function Product() {
  const navigation = useNavigation<appNavigatorRoutesProps>();
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controle de visibilidade do drawer

  const route = useRoute();
  const { productId } = route.params as RouteParamsProps;
  console.log("ID =>", productId);

  function handleGoBack() {
    navigation.goBack();
  }

  function toggleText() {
    setIsTextExpanded(!isTextExpanded);
  }

<<<<<<< HEAD
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true); // Abre o drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false); // Fecha o drawer
=======
  function handleGoPix() {
    navigation.navigate("Pix");
  }


  function handleGoCard() {
    navigation.navigate("Cartao");
  }

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true); 
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false); 
>>>>>>> 15265ae (feat: created Pix component Screen)
  };

  const textContent =
    "A limpeza de pele com ácido é um procedimento estético indicado para promover uma renovação celular profunda, proporcionando uma pele mais uniforme, luminosa e livre de impurezas. O tratamento envolve a aplicação de ácidos específicos, como ácido salicílico, glicólico ou mandélico, que auxiliam na remoção das células mortas, controle da oleosidade e redução de manchas e cravos.";

  return (
    <VStack flex={1}>
      <ImageBackground source={gold} style={{ flex: 1 }} resizeMode="cover">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 62,
            paddingHorizontal: 16,
          }}
        >
          <VStack pt="$12" pb="$4">
            <Pressable onPress={handleGoBack}>
              <Icon as={ArrowLeft} color="#000000" size="xl" />
            </Pressable>

            <HStack
              justifyContent="space-between"
              alignItems="center"
              mt="$4"
              mb="$8"
            >
              <Heading
                color="$gray500"
                fontFamily="$heading"
                fontSize="$lg"
                flexShrink={1}
              >
                Limpeza de pele
              </Heading>
              <HStack alignItems="center">
                <BodySvg />
                <Text color="$gray500" ml="$1" textTransform="capitalize">
                  Tipos
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Content */}
          <VStack>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png",
              }}
              alt="Imagem do Treinamento "
              rounded="$lg"
              mb="$3"
              resizeMode="cover"
              w="$full"
              h="$80"
            />
            <Box bg="rgba(32, 32, 36, 0.8)" rounded="$sm" pb="$4" px="$4">
              <View>
                <Text
                  color="#FFF"
                  numberOfLines={isTextExpanded ? undefined : 2}
                  ellipsizeMode="tail"
                >
                  {textContent}
                </Text>
                <Pressable onPress={toggleText}>
                  <Text color="$yellow100" mt="$2">
                    {isTextExpanded ? "Mostrar menos" : "Mostrar mais..."}
                  </Text>
                </Pressable>
              </View>
            </Box>

            <Box
              bg="rgba(32, 32, 36, 0.8)"
              rounded="$md"
              mt="$2"
              pb="$10"
              px="$4"
            >
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <VStack>
                  <HStack>
                    <RepetitionSvg />
                    <Text color="#FFF" ml="$2" mb="$4">
                      tipo de tratamento
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionSvg />
                    <Text color="#FFF" ml="$2">
                      confirme seu horário
                    </Text>
                  </HStack>
                </VStack>
              </HStack>

              <Button
                title="Adicionar ao carrinho"
                mt="$2"
                mb="$4"
                onPress={() => navigation.navigate("cart")}
              />

              <Button
                title="Comprar agora"
                onPress={handleOpenDrawer} // Abre o drawer ao clicar
              />
            </Box>
          </VStack>
        </ScrollView>
      </ImageBackground>

      <CustomDrawer
        isOpen={isDrawerOpen}
<<<<<<< HEAD
        onClose={handleCloseDrawer} // Passa a função para fechar o drawer
        title="Pagamento"
        content="Finalize sua compra "
        buttons={[
        <Button title="Pix" mb="$2" mt="$2" onPress={() => {}} />, 
        <Button title="Cartão" mb="$2" onPress={() => {}} />,
=======
        onClose={handleCloseDrawer} 
        title="Pagamento"
        content="Finalize sua compra "
        buttons={[
        <Button title="Pix" mb="$2" mt="$2" onPress={() => {  handleCloseDrawer(); navigation.navigate("Pix")}} />, 
        <Button title="Cartão" mb="$2" onPress={() => { handleCloseDrawer(); navigation.navigate("Cartao")}} />,
>>>>>>> 15265ae (feat: created Pix component Screen)
 
      ]}
      />
    </VStack>
  );
}
