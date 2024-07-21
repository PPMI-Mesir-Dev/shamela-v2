import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useGetNews } from "../../../hooks";
import { newsFilterData } from "../../../utils";
import { Image } from "expo-image";
import RenderHtml from "react-native-render-html";

export default function Page() {
  const params = useLocalSearchParams();

  const [newsData, setNewsData] = useState<any>();
  const [{ isLoading, isSuccess, data, error }] = useGetNews();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isSuccess) {
      const filterData = data.filter(
        (arr: any) => arr["slug"] === params["slug"]
      );
      setNewsData(newsFilterData(filterData)[0]);
    }
  }, [isSuccess]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Shamela PPMI Mesir",
        }}
      />
      {isSuccess && newsData && (
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
      )}
    </>
  );
}
