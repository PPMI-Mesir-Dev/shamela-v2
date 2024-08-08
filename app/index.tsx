import { SafeAreaView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Onboarding from "../components/onboarding";
import { StatusBar } from "expo-status-bar";
import Home from "../components/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import One from "../components/onboarding/one";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

export default function Page() {
  const [firstLaunch, setFirstLaunch] = useState<Boolean | null>(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    <>
      {firstLaunch ? (
        <One setShowOnboarding={setFirstLaunch} />
      ) : (
        <QueryClientProvider client={queryClient}>
          <SafeAreaView className="w-screen bg-white">
            <Home />
            <StatusBar backgroundColor="white" />
          </SafeAreaView>
        </QueryClientProvider>
      )}
    </>
  );
}
