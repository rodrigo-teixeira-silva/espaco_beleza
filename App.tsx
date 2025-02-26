import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { config } from "./config/gluestack-ui.config";

import { Routes } from "./src/routes";
import { Loading } from "@components/Loading";
import { Signin } from "@screens/Signin";
import { SignUp } from "@screens/SignUp";
import { AuthcontextProvider } from "@contexts/authcontext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="trasparent"
        translucent
      />
      <AuthcontextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthcontextProvider>
    </GluestackUIProvider>
  );
}
