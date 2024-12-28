import {
  Input as GlueStackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      <GlueStackInput
          isInvalid={isInvalid}
         h="$14"
        borderWidth="$0"
        borderRadius="$full"
        $focus={{
          borderWidth: 1,
          // borderColor: "$violet700",

 borderColor: invalid ? '$red500' : '$violet700',
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: '$red500',
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          bg="$gray100"
          px="$4"
          color="$gray700"
          fontFamily="$body"
          placeholderTextColor="$violet500"
          {...rest}
        />
      </GlueStackInput>

      {errorMessage && (
        <FormControlError>
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}
