import { ComponentProps } from "react";
import { Button, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof Button> & {
  name: string;
  isActive: boolean;
};

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Button
      mr="$3"
      minWidth="$24"
      h="$10"
      bg="$gray400"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderWidth={isActive ? 1 : 0}
      borderColor={isActive ? "$violet600" : "transparent"} // Cor violeta para borda ativa
      sx={{
        ":active": {
          borderColor: "$violet600", 
        },
      }}
      {...rest}
    >
      <Text
        color={isActive ? "$violet600" : "$gray100"}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
      >
        {name}
      </Text>
    </Button>
  );
}
