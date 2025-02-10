import { Center, Heading } from "@gluestack-ui/themed";
import { ImageBackground, StyleSheet } from "react-native";
import gold from "@assets/gold.png";

type Props = {
  title: string;
};

export function ScreenHeader({ title }: Props) {
  return (
    <ImageBackground
      source={gold}
      style={styles.background}
      resizeMode="cover"
    >
      <Center bg="transparent" pb="$6" pt="$16">
        <Heading color="$gray600" fontSize="$xl" fontFamily="$heading">
          {title}
        </Heading>
      </Center>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 120, // Altura fixa para o header
    justifyContent: "center",
  },
});
