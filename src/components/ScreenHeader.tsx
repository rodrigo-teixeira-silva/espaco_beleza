import { Center, Heading } from "@gluestack-ui/themed";

type Props = {
  title: string;
};

export function ScreenHeader({ title }: Props) {
  return (
    <Center bg="transparent"
    
    pb="$6" pt="$16" >
      <Heading color="$gray600" fontSize="$xl" fontFamily="$heading">
        {title}
      </Heading>
    </Center>
  );
}
