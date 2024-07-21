import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getKekeluargaan } from "../../services";
import { Link } from "expo-router";
import { Image } from "expo-image";

export default function Page() {
  const [kekeluargaan, setKekeluargaan] = useState();

  const kekeluargaanData = useQuery({
    queryKey: ["wihdah"],
    queryFn: getKekeluargaan,
  });

  return (
    <SafeAreaView className="min-h-screen bg-white py-5 px-5">
      {kekeluargaanData.isSuccess && (
        <FlatList
          data={kekeluargaanData["data"]["docs"]}
          renderItem={({ item }) => <KekeluargaanItem data={item} />}
        />
      )}
    </SafeAreaView>
  );
}

interface KekeluargaanItemProps {
  data: any;
}

function KekeluargaanItem({ data }: KekeluargaanItemProps) {
  return (
    <Link href={`/kekeluargaan/${data["id"]}`} asChild>
      <Pressable>
        <View className="flex flex-row h-auto justify-between items-center w-[95%] mx-auto border-b-[0.5px]">
          <View className="basis-4/12 h-32 flex justify-center">
            <Image
              source={`https://9685-41-237-178-135.ngrok-free.app${data["logo"]["url"]}`}
              contentFit="contain"
              className="h-[75%] rounded-md"
            />
          </View>
          <View className="w-[60%] h-32">
            <View className="my-auto">
              <Text className=" font-semibold">
                {data["name"]} ({data["singkatan"]})
              </Text>
              <View>
                <Text numberOfLines={3} ellipsizeMode="clip">
                  {data["description"][0].children[0].text}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
