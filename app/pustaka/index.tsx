import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { getPustaka } from "../../services";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Page() {
  const { isSuccess, data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pustaka"],
      queryFn: getPustaka,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  return (
    <ScrollView className="px-5 bg-white">
      {isSuccess && !isLoading && (
        <FlatList
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.1}
          data={data.pages.flat()}
          renderItem={(item) => <PustakaItem data={item.item["docs"]} />}
        />
      )}
      {isLoading && (
        <>
          {Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map((arr, index) => (
            <SkeletonPlaceholder key={index}>
              <View
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}
                ></Text>
                <Text
                  style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}
                ></Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 10,
                    lineHeight: 14,
                    width: "25%",
                  }}
                ></Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 10,
                    lineHeight: 14,
                    width: "25%",
                  }}
                ></Text>
              </View>
            </SkeletonPlaceholder>
          ))}
        </>
      )}
      <Text>{isFetchingNextPage && "Loading"}</Text>
    </ScrollView>
  );
}

interface PustakaItemProps {
  data: any;
}

function PustakaItem({ data }: PustakaItemProps) {
  return data?.map((arr: any, index: any) => (
    <Link href={`/pustaka/${arr.id}`} asChild key={index}>
      <Pressable>
        <View className="p-5 border-b">
          <Text className="text-lg font-medium" numberOfLines={2}>
            {arr.title}
          </Text>
          <View>
            <Text>
              <Ionicons name="person" color="black" className="text-base" />{" "}
              {arr.author}
            </Text>
            <Text>
              <Fontisto name="calendar" className="text-base" color="black" />{" "}
              {new Date(arr.time).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  ));
}
