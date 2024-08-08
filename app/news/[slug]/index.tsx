import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { Image } from "expo-image";
import RenderHtml from "react-native-render-html";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../../services";
import { newsFilterData } from "../../../utils";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

export default function Page() {
  const params = useLocalSearchParams();

  const [newsData, setNewsData] = useState<any>();
  const result = useQuery({
    queryKey: ["news", params["slug"]],
    queryFn: getSinglePost,
  });
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (result.isSuccess) {
      setNewsData(newsFilterData(result.data));
    }
  }, [result.isSuccess]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Shamela PPMI Mesir",
        }}
      />
      {result.isSuccess && newsData ? (
        <ScrollView className="px-5 pt-3 bg-white">
          <View>
            <Text>{newsData["date"]}</Text>
            <Text className="text-xl font-bold text-gray-900">
              {newsData["title"]}
            </Text>
            <View className="flex flex-row justify-start items-center mt-3 gap-x-1">
              <Image
                source={newsData["avatarWriter"]}
                className="h-5 w-5 rounded-md"
                contentFit="contain"
              />
              <Text className="text-sm font-medium">{newsData["author"]}</Text>
            </View>
            <View className="h-80 mt-5">
              <Image
                source={newsData["image"]}
                contentFit="cover"
                className="h-[100%]"
              />
            </View>
            <Text className="text-gray-500 mt-1">
              {newsData["description"]}
            </Text>
            <View className="pb-10">
              <RenderHtml
                contentWidth={width - 40}
                source={{ html: newsData["content"] }}
                tagsStyles={{
                  figure: {
                    display: "none",
                    width: 100,
                    marginHorizontal: "auto",
                  },
                }}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="w-full mb-5 h-screen pt-3 bg-white">
          <View className="w-[95%] mx-auto pt-3">
            <SkeletonPlaceholder>
              <View
                style={{
                  height: 400,
                }}
              >
                <Text
                  style={{
                    lineHeight: 15,
                    marginBottom: 10,
                    width: "40%",
                  }}
                ></Text>
                <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                <View
                  style={{
                    height: 1000,
                    width: "100%",
                    marginTop: 20,
                  }}
                ></View>
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      )}
    </>
  );
}
