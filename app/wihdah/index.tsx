import { useEffect, useState } from "react";
import { getImage, getWihdah } from "../../services";
import { SafeAreaView, Text, useWindowDimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Image } from "expo-image";
import { slateToHtml, payloadSlateToHtmlConfig } from "@slate-serializers/html";
import RenderHtml from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

export default function Page() {
  const [wihdah, setWihdah] = useState();
  const { width } = useWindowDimensions();

  const wihdahData = useQuery({
    queryKey: ["wihdah"],
    queryFn: getWihdah,
  });

  return (
    <SafeAreaView className="h-screen bg-white py-5 px-5">
      {wihdahData.isSuccess && (
        <>
          <Image
            source={`https://9685-41-237-178-135.ngrok-free.app${wihdahData["data"]["logo"]["url"]}`}
            className="h-[50vw]"
            contentFit="contain"
          />
          <RenderHtml
            contentWidth={width - 40}
            source={{
              html: slateToHtml(
                wihdahData["data"]["Deskripsi"],
                payloadSlateToHtmlConfig
              ),
            }}
          />
          <View>
            <Text className="text-lg font-semibold mb-2">
              Informasi & Contact Person
            </Text>
            <View>
              <View className="flex flex-row gap-1 justify-content-center">
                <AntDesign name="instagram" size={24} color="black" />
                <Text className="font-semibold">
                  {wihdahData["data"]["instagram"]}
                </Text>
              </View>
              <View className="flex flex-row gap-1 justify-content-center mt-1">
                <FontAwesome name="whatsapp" size={24} color="black" />
                <Text className="font-semibold">
                  {wihdahData["data"]["whatsapp"]}
                </Text>
              </View>
              <View className="flex flex-row gap-1 justify-content-center mt-1">
                <Foundation name="web" size={24} color="black" />
                <Text className="font-semibold">
                  {wihdahData["data"]["website"]}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
