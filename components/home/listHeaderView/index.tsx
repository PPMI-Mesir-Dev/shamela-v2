import { Text, View } from "react-native";
import GridMenu from "./gridMenu";

export default function ListHeaderView() {
  return (
    <View>
      <View className="mt-16 mb-5">
        <Text className=" text-2xl font-semibold text-secondary text-center">
          Selamat Datang di Shamela
        </Text>
      </View>
      <GridMenu />
    </View>
  );
}
