import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeData";
import BeansData from "../data/BeansData";

export const useStore = create(
  persist(
    (set, get) => ({
      BeansList: BeansData,
      CoffeeList: CoffeeData,
      CarPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if ((size = false)) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].price.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          })
        ),
      calculateCartPrice: () =>
        set(
          produce((state) => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempPrice =
                  tempPrice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartLis[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice = totalPrice + tempPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          })
        ),
      addToFavorite: (type: string, id: string) =>
        set(
          produce((state) => {
            if (type == "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type == "Bean") {
              for (let i = 0; i < state.BeansList.length; i++) {
                if (state.BeansList[i].id == id) {
                  if (state.BeansList[i].favourite == false) {
                    state.BeansList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeansList[i]);
                  }
                  break;
                }
              }
            }
          })
        ),
      deleteFromFavoriteItemList: (type: string, id: string) =>
        set(
          produce((state) => {
            if (type == "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == true) {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type == "Bean") {
              for (let i = 0; i < state.BeansList.length; i++) {
                if (state.BeansList[i].id == id) {
                  if (state.BeansList[i].favourite == true) {
                    state.BeansList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          })
        ),
    }),
    {
      name: "coffe-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
