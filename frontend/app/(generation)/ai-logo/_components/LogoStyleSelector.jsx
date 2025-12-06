import { FlatList, StyleSheet, Text, View } from "react-native";
import useLogoStyleSelector from "../_hooks/useLogoStyleSelector";
import LogoStyleCard from "./LogoStyleCard";
const LogoStyleSelector = () => {
  const { selectedStyleId, setSelectedStyleId, options } = useLogoStyleSelector();
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
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStylesContainer: {
    marginTop: 10,
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
    overflow: "hidden",
  },
});

export default LogoStyleSelector;
