import { SafeAreaView, Text, useWindowDimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Image } from "expo-image";
import { slateToHtml, payloadSlateToHtmlConfig } from "@slate-serializers/html";
import RenderHtml from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { getBadanOtonom, PUBLIC_API_URL } from "../../../services";
import { useEffect, useState } from "react";

export default function Page() {
  const [trueData, setTrueData] = useState<any>();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const badanOtonom = useQuery({
    queryKey: ["badan-otonom"],
    queryFn: getBadanOtonom,
  });

  useEffect(() => {
    if (badanOtonom.isSuccess) {
      const filter = badanOtonom.data.docs.filter(
        (arr: any) => arr.id === params["slug"]
      );
      setTrueData(filter[0]);
    }
  }, [badanOtonom.isSuccess]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: trueData?.name,
        }}
      />
      <SafeAreaView className="h-screen bg-white py-5 px-5">
        {badanOtonom.isSuccess && trueData && (
          <>
            <Image
              source={`${PUBLIC_API_URL}${trueData.logo.url}`}
              className="h-[50vw]"
              contentFit="contain"
            />
            <RenderHtml
              contentWidth={width - 40}
              source={{
                html: slateToHtml(
                  trueData.description,
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
                  <Text className="font-semibold">{trueData["instagram"]}</Text>
                </View>
                <View className="flex flex-row gap-1 justify-content-center mt-1">
                  <FontAwesome name="whatsapp" size={24} color="black" />
                  <Text className="font-semibold">{trueData["whatsapp"]}</Text>
                </View>
                <View className="flex flex-row gap-1 justify-content-center mt-1">
                  <Foundation name="web" size={24} color="black" />
                  <Text className="font-semibold">{trueData["website"]}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
