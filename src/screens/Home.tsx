import { useState } from "react";
import { FlatList } from "react-native";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Groups";

export function Home() {
  const [group, SetGroup] = useState([
    "Treinamntos",
    "Produtos",
    "Consultas",
    "Vendas",
    "clientes",
  ]);
  const [groupSelected, SetGroupSelected] = useState<string | undefined>(undefined);

  return (
    <VStack flex={1} backgroundColor="#DBDBDB">
      <HomeHeader />

      <FlatList
        data={group}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => SetGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ margin: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px="$8">
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$#000e21" fontSize="$sm" fontFamily="$heading">
            Aulas
          </Heading>

          <Text color="$#000e21" fontSize="$sm" fontFamily="$body">
            4
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
