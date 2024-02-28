import React from "react";
import { StyleSheet, Text } from "react-native";
import { useStore } from "../../store/store";

const Cart: React.FC = ()  => {
  const CartList = useStore((state: any) => state.CartList);
  console.log('Cartlist =', CartList.length);

  return <Text>Cart</Text>
}

const styles = StyleSheet.create({});

export default Cart;
