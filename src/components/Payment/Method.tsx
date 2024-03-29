import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../theme/theme";
import CustomIcon from "../Icon/CustomIcon";

interface PaymentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View
      style={
        (styles.PaymentCardContainer,
        {
          borderColor:
            paymentMode == name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryIsabellineHex,
        })
      }
    >
      {isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryIsabellineHex, COLORS.primaryPaleDogwoodHex]}
          style={styles.LinearGradientWallet}
        >
          <View style={styles.WallerRow}>
            <CustomIcon
              name="wallet"
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_30}
            />
            <Text style={styles.TitleWallet}>Wallet</Text>
          </View>
          <Text style={styles.PaymentPice}>@ 100.50</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryIsabellineHex, COLORS.primaryPaleDogwoodHex]}
          style={styles.LinearGradientRegular}
        >
          <Image source={icon} style={styles.PaymentImage} />
          <Text style={styles.PaymentTitle}>{name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  PaymentCardContainer: {
    borderRadius: BORDERRADIUS.radius_15 * 2,
    backgroundColor: COLORS.primaryIsabellineHex,
    borderWidth: 3,
  },
  LinearGradientWallet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  WallerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_24,
  },
  TitleWallet: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  PaymentTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  LinearGradientRegular: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  PaymentPice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  PaymentImage: {
    height: SPACING.space_30,
    width: SPACING.space_30,
  },
});

export default PaymentMethod;
