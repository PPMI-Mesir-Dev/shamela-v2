import { View } from "react-native";
import {
  FontAwesome,
  Entypo,
  Foundation,
  FontAwesome6,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import MenuItem from "../../menuItem";

export default function GridMenu() {
  return (
    <View className="bg-primary w-screen">
      <View className="flex flex-wrap flex-row justify-center w-full my-10 px-16">
        <MenuItem title="Berita" href="/news">
          <FontAwesome name="newspaper-o" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Publikasi">
          <Entypo name="news" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Video" href="/video">
          <Foundation name="play-video" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Wihdah" href="/wihdah">
          <FontAwesome name="newspaper-o" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Kekeluargaan" href="/kekeluargaan">
          <FontAwesome name="newspaper-o" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Kesehatan">
          <FontAwesome name="newspaper-o" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Radio" href="/radio">
          <FontAwesome name="newspaper-o" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Jadwal Solat">
          <FontAwesome6 name="mosque" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Kalender" href="/kalender">
          <AntDesign name="calendar" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Pustaka">
          <MaterialCommunityIcons name="bookshelf" size={24} color="#c6e1fd" />
        </MenuItem>
      </View>
    </View>
  );
}
