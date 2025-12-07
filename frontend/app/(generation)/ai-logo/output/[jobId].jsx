import gradient from "@/assets/images/background/gradient.png";
import fireStoreService from "@/services/fireStoreService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { LogoStyleName } from "../../../../constants";

const OutputScreen = () => {
  const [job, setJob] = useState(null);
  const router = useRouter();

  const { jobId } = useLocalSearchParams();

  const { getJob } = fireStoreService;

  useEffect(() => {
    const fetchJob = async () => {
      const job = await getJob(jobId);
      setJob(job);
    };

    fetchJob();
  }, [getJob, setJob, jobId]);

  console.log(jobId);
  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: "#09090B" }}
      source={gradient}
      resizeMode="cover"
    >
      <SafeAreaView style={{ height: "100%", paddingHorizontal: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Your Design
          </Text>

          <TouchableOpacity style={{}} onPress={() => router.back()}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5701 3.42998C16.9769 3.83677 16.9769 4.49632 16.5701 4.90311L4.90348 16.5698C4.49668 16.9766 3.83714 16.9766 3.43034 16.5698C3.02355 16.163 3.02355 15.5034 3.43034 15.0966L15.097 3.42998C15.5038 3.02318 16.1634 3.02318 16.5701 3.42998Z"
                fill="#FAFAFA"
              />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.43034 3.42998C3.83714 3.02318 4.49668 3.02318 4.90348 3.42998L16.5701 15.0966C16.9769 15.5034 16.9769 16.163 16.5701 16.5698C16.1634 16.9766 15.5038 16.9766 15.097 16.5698L3.43034 4.90311C3.02355 4.49632 3.02355 3.83677 3.43034 3.42998Z"
                fill="#FAFAFA"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={{ width: 342, height: 342, borderRadius: 16, marginBottom: 24 }}>
          {job && (
            <Image
              style={{ width: 342, height: 342, borderRadius: 16 }}
              resizeMode={"contain"}
              source={{ uri: job.resultUrl }}
            ></Image>
          )}
        </View>

        <View style={{ backgroundColor: "#2C2835", padding: 12, borderRadius: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>Prompt</Text>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M10.6666 8.60004V11.4C10.6666 13.7334 9.73325 14.6667 7.39992 14.6667H4.59992C2.26659 14.6667 1.33325 13.7334 1.33325 11.4V8.60004C1.33325 6.26671 2.26659 5.33337 4.59992 5.33337H7.39992C9.73325 5.33337 10.6666 6.26671 10.6666 8.60004Z"
                  stroke="#A1A1AA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M14.6666 4.60004V7.40004C14.6666 9.73337 13.7333 10.6667 11.3999 10.6667H10.6666V8.60004C10.6666 6.26671 9.73325 5.33337 7.39992 5.33337H5.33325V4.60004C5.33325 2.26671 6.26659 1.33337 8.59992 1.33337H11.3999C13.7333 1.33337 14.6666 2.26671 14.6666 4.60004Z"
                  stroke="#A1A1AA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={{ color: "#A1A1AA", fontSize: 11, fontWeight: "regular" }}>Copy</Text>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            {job && <Text style={{ color: "white", fontSize: 16 }}>{job.prompt}</Text>}
          </View>

          <View
            style={{
              borderRadius: 50,
              backgroundColor: "#3E3D47",
              alignSelf: "flex-start",
              paddingVertical: 4,
              paddingHorizontal: 5,
            }}
          >
            {job && (
              <Text style={{ fontSize: 12, color: "white", fontWeight: "regular" }}>
                {LogoStyleName[job.style]}
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OutputScreen;
