import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
import GridMenu from "./listHeaderView/gridMenu";
import HomeScrollView from "./homeScrollView";
import ListHeaderView from "./listHeaderView";

export default function Home() {
  return (
    <ScrollView className="">
      <ListHeaderView />
      <HomeScrollView />
    </ScrollView>
  );
}
