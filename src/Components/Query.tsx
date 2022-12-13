import axios from "axios";
import { useQuery } from "react-query";
type Props = {
  searchDescription: string;
  variable: string | null;
  order?: string | null;
  perPageItem?: number;
  pageNumber?: number;
};

// const queryFn = () => {

// }
export const useSearchQuery = ({
  searchDescription,
  variable,
  order,
  perPageItem,
  pageNumber,
}: Props) => {
  console.log("in query component", pageNumber, perPageItem);
  let since: number;
  if (pageNumber && perPageItem) {
    if (pageNumber > 1) {
      since = 1;
    }
  } else if (pageNumber && perPageItem) {
    since = pageNumber * perPageItem;
  }
  const { data, error, isLoading, refetch } = useQuery(
    "github-query",
    async () => {
      return await axios
        .get(
          `https://api.github.com/search/repositories?q=${searchDescription}&page=${pageNumber}&sort=${variable}&order=${order}&per_page=${perPageItem}&since=${since}`
        )
        .then(function (response) {
          console.log(response.data, response, pageNumber, "axios data");
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    {
      keepPreviousData: true,
      enabled: false,
    }
  );
  console.log(data, "this is query data");
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
