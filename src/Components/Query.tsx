import { useQuery } from "react-query";
type Props = {
  searchDescription: string;
};

export const useSearchQuery = (props: Props) => {
  const { data, error, isLoading, refetch } = useQuery(
    "github-query",
    async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${props.searchDescription}`
      );
      return response.json();
    },
    {
      enabled: false,
    }
  );

  return { data, loading: isLoading, error, refetch };
};
