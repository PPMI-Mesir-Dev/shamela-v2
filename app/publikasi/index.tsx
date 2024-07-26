import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, Text, View } from "react-native";
import { getPublikasi } from "../../services";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";
import { Image } from "expo-image";

export default function Page() {
  const { isSuccess, data, isLoading } = useQuery({
    queryKey: ["publikasi"],
    queryFn: getPublikasi,
  });

  return (
    <ScrollView className="px-5 bg-white">
      {/* {isSuccess && !isLoading && (
        <FlatList
          data={data["docs"]}
          renderItem={(item) => <PustakaItem data={item.item} />}
        />
      )} */}
      <SkeletonPlaceholder borderRadius={4}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>
              Hello world
            </Text>
          </View>
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
}

interface PustakaItemProps {
  data: any;
}

function PustakaItem({ data }: PustakaItemProps) {
  return (
    <View>
      <Text>{data.title}</Text>
    </View>
  );
}
