import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services";

export default function useGetNews() {
  const result = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  return [{ ...result }];
}
