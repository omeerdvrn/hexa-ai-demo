import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
const HomeScreen = () => {
  return (
    <>
      <StatusBar style="auto" hidden={false}></StatusBar>
      <Redirect href="ai-logo" />
    </>
  );
};

export default HomeScreen;
