import React from "react";
import {
  VStack,
  Heading,
  Text,
  Icon,
  Box,
  Pressable,
  useToast,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Clipboard, ImageBackground } from "react-native";
import { ArrowLeft, Copy } from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";
import { Button } from "@components/Button";
import { CustomToast } from "../components/CustomToast";
import Gold from "@assets/gold.png";

export function Pix() {
  const navigation = useNavigation();
  const toast = useToast();

  const pixCode =
    "00020126330014BR.GOV.BCB.PIX0114+5511999999992520001234567895303986540625.005802BR5920Nome do Beneficiário6009SAO RODRIGO62070503***6304ABCD";

  const copyToClipboard = () => {
    Clipboard.setString(pixCode);

    toast.show({
      placement: "top",
      duration: 3000,
      render: () => (
        <CustomToast
          message="O código Pix foi copiado!"
          bgColor="$green500"
          textColor="$white"
        />
      ),
    });
  };

  return (
    <Box as={ImageBackground} source={Gold} flex={1} resizeMode="cover" p="$6">
      <Pressable onPress={() => navigation.goBack()} alignSelf="flex-start">
        <Icon as={ArrowLeft} size="xl" color="$white" />
      </Pressable>

      <VStack flex={1} alignItems="center" justifyContent="center">
        <Heading color="$gray700" mt="$4" mb="$6">
          Pagamento via Pix
        </Heading>

        <Box bg="$white" p="$2" rounded="$lg">
          <QRCode value={pixCode} size={200} />
        </Box>

        <Text color="$gray700" mt="$4" textAlign="center">
          Escaneie o QR Code ou copie o código abaixo para realizar o pagamento.
        </Text>

        <Box bg="$gray800" p="$4" rounded="$md" mt="$4" alignItems="center">
          <Text
            color="$gray700"
            fontWeight="$bold"
            selectable
            textAlign="center"
          >
            {pixCode}
          </Text>
        </Box>

        <Button mt="$6" w="$full" title="Copiar Código Pix" onPress={copyToClipboard}>
          <Icon as={Copy} size="lg" color="$white" mr="$2" />
          <Text color="$white">Copiar Código Pix</Text>
        </Button>
      </VStack>
    </Box>
  );
}
