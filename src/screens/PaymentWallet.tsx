import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { VStack, Text, Heading, Center, useToast } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { Button } from "@components/Button";
import { TransactionCard } from "@components/TransactionCard";  

export function PaymentWallet() {
  const [balance, setBalance] = useState(2500); 
  const [transactions, setTransactions] = useState([
    { id: 1, date: "01/21/2025", amount: -500, description: "Pagamento em supermercado" },
    { id: 2, date: "01/19/2025", amount: 1500, description: "Depósito bancário" },
    { id: 3, date: "01/18/2025", amount: -100, description: "Compra online" },
  ]);
  
  const toast = useToast();

  // Função para adicionar fundos
  const addFunds = () => {
    setBalance(balance + 1000);
    toast.show({ title: "Fundos adicionados com sucesso!", placement: "top" });
  };

  // Função para retirar fundos
  const withdrawFunds = () => {
    if (balance >= 500) {
      setBalance(balance - 500); 
      toast.show({ title: "Retirada realizada com sucesso!", placement: "top" });
    } else {
      toast.show({ title: "Saldo insuficiente para retirada", placement: "top", status: "error" });
    }
  };

  return (
    <VStack flex={1}>
      <StatusBar style="light" backgroundColor="#121214" translucent />
      
      <Center bg="$gray900" pt="$8" pb="$4" px="$6">
        <Heading color="$white" fontFamily="$heading" fontSize="$xl">
          Carteira de Pagamento
        </Heading>
        <Text color="$gray200" fontSize="$lg" mt="$2">
          Saldo disponível:
        </Text>
        <Text color="$green500" fontSize="$2xl" fontWeight="bold" mt="$2">
          R$ {balance.toFixed(2)}
        </Text>
      </Center>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexGrow: 1,
        }}
      >
        <VStack space="md" mt="$6">
          <Heading fontFamily="$heading" color="$gray200" fontSize="$lg">
            Histórico de Transações
          </Heading>

          {/* Exibindo transações */}
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              date={transaction.date}
              amount={transaction.amount}
              description={transaction.description}
            />
          ))}

          <Center mt="$8" px="$10">
            <Button onPress={addFunds} title="Adicionar Fundos" variant="primary" mb="$4" />
            <Button onPress={withdrawFunds} title="Retirar Fundos" variant="secondary" />
          </Center>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
