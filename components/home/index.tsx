import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import HomeScrollView from "./homeScrollView";
import ListHeaderView from "./listHeaderView";
import { Link } from "expo-router";
import { getAgenda, getHimbauan, PUBLIC_API_URL } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";

const blurhash = "LEHLk~WB2yk8pyo0adR*.7kCMdnj";

export default function Home() {
  return (
    <ScrollView className="bg-white h-full">
      <ListHeaderView />
      <HomeScrollView />
      <AgendaView />
      <HimbauanView />
    </ScrollView>
  );
}

function HimbauanView() {
  const [himbauan, setHimbauan] = useState();

  const himbauanData = useQuery({
    queryKey: ["himbauan"],
    queryFn: getHimbauan,
  });

  useEffect(() => {
    if (himbauanData.isSuccess) {
      const eventsArray = himbauanData.data.docs;
      setHimbauan(eventsArray);
    }
  }, [himbauanData.isSuccess]);

  return (
    <View className="w-[95%] mx-auto mb-5">
      <View className=" mt-5 mb-3 border-l-4 flex-row items-center justify-between">
        <Text className="text-secondary font-bold text-xl ml-2">
          Galeri & Himbauan Terbaru
        </Text>
      </View>
      <View>
        {himbauan && (
          <FlatList
            data={himbauan}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={(item) => (
              <>
                <Image
                  placeholder={{ blurhash }}
                  source={`${PUBLIC_API_URL}${item.item.gambar.url}`}
                  contentFit="fill"
                  className="w-[70vw]"
                  style={{
                    aspectRatio: 4 / 5,
                  }}
                />
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}

function AgendaView() {
  const [items, setItems] = useState();

  const agendaData = useQuery({
    queryKey: ["agenda"],
    queryFn: getAgenda,
  });

  useEffect(() => {
    if (agendaData.isSuccess) {
      const eventsArray = agendaData["data"]["docs"];
      setItems(eventsArray.filter((arr: any) => arr.featured === "yes"));
    }
  }, [agendaData.isSuccess]);

  return (
    <View className="w-[95%] mx-auto">
      <View className=" mt-5 mb-3 border-l-4 flex-row items-center justify-between">
        <Text className="text-secondary font-bold text-xl ml-2">
          Agenda Terbaru
        </Text>
        <Link href={"/kalender"} className="ml-2 flex justify-between flex-col">
          <Entypo name="chevron-right" size={24} color="#0a184f" />
        </Link>
      </View>
      <View>
        {items && (
          <FlatList
            horizontal={true}
            data={items}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={(item) => (
              <Link href={`/kalender/${item.item.id}`} asChild>
                <Pressable>
                  <Image
                    placeholder={{ blurhash }}
                    source={`${PUBLIC_API_URL}${item.item.poster[0].poster.url}`}
                    contentFit="fill"
                    className="w-[70vw]"
                    style={{
                      aspectRatio: 4 / 5,
                    }}
                  />
                </Pressable>
              </Link>
            )}
          />
        )}
      </View>
    </View>
  );
}
