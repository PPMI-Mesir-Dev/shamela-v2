import { useEffect, useState } from "react";
import { SafeAreaView, Text, useWindowDimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Image } from "expo-image";
import { slateToHtml, payloadSlateToHtmlConfig } from "@slate-serializers/html";
import RenderHtml from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { getKekeluargaan, PUBLIC_API_URL } from "../../../services";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Page() {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();

  const kekeluargaanData = useQuery({
    queryKey: ["wihdah"],
    queryFn: getKekeluargaan,
  });

  const [kekeluargaan, setKekeluargaan] = useState();

  useEffect(() => {
    if (kekeluargaanData.isSuccess) {
      const filterData = kekeluargaanData["data"]["docs"].filter(
        (arr: any) => arr["id"] === params["slug"]
      );
      setKekeluargaan(filterData[0]);
      console.log(kekeluargaan);
    }
  }, [kekeluargaanData.isSuccess]);

  return (
    <SafeAreaView className="h-screen bg-white py-5 px-5">
      {kekeluargaanData.isSuccess && kekeluargaan && (
        <>
          <Stack.Screen
            options={{
              headerShown: true,
              title: `${kekeluargaan["name"]}`,
            }}
          />
          <Image
            source={`${PUBLIC_API_URL}${kekeluargaan["logo"]["url"]}`}
            className="h-[50vw]"
            contentFit="contain"
          />
          <RenderHtml
            contentWidth={width - 40}
            source={{
              html: slateToHtml(
                kekeluargaan["description"],
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
                  {kekeluargaan["instagram"]}
                </Text>
              </View>
              <View className="flex flex-row gap-1 justify-content-center mt-1">
                <FontAwesome name="whatsapp" size={24} color="black" />
                <Text className="font-semibold">
                  {kekeluargaan["whatsapp"]}
                </Text>
              </View>
              <View className="flex flex-row gap-1 justify-content-center mt-1">
                <Foundation name="web" size={24} color="black" />
                <Text className="font-semibold">{kekeluargaan["website"]}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
