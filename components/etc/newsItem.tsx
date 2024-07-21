import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface NewsItemProps {
  data: any;
}

export default function NewsItem({ data }: NewsItemProps) {
  return (
    <Link href={`/news/${data["slug"]}`} asChild>
      <Pressable>
        <View className="flex flex-row h-auto justify-between items-center w-[95%] mx-auto border-b-[0.5px]">
          <View className="w-[60%] h-32">
            <View className="my-auto">
              <Text>{data["date"]}</Text>
              <Text numberOfLines={4} className=" font-semibold">
                {data["title"]}
              </Text>
            </View>
          </View>
          <View className="basis-4/12 h-32 flex justify-center">
            <Image
              source={data["image"]}
              contentFit="cover"
              className="h-[75%] rounded-md"
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
