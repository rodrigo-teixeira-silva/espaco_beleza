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

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
    );
  };


  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <ImageBackground
      source={gold}  
      style={{ flex: 1, width: "100%", height: "100%" }}  
    >
      <VStack flex={1}  opacity={0.9} justifyContent="space-between">
        <VStack flex={1} >
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
           
              <Image
                source={{ uri: item.imageUrl }}
                alt={item.name}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />

           
              <Text color="$gray700" fontSize="$lg">
                {item.name}
              </Text>

            
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

             
              <Text color="$gray300" fontSize="$lg">
                R$ {item.price.toFixed(2)}
              </Text>

           
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Icon as={Trash} color="$red500" size="lg" />
              </TouchableOpacity>
            </HStack>
          ))}

         
          <HStack justifyContent="space-between" mt="$6">
            <Text color="$gray700" fontSize="$lg" fontWeight="bold">
              Total:
            </Text>
            <Text color="$green500" fontSize="$2xl" fontWeight="bold">
              R$ {total.toFixed(2)}
            </Text>
          </HStack>
        </VStack>

      
        <Center mt="$2" mb="$4">
          <Button title="Fechar Pedido" variant="solid" />
        </Center>
      </VStack>
    </ImageBackground>
  );
}
