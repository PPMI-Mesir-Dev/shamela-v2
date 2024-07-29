import { useEffect, useState } from "react";
import { getImage, getRadio, getWihdah, PUBLIC_API_URL } from "../../services";
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
  const { width } = useWindowDimensions();

  const radioData = useQuery({
    queryKey: ["radio"],
    queryFn: getRadio,
  });

  return (
    <SafeAreaView className="h-screen bg-white py-5 px-5">
      {radioData.isSuccess && (
        <>
          <Image
            source={`${PUBLIC_API_URL}${radioData["data"]["logo"]?.radio}`}
            className="h-[50vw]"
            contentFit="contain"
          />
          <RenderHtml
            contentWidth={width - 40}
            source={{
              html: slateToHtml(
                radioData["data"]["Deskripsi"],
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
                  {radioData["data"]["instagram"]}
                </Text>
              </View>
              <View className="flex flex-row gap-1 justify-content-center mt-1">
                <FontAwesome name="whatsapp" size={24} color="black" />
                <Text className="font-semibold">
                  {radioData["data"]["whatsapp"]}
                </Text>
              </View>
              <View className="flex flex-row gap-1 justify-content-center mt-1">
                <Foundation name="web" size={24} color="black" />
                <Text className="font-semibold">
                  {radioData["data"]["website"]}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
