import { HStack, Image, VStack, Heading, Text, Icon } from "@gluestack-ui/themed";
import { Animated, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronRightIcon } from "lucide-react-native";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "../service/api";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO; 
};

type RouteParamsProps = {
  exerciseId: string;
}

  // const route = useRoute();

  // const { exerciseId } = route.params as RouteParamsProps;


export function ProductCard({ data, ...rest }: Props) {
  console.log("Renderizando ProductCard com:", data);

  return (
    <TouchableOpacity {...rest}>
      <VStack
        bg="#ffffc1"
        alignItems="center"
        p={8}
        rounded="$md"
        marginBottom={12} 
        marginHorizontal={8} 
        width={150} 
        height={250} 
        
      >
        <Image
          source={{ uri:`${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
          alt="Imagem do treinamento"
          w="$24"
          h="$24"
          rounded="$md"
          resizeMode="cover"
        />
        <VStack alignItems="center">
          <Heading fontSize="$lg" color="$gray500" fontFamily="$heading" textAlign="center" numberOfLines={3}  ellipsizeMode="tail">
            {data.name}
          </Heading>
          <Text color="$gray500" textAlign="center" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
