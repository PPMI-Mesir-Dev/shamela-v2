import { View } from "react-native";
import {
  FontAwesome,
  Entypo,
  Foundation,
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
        <MenuItem title="Publikasi" href="/publikasi">
          <Entypo name="news" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Video" href="/video">
          <Foundation name="play-video" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Kekeluargaan" href="/kekeluargaan">
          <FontAwesome name="newspaper-o" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Kalender" href="/kalender">
          <AntDesign name="calendar" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Pustaka" href="/pustaka">
          <MaterialCommunityIcons name="bookshelf" size={24} color="#c6e1fd" />
        </MenuItem>
        <MenuItem title="Lembaga Otonom" href="/badan-otonom">
          <FontAwesome name="institution" size={24} color="#c6e1fd" />
        </MenuItem>
      </View>
    </View>
  );
}
