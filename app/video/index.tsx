import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { getVideos } from "../../services";
import { getYoutubeVideoId } from "../../utils";
import { Image } from "expo-image";
import { Link } from "expo-router";

import { Octicons, FontAwesome6 } from "@expo/vector-icons";

export default function Page() {
  const [videos, setVideos] = useState([]);

  const { isSuccess, data } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  useEffect(() => {
    if (isSuccess) {
      setVideos(data?.docs);
    }
  }, [isSuccess]);

  return (
    <ScrollView className="bg-white px-5 py-3">
      <View className="mb-5">
        <Text className="text-lg font-semibold text-gray-600 mb-2">
          Featured Playlist
        </Text>
        {videos && (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={videos.filter((arr) => arr["featured"] === "yes")}
              renderItem={(item) => <FeaturedCard data={item.item} />}
            />
          </View>
        )}
      </View>
      <View className="">
        <Text className="text-lg font-semibold text-gray-600 mb-2">
          Playlist Lainnya
        </Text>
        {videos && (
          <View>
            <FlatList
              data={videos.filter((arr) => arr["featured"] === "no")}
              renderItem={(item) => <FeaturedCardList data={item.item} />}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

interface FeaturedCard {
  data: any;
}

function FeaturedCard({ data }: FeaturedCard) {
  return (
    <Link href={`/video/${data.id}`} asChild>
      <Pressable>
        <View className="w-[50vw] h-[50vw] min-h-[50vw] mr-3 rounded-md">
          <View className="h-[70%]">
            <Image
              source={`https://img.youtube.com/vi/${getYoutubeVideoId(
                data.video[0].url
              )}/hqdefault.jpg`}
              contentFit="fill"
              className="h-full w-full"
            />
          </View>
          <View className="">
            <Text className=" mt-2 font-semibold text-gray-600 text-lg">
              {data.name}
            </Text>
            <Text className=" mt-1 font-semibold text-xs text-gray-500">
              <Octicons name="organization" className="text-xs text-gray-500" />{" "}
              {data.provider?.value["name"]}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

function FeaturedCardList({ data }: FeaturedCard) {
  return (
    <Link href={`/video/${data.id}`} asChild>
      <Pressable>
        <View
          className=" h-auto w-[80vw] mb-5 rounded-md flex flex-row items-start mt-0"
          style={{
            marginLeft: 0,
            width: "calc(100vh-40px)",
          }}
        >
          <View className=" h-32 w-[50%]">
            <Image
              source={`https://img.youtube.com/vi/${getYoutubeVideoId(
                data.video[0].url
              )}/hqdefault.jpg`}
              contentFit="fill"
              className="h-full w-full"
            />
          </View>
          <View className="ml-5">
            <Text className=" mt-2 font-semibold text-gray-600 text-lg">
              {data.name}
            </Text>
            <Text className=" mt-1 font-semibold text-xs text-gray-500">
              <Octicons name="organization" className="text-xs text-gray-500" />{" "}
              {data.provider?.value["name"]}
            </Text>
            <Text className=" mt-1 font-semibold text-xs text-gray-500">
              <FontAwesome6
                name="play-circle"
                className="text-xs text-gray-500"
              />{" "}
              {data.video.length} video
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
