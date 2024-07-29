import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNews } from "../services";

export default function useGetNews() {
  const result = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: getNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => console.log(lastPage),
  });

  console.log(result.data);

  return [{ ...result }];
}
