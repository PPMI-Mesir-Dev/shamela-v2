import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, SectionList, Text } from "react-native";
import { getVideos } from "../../services";
import YoutubePlayer from "react-native-youtube-iframe";
import { getYoutubeVideoId } from "../../utils";

export default function Page() {
  const [videos, setVideos] = useState();

  const { isLoading, isSuccess, data, error } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  useEffect(() => {
    if (isSuccess) {
      setVideos(data?.docs);
    }
  }, [isSuccess]);

  return (
    <SafeAreaView className="bg-white min-h-screen px-5">
      <Text>Hai</Text>
      {/* <YoutubePlayer /> */}
      {/* <SectionList
          showsVerticalScrollIndicator={false}
          sections={videos}
          renderItem={({ item }) => <YoutubePlayer videoId={getYoutubeVideoId(item.video[0])} />}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: { title } }) => (
            <View className="w-[95%] mx-auto mt-5 mb-3 border-l-4">
              <Link href={"/"} className="ml-2 flex justify-between flex-col">
                <Text className="text-secondary font-bold text-xl ">{title}</Text>
              </Link>
            </View>
          )}
        /> */}
    </SafeAreaView>
  );
}
