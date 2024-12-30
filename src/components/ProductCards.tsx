import { HStack, Image, VStack, Heading, Text, Icon  } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {ChevronRightIcon} from "lucide-react-native"

type Props = TouchableOpacityProps & {
}

export function ProductCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <VStack
      bg="$gray400" 
      alignItems="center" p="$2" pr="$4" rounded="$md"w="$40" 
        
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png",
          }}
          alt="Imagem do treinamento"
          w="$24"
          h="$24"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
          />

          <VStack flex={1}>
              <Heading fontSize="$lg" color="$gray100" fontFamily="$heading">
                Limpeza de pele</Heading>
              <Text color="$gray100">tipos de pele</Text>
          </VStack>


          < Icon as ={ChevronRightIcon} color="$gray100"/>
      </VStack>
    </TouchableOpacity>
  );
}
