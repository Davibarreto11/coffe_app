import React from "react";
import { StyleSheet, Text } from "react-native";

import { useStore } from "../../store/store";

const Home: React.FC = () => {
  const CoffeList = useStore((state: any) => state.CoffeeList)
  console.log('CofferList =', CoffeList.length)

  return <Text>Home Page</Text>;
};

const styles = StyleSheet.create({});

export default Home;
