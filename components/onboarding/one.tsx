import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { SetStateAction, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const DURATION = 1000;
const DELAY = 500;

interface OneProps {
  setShowOnboarding: any;
}

export default function One({ setShowOnboarding }: OneProps) {
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const opacity4 = useSharedValue(0);
  const opacity5 = useSharedValue(0);
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    show();
  }, []);

  const show = () => {
    if (isShown) {
      opacity5.value = withDelay(
        0 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacity4.value = withDelay(
        1 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacity3.value = withDelay(
        2 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacity2.value = withDelay(
        3 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      opacity1.value = withDelay(
        4 * DELAY,
        withTiming(0, { duration: DURATION })
      );
    } else {
      opacity1.value = withDelay(
        0 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity2.value = withDelay(
        1 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity3.value = withDelay(
        2 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity4.value = withDelay(
        3 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity5.value = withDelay(
        4 * DELAY,
        withTiming(1, { duration: DURATION })
      );
    }

    setShown(!isShown);
  };

  const setOnboardingCompleted = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      await setShowOnboarding(false);
    } catch (e) {
      // Error storing data
      console.error(e);
    }
  };

  return (
    <View className="h-full w-full flex justify-center items-center flex-col bg-white">
      <View className="mb-5">
        <View className="flex flex-row gap-2">
          <Animated.Text
            className={`text-secondary font-bold text-3xl`}
            style={{
              opacity: opacity1,
            }}
          >
            Selamat
          </Animated.Text>
          <Animated.Text
            className={`text-secondary font-bold text-3xl`}
            style={{
              opacity: opacity2,
            }}
          >
            Datang
          </Animated.Text>
        </View>
        <View className="flex flex-row gap-2">
          <Animated.Text
            className={`text-secondary font-bold text-2xl`}
            style={{
              opacity: opacity4,
            }}
          >
            Di Aplikasi Shamela
          </Animated.Text>
        </View>
      </View>
      <Animated.View
        style={{
          opacity: opacity5,
        }}
      >
        <Pressable
          className=" bg-secondary rounded-md"
          onPress={() => {
            setOnboardingCompleted();
          }}
        >
          <Text className=" text-2xl font-bold text-white my-2 mx-7">
            Mulai
          </Text>
        </Pressable>
      </Animated.View>
      <Animated.View
        className="absolute bottom-5"
        style={{
          opacity: opacity5,
        }}
      >
        <Text className="font-bold text-sm text-secondary mb-1">
          Powered by
        </Text>
        <View className="flex flex-row">
          <Image
            source={require("../../assets/Logo/abdikarya.png")}
            contentFit="contain"
            className="h-6 w-10"
          />
          <Image
            source={require("../../assets/Logo/ppmi.png")}
            contentFit="contain"
            className="h-6 w-10"
          />
        </View>
      </Animated.View>
    </View>
  );
}
