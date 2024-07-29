import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { newsFilterData } from "../../../utils";
import { NewsItem } from "../../etc";
import { useGetNews } from "../../../hooks";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";
import { useWindowDimensions } from "react-native";

export default function HomeScrollView() {
  const [homeListData, setHomeListData] = useState<any>();
  const [
    { isLoading, isSuccess, data, error, fetchNextPage, isFetchingNextPage },
  ] = useGetNews();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isSuccess) {
      const newsFilter = newsFilterData(data.pages[0]);
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
      {homeListData ? (
        <FlatList
          data={homeListData}
          renderItem={({ item }) => <NewsItem data={item} />}
          keyExtractor={(item, index) => item + index}
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
  );
}
