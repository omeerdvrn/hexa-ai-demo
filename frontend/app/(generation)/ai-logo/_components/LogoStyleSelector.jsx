import { useTheme } from "@/contexts/ThemeContext";
import { createThemedStyles } from "@/utils/styleHelpers";
import { Dimensions, FlatList, Text, View } from "react-native";
import LogoStyleCard from "./LogoStyleCard";
const LogoStyleSelector = ({ selectedStyleId, setSelectedStyleId, options }) => {
  const theme = useTheme();
  const styles = createThemedStyles(createStyles, theme);

  return (
    <View style={styles.logoStylesContainer}>
      <Text style={styles.logoStylesLabel}>Logo Styles</Text>
      <FlatList
        style={styles.logoStylesList}
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LogoStyleCard
            item={item}
            selectedStyleId={selectedStyleId}
            onPress={() => setSelectedStyleId(item.id)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const createStyles = (theme) => ({
  logoStylesContainer: {
    marginTop: 15,
  },
  logoStylesLabel: {
    color: theme.colors.text.primary,
    fontSize: theme.tokens.typography.fontSize.xl,
    fontWeight: theme.tokens.typography.fontWeight.extrabold,
    marginBottom: theme.spacing[3],
    marginTop: theme.spacing[3],
  },
  logoStylesList: {
    display: "flex",
    width: screenWidth,
    paddingLeft: theme.spacing[6],
    marginLeft: -theme.spacing[6],
  },
});

export default LogoStyleSelector;
