import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  Text,
  View,
} from "react-native";
import { getNews } from "../../../services";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import GridMenu from "../listHeaderView/gridMenu";
import ListHeaderView from "../listHeaderView";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      // setHomeListData([
      //   { title: "Highlight", data: newsFilter.slice(0, 5), type: "LIST" },
      // ]);
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
        // <SectionList
        //   showsVerticalScrollIndicator={false}
        //   ListHeaderComponent={<ListHeaderView />}
        //   sections={homeListData}
        //   renderItem={({ item }) => <NewsItem data={item} />}
        //   keyExtractor={(item, index) => item + index}
        //   renderSectionHeader={({ section: { title } }) => (
        //     <View className="w-[95%] mx-auto mt-5 mb-3 border-l-4">
        //       <Link href={"/"} className="ml-2 flex justify-between flex-col">
        //         <Text className="text-secondary font-bold text-xl ">{title}</Text>
        //       </Link>
        //     </View>
        //   )}
        // />
      )}
    </View>
  );
}
