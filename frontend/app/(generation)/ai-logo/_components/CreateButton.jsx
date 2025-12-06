import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CreateButton = () => {
  return (
    <View style={styles.createButtonContainer}>
      <LinearGradient
        colors={["#2938DC", "#943DFF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.25, y: 0 }}
        locations={[1, 0.25]}
        style={styles.createButtonGradient}
      >
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  createButtonGradient: {
    borderRadius: 50,
  },
  createButtonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    marginLeft: 10,
  },
  createButton: {
    color: "white",
    height: 50,
    borderRadius: 50,
  },
  createButtonText: {
    color: "white",
    margin: "auto",
  },
});

export default CreateButton;
