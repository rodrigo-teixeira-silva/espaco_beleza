import { Center, VStack, Text } from "@gluestack-ui/themed";

export function Cartao() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="$lg" fontWeight="bold" color="$black" bgColor="$gray100">
        Cartão
      </Text>
    </VStack>
  );
}
