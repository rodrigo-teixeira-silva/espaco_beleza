import React, { useEffect, useState } from "react";
import { Box, Text, HStack, Image } from "@gluestack-ui/themed";
import { StatusBar } from "react-native";
import gold from "@assets/gold.png";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  SharedValue,
  interpolate,
  withTiming,
} from "react-native-reanimated";

export enum CARD_SIDE {
  front = 0,
  back = 1,
}

type CreditCardProps = {
  cardSide: SharedValue<number>;
  data: {
    nome: string;
    numero: string;
    validade: string;
    cvv: string;
  };
};

export function CreditCard({ cardSide, data }: CreditCardProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    cardSide.value = CARD_SIDE.front;
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const frontAnimated = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [0, 180]
    );
    const opacity = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [1, 0]
    );
    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) },
      ],
      opacity: withTiming(opacity, { duration: 500 }),
    };
  });

  const backAnimated = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [180, 360]
    );
    const opacity = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [0, 1]
    );
    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) },
      ],
      opacity: withTiming(opacity, { duration: 500 }),
    };
  });

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Box flex={1} position="relative">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Box
            position="relative"
            width="100%"
            height={200}
            marginBottom={isKeyboardVisible ? 80 : 0}
          >
            <Animated.View
              style={[
                { position: "absolute", width: "100%", height: "100%" },
                frontAnimated,
              ]}
            >
              <Box
                width="100%"
                height="100%"
                borderRadius="md"
                padding="$6"
                backgroundColor="#ffffc1"
                backfaceVisibility="hidden"
                justifyContent="space-between"
              >
                <HStack alignItems="center" gap={3}>
                  <Box
                    width={6}
                    height={6}
                    borderRadius="full"
                    backgroundColor="gray700"
                  />
                  <Text fontSize={16} fontWeight="bold" color="gray700">
                    Lore Bank!
                  </Text>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={16} fontWeight="bold" color="gray700">
                    {data.nome || "Nome do titular"}
                  </Text>
                  <HStack alignItems="center" justifyContent="flex-start">
                    <Box
                      width={24}
                      height={24}
                      borderRadius={12}
                      backgroundColor="red"
                    />
                    <Box
                      width={24}
                      height={24}
                      borderRadius={12}
                      backgroundColor="orange"
                      marginLeft={-12} // Move a laranja para sobrepor a vermelha
                    />
                  </HStack>
                </HStack>
              </Box>
            </Animated.View>

            <Animated.View
              style={[
                { position: "absolute", width: "100%", height: "100%" },
                backAnimated,
              ]}
            >
              <Box
                width="100%"
                height="100%"
                borderRadius="md"
                padding="$3"
                backgroundColor="#ffffc1"
                backfaceVisibility="hidden"
                justifyContent="space-between"
              >
                <Box>
                  <Text fontSize={14} color="$gray700">
                    Número do cartão
                  </Text>
                  <Text fontSize={16} fontWeight="bold" color="$gray700">
                    {data.numero || "**** **** **** ****"}
                  </Text>
                </Box>

                <HStack justifyContent="space-between" width="100%">
                  <Box>
                    <Text fontSize={14} color="$gray700">
                      Validade
                    </Text>
                    <Text fontSize={16} fontWeight="bold" color="gray700">
                      {data.validade || "MM/AA"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={14} color="gray700">
                      CVV
                    </Text>
                    <Text fontSize={16} fontWeight="bold" color="gray700">
                      {data.cvv || "***"}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Animated.View>
          </Box>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}
