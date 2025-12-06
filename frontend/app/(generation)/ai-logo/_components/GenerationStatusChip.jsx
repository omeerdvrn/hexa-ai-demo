import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import useGenerateLogo from "../_hooks/useGenerateLogo";
const GenerationStatusChip = () => {
  const router = useRouter();
  const { data, progressData, setProgressData } = useGenerateLogo();

  return (
    <Pressable
      style={{
        width: "100%",
        backgroundColor: data[progressData.status].messageBackgroundColor,
        height: 70,
        borderRadius: 16,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
      }}
      onPress={() => router.push("ai-logo/output")}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderTopLeftRadius: 13.71,
          borderBottomLeftRadius: 13.71,
        }}
      >
        {data[progressData.status].visualContentType === "image" ? (
          <Image
            style={{
              width: 70,
              height: 70,
              borderTopLeftRadius: 13.71,
              borderBottomLeftRadius: 13.71,
            }}
            resizeMode="cover"
            source={data[progressData.status].visualContent}
          />
        ) : (
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: data[progressData.status].visualContentBackgroundColor,
              borderTopLeftRadius: 13.71,
              borderBottomLeftRadius: 13.71,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data[progressData.status].visualContent}
          </View>
        )}
      </View>
      <View
        style={{
          height: "100%",
          width: "100%",
          margin: "auto",
          paddingLeft: 10,
        }}
      >
        <View style={[{ marginVertical: "auto" }]}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: 800 }}>
            {data[progressData.status].title}
          </Text>
          <Text style={{ color: "#71717A", fontSize: 13 }}>
            {data[progressData.status].message}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default GenerationStatusChip;
