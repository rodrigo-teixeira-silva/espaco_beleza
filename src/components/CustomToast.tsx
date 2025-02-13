import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

interface CustomToastProps {
  message: string;
  bgColor: string;  // Cor de fundo
  textColor: string;  // Cor do texto
}

export function CustomToast({ message, bgColor, textColor }: CustomToastProps) {
  return (
    <Box bg={bgColor} px="$4" py="$2" rounded="$md" boxShadow="$md">
      <Text color={textColor}>{message}</Text>
    </Box>
  );
}
