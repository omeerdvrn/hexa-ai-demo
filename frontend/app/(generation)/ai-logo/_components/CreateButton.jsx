import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MagicIcon from "./MagicIcon";

const CreateButton = ({ onPress }) => {
  return (
    <View style={styles.createButtonContainer}>
      <LinearGradient
        colors={["#2938DC", "#943DFF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.25, y: 0 }}
        locations={[1, 0.25]}
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

const styles = StyleSheet.create({
  createButtonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    left: 24,
  },
  createButtonGradient: {
    borderRadius: 50,
  },
  createButton: {
    color: "white",
    height: 50,
    borderRadius: 50,
  },
  createButtonContent: {
    flexDirection: "row",
    margin: "auto",
  },
  createButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default CreateButton;
