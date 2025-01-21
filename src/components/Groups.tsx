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
      bg="#ffffc1"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderWidth={isActive ? 1 : 0}
      borderColor={isActive ? "#000000" : "transparent"} 
      sx={{
        ":active": {
          borderColor: "#b9b950", 
        },
      }}
      {...rest}
    >
      <Text
        color={isActive ? "#b9b950" : "$gray300"}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
      >
        {name}
      </Text>
    </Button>
  );
}
