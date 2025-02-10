import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Text } from "@gluestack-ui/themed"; // Usando o Button do Gluestack
import { ImageBackground, View, StatusBar } from "react-native";
import { Button } from "@components/Button";
import gold from "@assets/gold.png";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { appNavigatorRoutesProps } from "@routes/app.routes";

export function Pay() {
  const navigation = useNavigation<appNavigatorRoutesProps>();
  function handlePay() {
    navigation.navigate("QRCodeScann");
  }

  return (
    <>
    
      <StatusBar
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true} 
      />
      <ImageBackground source={gold} style={{ flex: 1 }} resizeMode="cover">
        <VStack flex={1}>
          <ScreenHeader title="Pay" />

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text color="#000000" fontSize={16} fontFamily="$body">
              Pagamento
            </Text>

            <Button
              title="QR-Code"
              onPress={() => navigation.navigate("QRCodeScann")}
              mt="$5"
              mb="$2"
            />

            <Button 
            title="Cartão" 
            // onPress={} 
            mt="$2" 
            mb="$5" />
          </View>
        </VStack>
      </ImageBackground>
    </>
  );
}
