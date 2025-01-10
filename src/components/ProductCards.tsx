import { HStack, Image, VStack, Heading, Text, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRightIcon } from "lucide-react-native";

type Props = TouchableOpacityProps & {};

export function ProductCard({ ...rest }: Props) {
  return (

      <TouchableOpacity {...rest}>
      <VStack
        bg="$gray400"
        alignItems="center"
        p="$4"
        rounded="$md"
        w="$40"
        mt="$2"
        mb="$2"
        marginEnd={10}
        space="md"

      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png",
          }}
          alt="Imagem do treinamento"
          w="$24"
          h="$24"
          rounded="$md"
          resizeMode="cover"
        />

        <VStack alignItems="center">
          <Heading fontSize="$lg" color="$gray100" fontFamily="$heading" textAlign="center">
            Limpeza de pele
          </Heading>
          <Text color="$gray100" textAlign="center">
            tipos de pele
          </Text>
        </VStack>

        {/* <Icon as={ChevronRightIcon} color="$gray100" /> */}
      </VStack>
    </TouchableOpacity>

  );
}
