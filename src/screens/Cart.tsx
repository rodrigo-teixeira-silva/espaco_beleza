import { ScreenHeader } from "@components/ScreenHeader";
import { VStack } from "@gluestack-ui/themed";
import { View, Text } from "react-native";

export function Cart() {


  return (
    
    <VStack flex={1} backgroundColor="$gray500">
      <ScreenHeader title="Car"  />
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Carrinho de compras</Text>
    </View>
    </VStack>
  );
}
