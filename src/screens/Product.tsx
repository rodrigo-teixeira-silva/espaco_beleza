import {
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
  Box,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, ScrollView } from "react-native";

import BodySvg from "@assets/body.svg";
import seriesSvg from "@assets/series.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Product() {
  const navigation = useNavigation<appNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack flex={1} backgroundColor="#DBDBDB">
      <VStack px="$8" bg="$#A3A3A3" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$violet500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$violet200"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            Limpeza de pele
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$violet 200" ml="$1" textTransform="capitalize">
              Tipos
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 62,
        }}
      >
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
          <Box bg="$gray200" rounded="$sm" pb="$4" px="$4">
            <View>
              <Text color="$#FFF">
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure, but because those who do not
                know how to pursue pleasure rationally encounter consequences
                that are extremely painful. Nor again is there anyone who loves
                or pursues or desires to obtain pain of itself, because it is
                pain
              </Text>
            </View>
          </Box>

          <Box bg="$gray200" rounded="$md" pb="$10" px="$4">
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb="$6"
              mt="$5"
            >
              <HStack>
                {/* <seriesSvg/> */}
                <Text color="$#FFF" ml="$2">
                  tipo de tratamento
                </Text>
              </HStack>

              <HStack>
                <RepetitionSvg />
                <Text color="$#FFF" ml="$2">
                  confirme seu horário
                </Text>
              </HStack>
            </HStack>

            <Button title="Adicionar ao carrinho" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
