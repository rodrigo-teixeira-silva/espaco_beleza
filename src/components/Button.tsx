import { ComponentProps } from "react";
import { Button as GluestackButton, Text, Spinner } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg="#ffffc1"
      borderWidth="$0"
      borderColor="#ffffc1"
      rounded="$full"
      $active-bg="#b9b950"
      isDisabled={isLoading} // Desativa o botão enquanto carrega
      {...rest}
    >
      {isLoading ? (
        <Spinner color="#000" />
      ) : (
        <Text style={{ color: "#000", fontWeight: "bold" }}>{title}</Text>
      )}
    </GluestackButton>
  );
}
