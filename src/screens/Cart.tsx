import React, { useState } from "react";
import { VStack, Text, HStack, Icon, Center, Image, ImageBackground } from "@gluestack-ui/themed";
import { Button } from "@components/Button";
import { TouchableOpacity } from "react-native";
import { ScreenHeader } from "@components/ScreenHeader";
import { Trash } from "lucide-react-native";  
import { Plus, Minus } from "lucide-react-native";  
import gold from "@assets/gold.png";  // Corrigindo a importação da imagem

type CartItem = {
  name: string | undefined;
  id: number;
  price: number;
  quantity: number;
  imageUrl: string;  
};

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Produto",  price: 50.0, quantity: 1, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png" },
    { id: 2, name: "Produto", price: 100.0, quantity: 2, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png"},
    { id: 3, name: "Produto", price: 150.0, quantity: 1, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlWdBY1scPdt4m5lGNgx6WSVe9w3NJjDWpQ&s.png"},
  ]);

  // Função para atualizar a quantidade
  const updateQuantity = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
    );
  };

  // Função para excluir item do carrinho
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Cálculo do total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <ImageBackground
      source={gold}  // Usando a imagem como fundo
      style={{ flex: 1, width: "100%", height: "100%" }}  // Preenche toda a tela
    >
      <VStack flex={1}  opacity={0.9} justifyContent="space-between">
        <VStack flex={1} space="md" p="$4">
          <ScreenHeader title="Carrinho de Compras" />

          {cartItems.map((item) => (
            <HStack
              key={item.id}
              alignItems="center"
              justifyContent="space-between"
              bg="$gray800"
              p="$4"
              borderRadius="$lg"
              space="md"
            >
              {/* Exibindo a imagem do produto */}
              <Image
                source={{ uri: item.imageUrl }}
                alt={item.name}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />

              {/* Nome do item */}
              <Text color="$gray100" fontSize="$lg">
                {item.name}
              </Text>

              {/* Controles de quantidade */}
              <HStack alignItems="center" space="md">
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Icon as={Minus} color="$violet500" size="lg" />
                </TouchableOpacity>
                <Text color="$gray300" fontSize="$md">
                  {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Icon as={Plus} color="$violet500" size="lg" />
                </TouchableOpacity>
              </HStack>

              {/* Preço */}
              <Text color="$gray300" fontSize="$lg">
                R$ {item.price.toFixed(2)}
              </Text>

              {/* Ícone de excluir */}
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Icon as={Trash} color="$red500" size="lg" />
              </TouchableOpacity>
            </HStack>
          ))}

          {/* Total */}
          <HStack justifyContent="space-between" mt="$6">
            <Text color="$gray100" fontSize="$lg" fontWeight="bold">
              Total:
            </Text>
            <Text color="$green500" fontSize="$2xl" fontWeight="bold">
              R$ {total.toFixed(2)}
            </Text>
          </HStack>
        </VStack>

        {/* Botão para fechar pedido */}
        <Center mt="$2">
          <Button title="Fechar Pedido" variant="solid" />
        </Center>
      </VStack>
    </ImageBackground>
  );
}
