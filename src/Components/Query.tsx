import axios from "axios";
import { useQuery } from "react-query";
type Props = {
  searchDescription: string;
  variable: string | null;
  order: string | null;
};

// const queryFn = () => {

// }
export const useSearchQuery = ({
  searchDescription,
  variable,
  order,
}: Props) => {
  const { data, error, isLoading, refetch } = useQuery(
    "github-query",
    async () => {
      await axios
        .get(
          `https://api.github.com/search/repositories?q=${searchDescription}&sort:${variable}-${order}`
        )
        .then(function (response) {
          console.log(response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    {
      enabled: false,
    }
  );
  return { data, loading: isLoading, error, refetch };
  // if (variable) {
  //     const { data, error, isLoading, refetch } = useQuery(
  //         "github-query",
  //         async () => {
  //             const response = await fetch(
  //                 `https://api.github.com/search/repositories?q=${searchDescription}&sort=${variable}`
  //             );
  //             return response.json();
  //         },
  //         {
  //             enabled: false,
  //         }
  //     );
  //     return { data, loading: isLoading, error, refetch };
  // } else if (variable && order) {
  //     const { data, error, isLoading, refetch } = useQuery(
  //         "github-query",
  //         async () => {
  //             const response = await fetch(
  //                 `https://api.github.com/search/repositories?q=${searchDescription}&sort=${variable}-${order}`
  //             );
  //             return response.json();
  //         },
  //         {
  //             enabled: false,
  //         }
  //     );
  //     return { data, loading: isLoading, error, refetch };
  // } else {
  //     const { data, error, isLoading, refetch } = useQuery(
  //         "github-query",
  //         async () => {
  //             const response = await fetch(
  //                 `https://api.github.com/search/repositories?q=${searchDescription}`
  //             );
  //             return response.json();
  //         },
  //         {
  //             enabled: false,
  //         }
  //     );
  //     return { data, loading: isLoading, error, refetch };
  // }
};
