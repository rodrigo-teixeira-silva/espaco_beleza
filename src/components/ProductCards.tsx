import { HStack, Image, VStack, Heading, Text, Icon  } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {ChevronRightIcon} from "lucide-react-native"

type Props = TouchableOpacityProps & {
}

export function ProductCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack 
      bg="$gray200" 
      alignItems="center" p="$2" pr="$4" rounded="$md"
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png",
          }}
          alt="Imagem do treinamento"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
          />

          <VStack flex={1}>
              <Heading fontSize="$lg" color="#7C7C8A" fontFamily="$heading">
                Limpeza de pele</Heading>
              <Text>tipos de pele</Text>
          </VStack>

          < Icon as ={ChevronRightIcon} color="$gray300"/>
      </HStack>
    </TouchableOpacity>
  );
}
