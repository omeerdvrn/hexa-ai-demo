import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { JobStatus } from "../../../../constants";
import ErrorIcon from "./ErrorIcon";

const GenerationStatusChip = ({ data, progressData }) => {
  const router = useRouter();
  const statusConfig = data[progressData.status];

  const renderVisualContent = () => {
    const containerStyle = {
      width: 70,
      height: 70,
      borderTopLeftRadius: 13.71,
      borderBottomLeftRadius: 13.71,
    };

    switch (statusConfig.visualContentType) {
      case "image":
        return (
          <Image
            style={containerStyle}
            resizeMode="cover"
            source={{ uri: statusConfig.visualContent }}
          />
        );
      case "loading":
        return (
          <View
            style={{
              ...containerStyle,
              backgroundColor: statusConfig.visualContentBackgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color="white" />
          </View>
        );
      case "error":
        return (
          <View
            style={{
              ...containerStyle,
              backgroundColor: statusConfig.visualContentBackgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErrorIcon />
          </View>
        );
      default:
        return null;
    }
  };

  const handlePress = () => {
    if (progressData.status === JobStatus.FAILED && progressData.jobId) {
      console.log("retry");
    }
    if (progressData.status === JobStatus.COMPLETED && progressData.jobId) {
      router.push(`ai-logo/output/${progressData.jobId}`);
    }
  };

  const isCompleted = progressData.status === JobStatus.COMPLETED;
  const containerStyle = {
    width: "100%",
    height: 70,
    borderRadius: 16,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  };

  const content = (
    <>
      {renderVisualContent()}

      <View
        style={{
          height: "100%",
          width: "100%",
          margin: "auto",
          paddingLeft: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: 800 }}>{statusConfig.title}</Text>
        <Text style={{ color: statusConfig.messageColor, fontSize: 13 }}>
          {statusConfig.message}
        </Text>
      </View>
    </>
  );

  return (
    <Pressable onPress={handlePress}>
      {isCompleted ? (
        <LinearGradient
          colors={["#2938DC", "#943DFF"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.25, y: 0 }}
          locations={[1, 0.25]}
          style={containerStyle}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[containerStyle, { backgroundColor: statusConfig.messageBackgroundColor }]}>
          {content}
        </View>
      )}
    </Pressable>
  );
};

export default GenerationStatusChip;
