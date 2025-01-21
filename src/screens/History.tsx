import { useState, useEffect } from "react";
import { SectionList, ImageBackground, StatusBar, View } from "react-native";
import { Heading, VStack, Text } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import gold from "@assets/gold.png"; 

export function History() {
  const [procedimento, setProcedimentos] = useState([
    {
      title: "04.12.24",
      data: ["tipos de pele"],
    },
    {
      title: "10.12.24",
      data: ["Cores de pele"],
    },
    {
      title: "10.12.24",
      data: ["Cores de pele"],
    },
  ]);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content"); 
    StatusBar.setTranslucent(true); 
    StatusBar.setBackgroundColor("transparent");
  }, []);

  return (
    <VStack flex={1}>
      
      <ImageBackground
        source={gold}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* View para aplicar o fundo no Header */}
        <View style={{ backgroundColor: "transparent", paddingTop: StatusBar.currentHeight || 24 }}>
          <ScreenHeader title="Histórico de agendamentos" />
        </View>

        <SectionList
          sections={procedimento}
          keyExtractor={(item) => item}
          renderItem={() => <HistoryCard />}
          renderSectionHeader={({ section }) => (
            <Heading
              fontFamily="$heading"
              color="$gray500"
              fontSize={"$md"}
              mt="$10"
              mb="$3"
            >
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            procedimento.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="$gray600" textAlign="center">
              Não há procedimentos registrados.
            </Text>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ImageBackground>
    </VStack>
  );
}
