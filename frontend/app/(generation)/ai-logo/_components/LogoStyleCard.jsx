import { useTheme } from "@/contexts/ThemeContext";
import { createThemedStyles } from "@/utils/styleHelpers";
import { Image, Text, TouchableOpacity, View } from "react-native";
import NoStyleIcon from "./NoStyleIcon";

const LogoStyleCard = ({ item, selectedStyleId, onPress }) => {
  const theme = useTheme();
  const styles = createThemedStyles(createStyles, theme);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {item.image ? (
        <Image
          style={[styles.cardImage, selectedStyleId === item.id && styles.cardImageSelected]}
          resizeMode="cover"
          width={90}
          height={90}
          source={item.image}
        />
      ) : (
        <View
          style={[styles.cardNoStyle, selectedStyleId === item.id && styles.cardNoStyleSelected]}
        >
          <NoStyleIcon />
        </View>
      )}
      <Text
        style={[styles.logoStyleName, selectedStyleId === item.id && styles.logoStyleNameSelected]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => ({
  card: {
    width: theme.tokens.dimensions.card.width,
    marginRight: theme.spacing[2],
  },
  cardImage: {
    borderRadius: theme.borderRadius.card,
    marginHorizontal: "auto",
  },
  cardImageSelected: {
    borderWidth: 2,
    borderColor: theme.colors.interactive.borderSelected,
  },
  cardNoStyle: {
    width: theme.tokens.dimensions.card.width,
    height: theme.tokens.dimensions.card.height,
    borderRadius: theme.borderRadius.card,
    backgroundColor: theme.colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  cardNoStyleSelected: {
    borderWidth: 2,
    borderColor: theme.colors.interactive.borderSelected,
  },
  logoStyleName: {
    fontSize: theme.tokens.typography.fontSize.sm,
    marginHorizontal: "auto",
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  logoStyleNameSelected: {
    color: theme.colors.text.primary,
  },
});

export default LogoStyleCard;
