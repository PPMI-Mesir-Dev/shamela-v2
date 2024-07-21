import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const DURATION = 1000;
const DELAY = 500;

export default function One() {
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
        3 * DELAY,
        withTiming(1, { duration: DURATION })
      );
    }

    setShown(!isShown);
  };

  return (
    <View className="h-screen w-screen flex justify-center items-center flex-col gap-5">
      <View>
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
        <Pressable className=" bg-secondary rounded-md">
          <Text className=" text-2xl font-bold text-primary my-2 mx-7">
            Mulai
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
