import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

import GradientBGIcon from "../Icon/GradientBGIcon";
import ProfilePic from "../ProfilePic";

interface HeaderBarProps {
  title?: string;
}

const Header: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryPaleDogwoodHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryBlackHex,
  },
});

export default Header;
