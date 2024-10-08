import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { getVideos } from "../../../services";
import { SetStateAction, useEffect, useRef, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { getYoutubeVideoId } from "../../../utils";
import { Image } from "expo-image";

export default function Page() {
  const params = useLocalSearchParams();
  const [videos, setVideos] = useState<any>();
  const [selectedVideo, setSelectedVideo] = useState("");
  const [numOfLine, setNumOfLine] = useState<number | undefined>(4);

  const { isSuccess, data } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  useEffect(() => {
    if (isSuccess) {
      setVideos(
        data?.docs.filter((arr: any) => arr["id"] === params["slug"])[0]
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (videos) {
      setSelectedVideo(getYoutubeVideoId(videos?.video[0].url));
    }
  }, [videos]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: videos?.name,
        }}
      />
      <SafeAreaView
        className="bg-white h-screen"
        style={{
          flex: 1,
          margin: 0,
        }}
      >
        <View>
          <View className="mb-1">
            {videos && (
              <>
                <YoutubePlayer height={200} videoId={selectedVideo} />
                <Text className="mt-3 text-xl font-semibold px-5 text-gray-800">
                  {
                    videos?.video.filter(
                      (arr) => selectedVideo === getYoutubeVideoId(arr.url)
                    )[0]?.title
                  }
                </Text>
              </>
            )}
          </View>
          <View className="px-5 pb-4">
            <Pressable
              onPress={() =>
                setNumOfLine((prev) => (prev === 4 ? undefined : 4))
              }
            >
              <Text className="text-gray-500" numberOfLines={numOfLine}>
                {videos?.description}
              </Text>
            </Pressable>
          </View>
        </View>
        <View className=" flex-1">
          {videos && (
            <FlatList
              invertStickyHeaders={true}
              data={videos.video}
              renderItem={(item) => (
                <FeaturedCardList
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  data={item.item}
                />
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

interface FeaturedCard {
  data: any;
  setSelectedVideo: SetStateAction<any>;
  selectedVideo: string;
}

function FeaturedCardList({
  data,
  setSelectedVideo,
  selectedVideo,
}: FeaturedCard) {
  return (
    <Pressable onPress={() => setSelectedVideo(getYoutubeVideoId(data.url))}>
      <View
        className={`h-auto w-[80vw] mb-5 py-3 flex flex-row items-start mt-0 px-5 ${
          selectedVideo == getYoutubeVideoId(data.url) && "bg-gray-100"
        }`}
        style={{
          marginLeft: 0,
          width: "calc(100vh-40px)",
        }}
      >
        <View className=" h-32 w-[50%]">
          <Image
            source={`https://img.youtube.com/vi/${getYoutubeVideoId(
              data.url
            )}/hqdefault.jpg`}
            contentFit="fill"
            className="h-full w-full"
          />
        </View>
        <View className="ml-5 w-[40%]">
          <Text
            numberOfLines={3}
            className=" mt-2 font-semibold text-gray-600 text-base"
          >
            {data.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
