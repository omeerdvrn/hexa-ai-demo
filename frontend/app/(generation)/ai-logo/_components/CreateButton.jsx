import { useTheme } from "@/contexts/ThemeContext";
import { createThemedStyles } from "@/utils/styleHelpers";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import MagicIcon from "./MagicIcon";

const CreateButton = ({ onPress }) => {
  const theme = useTheme();
  const styles = createThemedStyles(createStyles, theme);
  const { colors, start, end, locations } = theme.tokens.gradients.primary;

  return (
    <View style={styles.createButtonContainer}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        style={styles.createButtonGradient}
      >
        <TouchableOpacity style={styles.createButton} onPress={onPress}>
          <View style={styles.createButtonContent}>
            <Text style={styles.createButtonText}>Create</Text>
            <MagicIcon />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme) => ({
  createButtonContainer: {
    position: "absolute",
    bottom: theme.spacing[2],
    width: "100%",
    left: theme.spacing[6],
  },
  createButtonGradient: {
    borderRadius: theme.borderRadius.full,
  },
  createButton: {
    color: theme.colors.text.onPrimary,
    height: theme.tokens.dimensions.button.height,
    borderRadius: theme.borderRadius.full,
  },
  createButtonContent: {
    flexDirection: "row",
    margin: "auto",
  },
  createButtonText: {
    ...theme.typography.button,
    marginRight: theme.spacing[2],
  },
});

export default CreateButton;
