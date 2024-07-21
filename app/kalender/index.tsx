import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Agenda } from "react-native-calendars";
import { getAgenda } from "../../services";

const Page = () => {
  const [items, setItems] = useState();

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
        time_start: event?.time_start?.split("T")[1].substring(0, 5),
        time_end: event?.time_end?.split("T")[1].substring(0, 5),
      }));

      const eventsObject = eventsArray.reduce((acc: any, event: any) => {
        const date = event.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({
          name: event.name,
          penyelenggara: event.penyelenggara,
          description: event.description,
          time_start: event.time_start,
          time_end: event.time_end,
        });
        return acc;
      }, {});
      setItems(eventsObject);
    }
  }, [agendaData.isSuccess]);

  console.log(items);

  const renderEmptyDate = () => {
    return (
      <View className="px-5 mt-3 ">
        <View className="bg-white h-24 flex justify-center items-center">
          <Text className="text-base text-gray-500 font-semibold">
            Belum ada kegiatan
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = (item: any) => {
    return (
      <SafeAreaView className="bg-white flex-1 rounded-[5px] p-[10px] mr-[10px] mt-[17px]">
        <View>
          <Text className="text-lg font-semibold text-gray-600">
            {item.name}
          </Text>

          <Text
            style={{ alignSelf: "flex-start" }}
            className="text-gray-600 w-auto p-1 bg-primary rounded-md"
          >
            {item.time_start} - {item.time_end} EET
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      renderEmptyData={renderEmptyDate}
      selected={"2024-07-21"}
    />
  );
};

export default Page;
