import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import Bag123Svg from "@assets/bag123.svg";

import { Home } from "@screens/Home";
import { Product } from "@screens/Product";
import { Cart } from "@screens/Cart";

type AppTabRoutes = {
  home: undefined;
  cart: undefined;
  product: { product: string };
};

export type AppTabNavigationProps = BottomTabNavigationProp<AppTabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutes>();

export function AppTabs() {
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
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Bag123Svg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="product"
        component={Product}
        options={{
          tabBarButton: () => null, // Esconde o botão do produto no tab
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}
