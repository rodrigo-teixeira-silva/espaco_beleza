import { useState } from "react";
import { SectionList } from "react-native";
import { Center, Heading, VStack, Text } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { Section } from "lucide-react-native";

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
  ]);

  return (
    <VStack flex={1} backgroundColor="#121214">
      <StatusBar style="light" backgroundColor="#121214" />
      <ScreenHeader title="Histórico de agendamentos" />

      <SectionList
        sections={procedimento}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            fontFamily="$heading"
            color="$gray200"
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
    </VStack>
  );
}
