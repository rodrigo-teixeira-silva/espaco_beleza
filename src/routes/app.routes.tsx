import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import Bag123Svg from "@assets/bag123.svg";

 

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { Product } from "@screens/Product";
import { Cart } from "@screens/Cart";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  product: { product: string };
  cart: undefined; // Adicionei a rota para "cart"
};

export type appNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.violet500,
        tabBarInactiveTintColor: tokens.colors.violet300,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray400,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["12"],
          paddingTop: tokens.space["6"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="product"
        component={Product}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />

      <Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Bag123Svg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      
    </Navigator>
  );
}
