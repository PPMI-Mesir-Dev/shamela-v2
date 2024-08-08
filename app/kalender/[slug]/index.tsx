import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  Share,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { getAgenda, PUBLIC_API_URL } from "../../../services";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";
import Entypo from "@expo/vector-icons/Entypo";
const blurhash = "LEHLk~WB2yk8pyo0adR*.7kCMdnj";

export default function Page() {
  const params = useLocalSearchParams();
  const flatListRef = useRef<FlatList | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const { width } = useWindowDimensions();

  const [items, setItems] = useState<any>();

  const agendaData = useQuery({
    queryKey: ["agenda"],
    queryFn: getAgenda,
  });

  useEffect(() => {
    if (agendaData.isSuccess) {
      const eventsArray = agendaData["data"]["docs"]?.map((event: any) => ({
        date: event?.date?.split("T")[0], // Extract date from ISO string (e.g., "2024-07-21")
        name: event?.name,
        penyelenggara: event?.penyelenggara.map(
          (arr: any) => arr["value"]["name"]
        ),
        description: event?.description,
        posters: event?.poster,
        time_start: event?.time_start?.split("T")[1].substring(0, 5),
        time_end: event?.time_end?.split("T")[1].substring(0, 5),
        id: event?.id,
        buttons: event.buttons,
      }));

      setItems(eventsArray.filter((arr: any) => arr.id === params["slug"])[0]);
    }
  }, [agendaData.isSuccess]);

  const handleScrollRight = () => {
    if (flatListRef.current) {
      const newOffset = scrollOffset + width; // Adjust the scroll amount as needed
      flatListRef.current?.scrollToOffset({
        offset: newOffset,
        animated: true,
      });
      setScrollOffset(newOffset);
    }
  };

  const handleScrollLeft = () => {
    if (flatListRef.current) {
      const newOffset = scrollOffset - width; // Adjust the scroll amount as needed
      flatListRef.current?.scrollToOffset({
        offset: newOffset,
        animated: true,
      });
      setScrollOffset(newOffset);
    }
  };

  const [viewHeight, setViewHeight] = useState<any>();

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${items.description}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView className="bg-white h-full">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Detail Acara",
          headerRight: () => (
            <Pressable onPress={onShare}>
              <Entypo name="share-alternative" size={24} color="#0A184F" />
            </Pressable>
          ),
        }}
      />
      <View onLayout={handleLayout}>
        {items && items.posters.length > 1 && (
          <Pressable
            className={`self-start absolute z-50 left-1`}
            style={{
              top: viewHeight ? viewHeight / 2 : "50%",
            }}
            onPress={() => handleScrollLeft()}
          >
            <FontAwesome name="chevron-circle-left" size={24} color="white" />
          </Pressable>
        )}
        <Pressable
          onPress={() => handleScrollRight()}
          className={`self-start absolute z-50 right-1`}
          style={{
            top: viewHeight ? viewHeight / 2 : "50%",
          }}
        >
          <FontAwesome name="chevron-circle-right" size={24} color="white" />
        </Pressable>

        {items && (
          <>
            <FlatList
              ref={flatListRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={items.posters}
              renderItem={(item) => (
                <Image
                  placeholder={{ blurhash }}
                  source={`${PUBLIC_API_URL}${item.item.poster.url}`}
                  contentFit="fill"
                  className="w-[100vw]"
                  style={{
                    aspectRatio: 4 / 5,
                  }}
                />
              )}
            />
          </>
        )}
      </View>
      <View className="px-5">
        {items && (
          <>
            <Text className=" text-secondary font-semibold text-xl text-center mt-7 mb-3">
              {items.name}
            </Text>

            <Text>{items.description}</Text>

            <View
              className={`${
                items.buttons.length === 1
                  ? null
                  : "flex flex-row justify-between gap-3"
              } mb-10`}
            >
              {items.buttons?.map((arr: any, index: any) => (
                <View key={index} className="flex-1">
                  <Button
                    title={arr.title}
                    color={"#0A184F"}
                    onPress={async () => {
                      await WebBrowser.openBrowserAsync(arr.url);
                    }}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
