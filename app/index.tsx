import { SafeAreaView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Onboarding from "../components/onboarding";
import { StatusBar } from "expo-status-bar";
import Home from "../components/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="w-screen bg-white">
        <Home />
        <StatusBar backgroundColor="white" />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
