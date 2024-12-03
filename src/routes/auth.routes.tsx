import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Signin } from "@screens/Signin";
import { SignUp } from "@screens/SignUp";
import { RecoverPassword } from "@screens/RecoverPassword";
import { Welcome } from "@screens/Welcome";

type AuthRoutes = {
  Welcome: undefined;
  Signin: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  };

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Welcome" component={Welcome} />

      <Screen name="Signin" component={Signin} />

      <Screen name="SignUp" component={SignUp} />

      <Screen name="RecoverPassword" component={RecoverPassword} />
    </Navigator>
  );
}
