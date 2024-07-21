import { Link } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface MenuItemProps {
  title: string;
  children: ReactNode;
  href?: string;
}

export default function MenuItem({
  title,
  children,
  href = "",
}: MenuItemProps) {
  return (
    <Link href={href} className="m-1" asChild>
      <Pressable>
        <View className="flex flex-col justify-center items-center">
          <View className="h-[40px] w-[40px] flex justify-center items-center bg-secondary rounded-full">
            {children}
          </View>
          <View style={{ width: 50, height: 30 }}>
            <Text adjustsFontSizeToFit className="text-center">
              {title}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
