import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UseGetDataTypes {
  service: () => any;
  key: string;
}

export default function useGetData({ service, key }: UseGetDataTypes) {
  const result = useQuery({
    queryKey: [key],
    queryFn: service,
  });

  return { ...result };
}
