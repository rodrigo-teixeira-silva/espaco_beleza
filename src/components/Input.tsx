import { ComponentProps } from "react";
import { Input as GlueStackInput, InputField } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?:boolean
}

export function Input({ isReadOnly = false, ...rest }: Props) {
  return (
    <GlueStackInput
     
      h="$14"
  
      borderWidth="$0"
      borderRadius="$full"
      $focus={{
        borderWidth: 1,
        borderColor: "$violet700",
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
       bg="$gray100"
           px="$4"
        // px="$4"
         color="$gray700"
        fontFamily="$body"
        placeholder="$violet500"
        {...rest}
      />
    </GlueStackInput>
  );
}
