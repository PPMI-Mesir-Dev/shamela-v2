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
          name="kekeluargaan/index"
          options={{
            headerShown: true,
            title: "Kekeluargaan Nusantara",
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
        <Stack.Screen
          name="pustaka/index"
          options={{
            headerShown: true,
            title: "Pustaka Karya",
          }}
        />
        <Stack.Screen
          name="badan-otonom/index"
          options={{
            headerShown: true,
            title: "Lembaga Otonom PPMI",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
