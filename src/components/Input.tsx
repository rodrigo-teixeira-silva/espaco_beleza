import { ComponentProps } from "react";
import { Input as GlueStackInput, InputField } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField>;

export function Input({ ...rest }: Props) {
  return (
    <GlueStackInput
      bg="$gray100"
      h="$14"
      px="$4"
      borderWidth="$0"
      borderRadius="$full" 
      $focus={{
        borderWidth: 1,
        borderColor: "$violet700",
      }}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholder="$violet500"
        {...rest}
      />
    </GlueStackInput>
  );
}
