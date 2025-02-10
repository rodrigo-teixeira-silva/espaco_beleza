import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Center, Image, VStack } from "@gluestack-ui/themed";
import { StatusBar, Animated } from "react-native";

import gold from "@assets/gold.png";
import Logo from "@assets/logo.svg";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Loading } from "@components/Loading";

export function SplashScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [showLoading, setShowLoading] = useState(false);
  const logoScale = new Animated.Value(1);
  const logoOpacity = new Animated.Value(1);
  const eloreOpacity = new Animated.Value(0);
  const loadingOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(eloreOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setShowLoading(true);
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    const navigationTimer = setTimeout(() => {
      navigation.navigate("Started");
    }, 5000);

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <Center flex={1}>
      <Image
        w="$full"
        h="$full"
        source={gold}
        defaultSource={gold}
        alt="estética e beleza"
        position="absolute"
      />
      <Center flex={1} position="relative" justifyContent="center" alignItems="center">
        <VStack flex={1} justifyContent="center" alignItems="center" position="absolute">
          <Animated.View
            style={{
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
              position: "absolute",
              top: 0,
            }}
          >
            <Logo width={160} height={160} />
          </Animated.View>
          <Animated.View
            style={{
              opacity: eloreOpacity,
              position: "absolute",
              top: 180,
            }}
          >
            <Text color="#00000" fontSize="$3xl" fontWeight="bold">
              LORE
            </Text>
          </Animated.View>
          {showLoading && (
            <Animated.View
              style={{
                opacity: loadingOpacity,
                position: "absolute",
                top: "100%",
              }}
            >
              <Loading />
            </Animated.View>
          )}
        </VStack>
      </Center>
    </Center>
  );
}