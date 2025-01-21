import WatsappSvg from "@assets/whatsapp.svg";
import { HStack , Pressable,} from "@gluestack-ui/themed";

function handleWhatsAppPress() {
  console.log("WhatsApp button pressed!");
  // Lógica para abrir o WhatsApp ou redirecionar
}

type WhatsAppProps = {
  item: {
    type: string;
  };
};

export function WhatsAppButton ({item}: WhatsAppProps){
  if ( item.type === "whatsappButton") {
    return (
      <HStack mt="$8" justifyContent="flex-end" px="$3" alignItems="center">
        <Pressable
          onPress={handleWhatsAppPress}
          bg="$gray500"
          rounded="$full"
          p="$4"
          elevation={5}
        >
          <WatsappSvg width={50} height={50} />
        </Pressable>
      </HStack>
    );
  }
}