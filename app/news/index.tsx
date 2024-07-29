import { useQuery } from "@tanstack/react-query";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { newsFilterData } from "../../utils";
import { NewsItem } from "../../components/etc";
import { useGetNews } from "../../hooks";

export default function Page() {
  const [news, setNews] = useState();

  const [
    { isLoading, isSuccess, data, error, fetchNextPage, isFetchingNextPage },
  ] = useGetNews();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      const newsFilter = newsFilterData(data.pages[0]);
      setNews(newsFilter);
    }
  }, [isSuccess]);

  return (
    <SafeAreaView className="w-screen bg-white">
      <View className="w-[95%] mx-auto border-b-[0.5px] pb-5 mt-3">
        <Text className="text-xl font-semibold">Halaman</Text>
      </View>
      {isSuccess && news && (
        <FlatList
          data={news}
          renderItem={({ item }) => <NewsItem data={item} />}
        />
      )}
    </SafeAreaView>
  );
}
