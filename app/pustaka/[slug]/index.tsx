import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { getPustakaById, PUBLIC_API_URL } from "../../../services";
import {
  Button,
  Linking,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { payloadSlateToHtmlConfig, slateToHtml } from "@slate-serializers/html";

export default function Page() {
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const pustaka = useQuery({
    queryKey: ["pustaka", { id: params["slug"] }],
    queryFn: getPustakaById,
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Pustaka",
        }}
      />
      <SafeAreaView className="bg-white h-full px-5 pt-5">
        {pustaka.isSuccess && (
          <View>
            <Text className="text-xl font-medium text-center">
              {pustaka.data.title}
            </Text>
            <View className="mt-10">
              <Text className=" font-medium text-base">Deskripsi</Text>
              <RenderHTML
                contentWidth={width - 40}
                source={{
                  html: slateToHtml(
                    pustaka.data.description,
                    payloadSlateToHtmlConfig
                  ),
                }}
              />
            </View>
            <View className="mt-5">
              <Button
                title="Baca"
                onPress={() =>
                  Linking.openURL(
                    `${PUBLIC_API_URL}${pustaka.data.attachment.url}`
                  )
                }
                color="#0A184F"
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
