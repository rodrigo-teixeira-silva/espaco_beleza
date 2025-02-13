import React from "react";
import { Modal, Dimensions } from "react-native";
import { Box, VStack, Text, Pressable } from "@gluestack-ui/themed";
import { Button } from "@components/Button";
import { BlurView } from "@react-native-community/blur";
import { X } from "lucide-react-native";

const screenHeight = Dimensions.get("window").height;

type CustomDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  buttons: JSX.Element[];
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  title,
  content,
  buttons,
}) => {
  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} animationType="slide" onRequestClose={onClose}>
      <BlurView
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        blurType="light"
        blurAmount={2}
      />
      <Box
        bg="rgba(32, 32, 36, 0.8)"
        position="absolute"
        top={screenHeight * 0.5}
        left={0}
        right={0}
        height={screenHeight * 0.5}
        px="$4"
        py="$6"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
      >
        <VStack flex={1}>
          <Pressable onPress={onClose} alignSelf="flex-end" p="$2">
            <X color="#FFF" size={24} /> {/* Usa o ícone diretamente */}
          </Pressable>
     
          <Text color="#FFF" fontSize="$md" mb="$4" textAlign="center">
            {title}
          </Text>

          <Text color="#FFF" fontSize="$sm" mb="$4" textAlign="center">
            {content}
          </Text>

          {buttons.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </VStack>
      </Box>
    </Modal>
  );
};

export default CustomDrawer;
