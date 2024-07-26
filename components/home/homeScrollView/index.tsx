import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { newsFilterData } from "../../../utils";
import { NewsItem } from "../../etc";
import { useGetNews } from "../../../hooks";

export default function HomeScrollView() {
  const [homeListData, setHomeListData] = useState<any>();
  const [{ isLoading, isSuccess, data, error }] = useGetNews();

  useEffect(() => {
    if (isSuccess) {
      const newsFilter = newsFilterData(data);
      setHomeListData(newsFilter.slice(0, 5));
    }
  }, [isSuccess]);

  return (
    <View>
      <View className="w-[95%] mx-auto mt-5 mb-3 border-l-4">
        <Link href={"/"} className="ml-2 flex justify-between flex-col">
          <Text className="text-secondary font-bold text-xl ">
            Berita PPMI Mesir
          </Text>
        </Link>
      </View>
      {homeListData && (
        <FlatList
          data={homeListData}
          renderItem={({ item }) => <NewsItem data={item} />}
          keyExtractor={(item, index) => item + index}
        />
      )}
    </View>
  );
}
