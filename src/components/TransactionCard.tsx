import { VStack, Text } from "@gluestack-ui/themed";
import { ImageBackground } from "react-native";
import { gold } from "@assets/gold.png";

type TransactionCardProps = {
  date: string;
  amount: number;
  description: string;
};

export function TransactionCard({ date, amount, description }: TransactionCardProps) {
  return (
    <ImageBackground
      source={gold}
      style={{
        flex: 1,
        borderRadius: 16, // Adicionando borderRadius diretamente
        overflow: "hidden", // Garantindo que os itens não saiam da borda arredondada
      }}
      resizeMode="cover"
    >
      <VStack
        bg="$gray800"
        p="$4"
        borderRadius="$lg"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" // Usando boxShadow
        space="xs"
      >
        <Text color="$gray300" fontSize="$sm">
          {date}
        </Text>
        <Text color={amount < 0 ? "$red500" : "$green500"} fontSize="$lg" fontWeight="bold">
          {amount < 0 ? "-" : "+"} R$ {Math.abs(amount).toFixed(2)}
        </Text>
        <Text color="$gray400" fontSize="$md">
          {description}
        </Text>
      </VStack>
    </ImageBackground>
  );
}
