import React, { useCallback } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useStore } from "../../store/store";
import { COLORS, SPACING } from "../../theme/theme";
import Header from "../../components/Header";
import EmptyListAnimation from "../../components/Animation/EmptyList";
import PaymentFooter from "../../components/Payment/Footer";
import CartItem from "../../components/CartItem";

const CartScreen: React.FC = ({ navigation, route }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);

  console.log(CartList);

  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity
  );

  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const incrementCartItemQuantityHandler = useCallback(
    (id: string, size: string) => {
      incrementCartItemQuantity(id, size);
      calculateCartPrice();
    },
    []
  );
  const decrementCartItemQuantityHandler = useCallback(
    (id: string, size: string) => {
      decrementCartItemQuantity(id, size);
      calculateCartPrice();
    },
    []
  );

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandle = useCallback(() => {
    navigation.push("Payment", { amount: CartPrice });
  }, []);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryPaleDogwoodHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[
            styles.ScrollViewInnerView,
            {
              marginBottom: tabBarHeight,
            },
          ]}
        >
          <View style={styles.ItemContainer}>
            <Header title="Cart" />
            {CartList.length == 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Details", {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                        imagelink_portrait: data.imagelink_portrait,
                      });
                    }}
                    key={data.id}
                  >
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_portrait={data.imagelink_portrait}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandle={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandle={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <PaymentFooter
              buttomPressHandler={buttonPressHandle}
              buttonTitle="Pay"
              price={{ price: CartPrice, currency: "$" }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryPaleDogwoodHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
