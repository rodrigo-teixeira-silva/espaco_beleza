import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HStack, VStack, Text, Icon, Heading } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPhoto } from "./UserPhoto";
import { LogOut, Menu } from "lucide-react-native";
import { TouchableOpacity } from "react-native";


type DrawerRoutes = {
  Home: undefined;
  Profile: undefined;
  History: undefined;
};

export function HomeHeader() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerRoutes>>();

  return (
    <SafeAreaView style={{ backgroundColor: "#202024" }}>
      <HStack
        pt="$5"
        pb="$5"
        px="$8"
        alignItems="center"
        gap="$4"
        w="100%"
      >
      

        <UserPhoto
          source={{ uri: "https://github.com/rodrigo-teixeira-silva.png" }}
          w="$16"
          h="$16"
          alt="Imagem do usuário"
        />

        <VStack flex={1}>
          <Text color="$gray100" fontSize="$sm">
            Olá,
          </Text>

          <Heading color="$gray100" fontSize="$md">
            Rodrigo Teixeira
          </Heading>
        </VStack>

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon as={Menu} color="$gray100" size="xl" />
        </TouchableOpacity>
      </HStack>
    </SafeAreaView>
  );
}
