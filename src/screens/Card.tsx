import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Box, Image } from "@gluestack-ui/themed";
import { CreditCard, CARD_SIDE } from "@components/credit-card";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import gold from "@assets/gold.png";

export function Cartao() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCVV] = useState("");

  const cardSide = useSharedValue(CARD_SIDE.front);

  const formatValidade = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const limited = cleaned.slice(0, 6);

    if (limited.length >= 3) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    return limited;
  };

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Container principal com position relative */}
      <Box flex={1} position="relative">
        {/* Imagem de background gold */}
        <Image
          w="$full"
          h="$full"
          source={gold}
          alt="Gold background"
          position="absolute"
          top={0}
          left={0}
          zIndex={-1}
          resizeMode="cover"
        />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Box flex={1} p="$8" mt="$2">
            <CreditCard
              cardSide={cardSide}
              data={{
                nome: nome,
                numero: numero.replace(/(\d{4})(?=\d)/g, "$1 "),
                validade: formatValidade(validade),
                cvv: cvv,
              }}
            />

            <Button title="Girar" mt="$2" onPress={handleFlipCard} />

            <Box mt="$4" gap="1">
              <Input
                placeholder="Nome do titular"
                onChangeText={setNome}
                onFocus={showFrontCard}
              />
              <Input
                placeholder="Número do cartão"
                keyboardType="numeric"
                maxLength={16}
                onChangeText={setNumero}
                onFocus={showBackCard}
              />
              <Input
                placeholder="01/02"
                style={{ width: 20 }}
                maxLength={5}
                keyboardType="numeric"
                onChangeText={setValidade}
                onFocus={showBackCard}
              />
              <Input
                placeholder="123"
                w="$80"
                keyboardType="numeric"
                maxLength={3}
                onChangeText={setCVV}
                onFocus={showBackCard}
              />
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}
