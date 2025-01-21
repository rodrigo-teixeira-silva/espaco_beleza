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
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";

import BodySvg from "@assets/body.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { ImageBackground } from "react-native";
import gold from "@assets/gold.png";

export function Product() {
  const navigation = useNavigation<appNavigatorRoutesProps>();
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  function handleGoBack() {
    navigation.goBack();
  }

  function toggleText() {
    setIsTextExpanded(!isTextExpanded);
  }

  const textContent =
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain";

  return (
    <ImageBackground
      source={gold}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <VStack flex={1} >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 62,
            paddingHorizontal: 16,
          }}
        >
          {/* Header */}
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

            <Box bg="rgba(32, 32, 36, 0.8)" rounded="$md" mt="$2" pb="$10" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <VStack>
                <HStack>
                  <RepetitionSvg/>
                  <Text color="#FFF" ml="$2" mb="$4" >
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
                onPress={() => navigation.navigate("pay")}
              />
            </Box>
          </VStack>
        </ScrollView>
      </VStack>
    </ImageBackground>
  );
}
