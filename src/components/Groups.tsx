import { ComponentProps } from "react";
import { Button, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof Button> & {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {

  return (
    <Button
      mr="$3"
      minWidth="$24"
      h="$10"
      bg="$#A3A3A3"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderWidth={isActive ? 1 : 0}
      sx={{
        ":active": {
          borderWidth: 1,
        },
      }}
      {...rest}
    >
    <Text
        color={isActive ? '$violet500' : '$gray200'}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
    >
        {name}
      </Text>
    </Button>
  );
}
