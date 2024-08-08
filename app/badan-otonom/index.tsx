import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getBadanOtonom, PUBLIC_API_URL } from "../../services";
import { Link } from "expo-router";
import { Image } from "expo-image";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

export default function Page() {
  const badanOtonom = useQuery({
    queryKey: ["badan-otonom"],
    queryFn: getBadanOtonom,
  });

  return (
    <SafeAreaView className="h-full bg-white">
      {badanOtonom.isSuccess ? (
        <FlatList
          data={badanOtonom.data["docs"]}
          renderItem={(item) => <BadanOtonomItem data={item.item} />}
        />
      ) : (
        <>
          <View className="w-[95%] mx-auto mb-5">
            {Array(1, 2, 3).map((arr, index) => (
              <SkeletonPlaceholder key={index}>
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 20,
                    flexDirection: "row",
                    columnGap: 10,
                    alignItems: "center",
                  }}
                >
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
                  <View
                    style={{
                      width: "65%",
                    }}
                  >
                    <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                    <Text style={{ lineHeight: 25, width: "80%" }}></Text>
                  </View>
                </View>
              </SkeletonPlaceholder>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

interface BadanOtonomItemProps {
  data: any;
}

function BadanOtonomItem({ data }: BadanOtonomItemProps) {
  return (
    <Link href={`/badan-otonom/${data["id"]}`} asChild>
      <Pressable>
        <View className="flex flex-row h-auto justify-between items-center w-[95%] mx-auto border-b-[0.5px]">
          <View className="basis-4/12 h-32 flex justify-center">
            <Image
              source={`${PUBLIC_API_URL}${data.logo.url}`}
              contentFit="contain"
              className="h-[75%] rounded-md"
            />
          </View>
          <View className="w-[60%] h-32">
            <View className="my-auto">
              <Text numberOfLines={4} className=" font-semibold text-lg">
                {data.name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
