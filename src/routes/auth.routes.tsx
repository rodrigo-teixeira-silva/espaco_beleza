import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Signin } from "@screens/Signin";
import { SignUp } from "@screens/SignUp";
import { RecoverPassword } from "@screens/RecoverPassword";
import { Welcome } from "@screens/Welcome";
import { SplashScreen } from "@screens/SplashScreen";

type AuthRoutes = {
  Welcome: undefined;
  Signin: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  Cart: undefined;
  SplashScreen: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>

      <Screen name="SplashScreen" component={SplashScreen}/>

      <Screen name="Welcome" component={Welcome} />

      <Screen name="Signin" component={Signin} />

      <Screen name="SignUp" component={SignUp} />

      <Screen name="RecoverPassword" component={RecoverPassword} />
    </Navigator>
  );
}
