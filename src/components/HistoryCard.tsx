import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

export function HistoryCard() {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bg="$gray200"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          textTransform="capitalize"
          fontFamily="$heading"
          numberOfLines={1}>
       
          Limpeza de pele 
        </Heading>

        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          tipos de pele
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">
        08:01
      </Text>
    </HStack>
  );
}
