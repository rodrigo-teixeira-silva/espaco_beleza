import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { VStack, Text, Heading, Center, Image, Divider, useToast } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { Button } from "@components/Button";
import { TransactionCard } from "@components/TransactionCard";  

import gold from "@assets/gold.png";

export function PaymentWallet() {
  const [balance, setBalance] = useState(2500); 
  const [transactions, setTransactions] = useState([
    { id: 1, date: "01/21/2025", amount: -500, description: "Pagamento em supermercado" },
    { id: 2, date: "01/19/2025", amount: 1500, description: "Depósito bancário" },
    { id: 3, date: "01/18/2025", amount: -100, description: "Compra online" },
  ]);
  
  const toast = useToast();

  const addFunds = () => {
    setBalance(balance + 1000);
    toast.show({ description: "Fundos adicionados com sucesso!", placement: "top" });
  };

  const withdrawFunds = () => {
    if (balance >= 500) {
      setBalance(balance - 500); 
      toast.show({ description: "Retirada realizada com sucesso!", placement: "top" });
    } else {
      toast.show({ description: "Saldo insuficiente para retirada", placement: "top", status: "error" });
    }
  };

  return (
    <VStack flex={1}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      
      <Image
        w="$full"
        h="$full"
        source={gold}
        defaultSource={gold}
        alt="estética e beleza"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        resizeMode="cover"
      />
      
      <Center bg="transparent" pt="$8" pb="$4" px="$6" flex={1} justifyContent="center">
        <Heading color="$gold500" fontFamily="$heading" fontSize="$xl">
          Carteira de Pagamento
        </Heading>
        <Text color="$gray00" fontSize="$lg" mt="$2">
          Saldo disponível:
        </Text>
        <Text color="$green500" fontSize="$2xl" fontWeight="bold" mt="$2">
          R$ {balance.toFixed(2)}
        </Text>
      </Center>
      
      <Divider my="$4" bg="$gray700" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexGrow: 1,
        }}
      >
        <VStack space="md" mt="$6">
          <Heading fontFamily="$heading" color="$gold500" fontSize="$lg">
            Histórico de Transações
          </Heading>

          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              date={transaction.date}
              amount={transaction.amount}
              description={transaction.description}
            />
          ))}
        </VStack>
      </ScrollView>

      <Center mt="$8" px="$10">
        <Button onPress={addFunds} title="Adicionar Fundos" variant="solid" mb="$4" />
        {/* <Button onPress={withdrawFunds} title="Retirar Fundos" variant="solid" /> */}
      </Center>
    </VStack>
  );
}
