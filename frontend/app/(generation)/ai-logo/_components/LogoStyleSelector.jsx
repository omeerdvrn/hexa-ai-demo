import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import LogoStyleCard from "./LogoStyleCard";
const LogoStyleSelector = ({ selectedStyleId, setSelectedStyleId, options }) => {
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

const styles = StyleSheet.create({
  logoStylesContainer: {
    marginTop: 15,
  },
  logoStylesLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    marginTop: 12,
  },
  logoStylesList: {
    display: "flex",
    width: screenWidth,
    paddingLeft: 24,
    marginLeft: -24,
  },
});

export default LogoStyleSelector;
