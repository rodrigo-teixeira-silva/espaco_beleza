import {
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Image,
  Box,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { appNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, ScrollView } from "react-native";

import BodySvg from "@assets/body.svg";
import seriesSvg from "@assets/series.svg"
import RepetitionSvg from "@assets/repetitions.svg"
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom: 62
      }}>
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

        <Box bg="$gray200" rounded="$md" pb="$4" px="$4">
          <HStack 
          alignItems="center" 
          justifyContent="space-around" 
          mb="$6" 
          mt="$5"
          >
            <HStack>
            {/* <seriesSvg/> */}
            <Text color="$violet200" ml="$2">
              tipo de tratamento
            </Text>
          </HStack>

          <HStack>
            <RepetitionSvg/>
            <Text color="$violet200" ml="$2">
              confirme seu horário 
            </Text>
          </HStack>
          </HStack>

          <Button title="marcar como realizado" />
        </Box>

      </VStack>
      </ScrollView>
    </VStack>
  );
}
