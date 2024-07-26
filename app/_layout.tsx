import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="news/index"
          options={{
            headerShown: true,
            title: "Berita PPMI Mesir",
          }}
        />
        <Stack.Screen
          name="video/index"
          options={{
            headerShown: true,
            title: "Video PPMI Mesir",
          }}
        />
        <Stack.Screen
          name="wihdah/index"
          options={{
            headerShown: true,
            title: "Wihdah PPMI Mesir",
          }}
        />
        <Stack.Screen
          name="kekeluargaan/index"
          options={{
            headerShown: true,
            title: "Kekeluargaan Nusantara",
          }}
        />
        <Stack.Screen
          name="radio/index"
          options={{
            headerShown: true,
            title: "Radio PPMI Mesir",
          }}
        />
        <Stack.Screen
          name="kalender/index"
          options={{
            headerShown: true,
            title: "Kalender Kegiatan PPMI Mesir",
          }}
        />
        <Stack.Screen
          name="publikasi/index"
          options={{
            headerShown: true,
            title: "Publikasi PPMI Mesir",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
