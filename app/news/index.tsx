import { useQuery } from "@tanstack/react-query";
import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import { getNews } from "../../services";
import { useEffect, useState } from "react";
import { newsFilterData } from "../../utils";
import { NewsItem } from "../../components/etc";

export default function Page() {
  const [news, setNews] = useState();

  const { isLoading, isSuccess, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  useEffect(() => {
    if (isSuccess) {
      const newsFilter = newsFilterData(data);
      setNews(newsFilter);
    }
  }, [isSuccess]);

  return (
    <SafeAreaView className="w-screen bg-white">
      {isSuccess && news && (
        <FlatList
          data={news}
          renderItem={({ item }) => <NewsItem data={item} />}
        />
      )}
    </SafeAreaView>
  );
}
