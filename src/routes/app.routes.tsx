import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Platform } from "react-native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import Bag123Svg from "@assets/bag123.svg";
import Wallet1Svg from "@assets/wallet1.svg";
import ShoppingSvg from "@assets/shopping.svg";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { Product } from "@screens/Product";
import { Cart } from "@screens/Cart";
import { Pay } from "@screens/Pay";
import { Wallet } from "@screens/wallet";
import { PaymentWallet } from "@screens/PaymentWallet";
import gold from "@assets/gold.png";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  product: { product: string };
  cart: undefined;
  pay: undefined;
  wallet: undefined;
  shoppingSvg: undefined;
};

export type appNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<AppRoutes>();
const Drawer = createDrawerNavigator();

function BottomTabs() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["5"];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: tokens.colors.yellow500,
        tabBarInactiveTintColor: tokens.colors.yellow100,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray900,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["12"],
          paddingTop: tokens.space["4"],
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
          tabBarLabel: "Início",
        }}
      />

      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="wallet"
        component={PaymentWallet}
        options={{
          tabBarIcon: ({ color }) => (
            <Wallet1Svg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
          tabBarLabel: "Perfil",
        }}
      />

      <Tab.Screen
        name="product"
        component={Product}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />

      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            // <Bag123Svg fill={color} width={iconSize} height={iconSize} />
            <ShoppingSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="pay"
        component={Pay}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#ffffc1" },
        drawerActiveTintColor: "#b9b950",
        drawerInactiveTintColor: "$gray200",
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="Inicio" component={BottomTabs} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
}
