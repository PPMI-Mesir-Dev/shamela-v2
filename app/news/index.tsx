import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { newsFilterData } from "../../utils";
import { NewsItem } from "../../components/etc";
import { getNewsByPage } from "../../services";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

export default function Page() {
  const [news, setNews] = useState();
  const [page, setPage] = useState(1);

  const result = useQuery({
    queryKey: ["news", page],
    queryFn: getNewsByPage,
  });

  useEffect(() => {
    if (result.isSuccess) {
      const newsFilter = newsFilterData(result.data);
      setNews(newsFilter);
    }
  }, [result.isSuccess, page]);

  return (
    <SafeAreaView className="w-screen bg-white">
      <View className="w-[95%] mx-auto border-b-[0.5px] pb-5 mt-3 flex flex-row justify-between items-center">
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => setPage((state) => state - 1)}
        >
          <Text
            className={`p-2 self-start rounded-lg ${
              page === 1 ? "bg-slate-300" : "bg-primary"
            }`}
          >
            Sebelumnya
          </Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Halaman {page}</Text>
        <TouchableOpacity onPress={() => setPage((state) => state + 1)}>
          <Text className="p-2 bg-primary self-start rounded-lg">
            Selanjutnya
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {result.isSuccess && news ? (
          <FlatList
            data={news}
            renderItem={({ item }) => <NewsItem data={item} />}
          />
        ) : (
          <View className="w-[95%] mx-auto mb-5">
            {Array(1, 2, 3, 4, 5).map((arr, index) => (
              <SkeletonPlaceholder key={index}>
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 20,
                    flexDirection: "row",

                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "65%",
                    }}
                  >
                    <Text
                      style={{ lineHeight: 15, marginBottom: 5, width: "40%" }}
                    ></Text>
                    <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                    <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                  </View>
                  <View
                    style={{
                      width: "40%",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 100,
                      }}
                    ></View>
                  </View>
                </View>
              </SkeletonPlaceholder>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
