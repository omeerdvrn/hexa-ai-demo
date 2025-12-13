import Loader from "@/components/Loader";
import { db } from "@/config/firebaseConfig";
import { JobStatus } from "@/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { jobService } from "@/services";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import ErrorIcon from "./ErrorIcon";

const GenerationStatusChip = ({ data, progressData, retryCallback }) => {
  const theme = useTheme();
  const router = useRouter();
  const { markJobAsSeen } = jobService;
  const statusConfig = data[progressData.status];

  const cancelJob = async () => {
    try {
      console.log("Cancelling job:", progressData.jobId);

      const jobRef = doc(db, "jobs", progressData.jobId);
      await updateDoc(jobRef, {
        status: "cancelled",
        updatedAt: serverTimestamp(),
      });

      console.log("Job cancelled successfully");
    } catch (error) {
      console.error("Error cancelling job:", error);
    }
  };

  const renderVisualContent = () => {
    const containerStyle = {
      ...theme.components.statusChip.visual,
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
            <Loader />
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

  const handlePress = async () => {
    if (progressData.status === JobStatus.FAILED && progressData.jobId) {
      retryCallback();
    }
    if (progressData.status === JobStatus.COMPLETED && progressData.jobId) {
      console.log(progressData);
      if (!progressData?.seen) {
        await markJobAsSeen(progressData.jobId);
      }
      router.push(`ai-logo/output/${progressData.jobId}`);
    }
  };

  const isCompleted = progressData.status === JobStatus.COMPLETED;
  const containerStyle = {
    ...theme.components.statusChip.container,
  };

  const content = (
    <>
      {renderVisualContent()}

      <View
        style={{
          height: "100%",
          width: "100%",
          margin: "auto",
          paddingLeft: theme.spacing[2],
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...theme.typography.body,
            fontWeight: theme.tokens.typography.fontWeight.extrabold,
          }}
        >
          {statusConfig.title}
        </Text>
        <Text
          style={{
            color: statusConfig.messageColor,
            fontSize: theme.tokens.typography.fontSize.sm,
          }}
        >
          {statusConfig.message}
        </Text>

        {progressData.status === JobStatus.PROCESSING && (
          <TouchableOpacity onPress={cancelJob}>
            <Text
              style={{
                color: statusConfig.messageColor,
                fontSize: theme.tokens.typography.fontSize.sm,
                textDecorationLine: "underline",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <Pressable onPress={handlePress}>
      {isCompleted ? (
        <LinearGradient
          colors={theme.tokens.gradients.primary.colors}
          start={theme.tokens.gradients.primary.start}
          end={theme.tokens.gradients.primary.end}
          locations={theme.tokens.gradients.primary.locations}
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
