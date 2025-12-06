import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NoStyleIcon from "./NoStyleIcon";

const LogoStyleCard = ({ item, selectedStyleId, onPress }) => {
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

const styles = StyleSheet.create({
  card: { width: 90, marginRight: 10 },
  cardImage: { borderRadius: 13.71, marginHorizontal: "auto" },
  cardImageSelected: { borderWidth: 2, borderColor: "white" },
  cardNoStyle: {
    width: 90,
    height: 90,
    borderRadius: 13.71,
    backgroundColor: "#292B57",
    justifyContent: "center",
    alignItems: "center",
  },
  cardNoStyleSelected: { borderWidth: 2, borderColor: "white" },
  logoStyleName: { fontSize: 13, marginHorizontal: "auto", color: "#71717A", marginTop: 5 },
  logoStyleNameSelected: { color: "white" },
});

export default LogoStyleCard;
