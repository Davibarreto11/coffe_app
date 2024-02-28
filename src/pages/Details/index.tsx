import React, { useCallback, useState } from "react";
import {
  ImageProps,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useStore } from "../../store/store";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../theme/theme";
import ImageBackgroundInfo from "../../components/ImageBackgroundInfo";
import PaymentFooter from "../../components/PaymentFooter";

interface CoffeeDataParams {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: ImageProps;
  imagelink_portrait: ImageProps;
  ingredients: string;
  special_ingredient: string;
  prices: [
    {
      currency: string;
      price: string;
      size: string;
    }
  ];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}

const Details: React.FC = ({ navigation, route }: any) => {
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );

  const [fullDesc, setFullDesc] = useState(false);
  const [choice, setChoice] = useState<CoffeeDataParams>(
    useStore((state: any) =>
      route.params.type == "Coffee" ? state.CoffeeList : state.BeanList
    )[route.params.index]
  );
  const [price, setPrice] = useState(choice.prices[0]);

  console.log(price);
  // console.log(
  //   choice.name,
  //   choice.imagelink_portrait,
  //   choice.favourite,
  //   choice.id
  // );

  const ToggleFavourite = useCallback(
    (favourite: boolean, type: string, id: string) => {
      favourite
        ? deleteFromFavoriteList(type, id)
        : addToFavoriteList(type, id);
    },
    []
  );

  const AddToCartHandler = useCallback(
    ({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      price,
    }: any) => {
      addToCart({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices: [{ ...price, quantity: 1 }],
      });
      calculateCartPrice();
      navigation.navigate("Cart");
    },
    []
  );

  const BackHandler = useCallback(() => {
    navigation.pop();
  }, []);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={route.params.imagelink_portrait}
          type={choice.type}
          id={choice.id}
          favourite={choice.favourite}
          name={choice.name}
          special_ingredient={choice.special_ingredient}
          ingredients={choice.ingredients}
          average_rating={choice.average_rating}
          ratings_count={choice.ratings_count}
          roasted={choice.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText}>{choice.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {choice.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {choice.prices.map((data: any) => (
              <TouchableOpacity
                key={data.id}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        choice.type == "bean"
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttomPressHandler={() => {
            AddToCartHandler({
              id: choice.id,
              index: choice.index,
              name: choice.name,
              roasted: choice.roasted,
              imagelink_square: choice.imagelink_square,
              special_ingredient: choice.special_ingredient,
              type: choice.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default Details;
