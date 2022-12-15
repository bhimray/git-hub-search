import React from "react";
import Search from "./Search";
import { useState, useEffect, useRef } from "react";
import { useSearchQuery } from "./Query";
import ListSkeleton from "./Skeleton";
import RepoList from "./RepoList";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";

type Props = {};

const Index = (props: Props) => {
  const [searchDescription, setSearchDescription] = useState("");
  const [variable, setVariable] = useState("");
  const [order, setOrder] = useState("");
  const [numberOfItem, setNumberOfItem] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<any>();
  const timeRef = useRef<null | ReturnType<typeof setTimeout>>();

  //query the data from useSearchQuery
  const {
    data: fetchedData,
    loading,
    error,
    refetch,
  } = useSearchQuery({
    searchDescription: searchDescription,
    variable: variable,
    order: order,
    pageNumber: pageNumber,
    perPageItem: numberOfItem,
  });
  console.log("fetched data", fetchedData);
  // setting fetched data to state
  useEffect(() => {
    console.log("useEffect is triggerred to fetch data");
    if (fetchedData) {
      console.log(fetchedData, "this is fetched data from refetched");
      if (searchDescription.length === 0) {
        setData(null);
      } else {
        setData(fetchedData);
      }
    }
  }, [fetchedData]);

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfItem(Number(event.target.value));
  };

  const evalPage = data?.item_count / numberOfItem;

  const handlePageIncrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPageNumber(pageNumber + 1);
    clearTimeout(Number(timeRef));
    timeRef.current = setTimeout(() => {
      console.log("refetching page change");
      refetch();
    }, 1000);
  };

  const handlePageDecrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPageNumber(pageNumber - 1);
    clearTimeout(Number(timeRef));
    timeRef.current = setTimeout(() => {
      console.log("refetching page change");
      refetch();
    }, 1000);
  };
  return (
    <div style={{ display: "grid" }}>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        style={{ position: "absolute", top: "1.5rem" }}
      >
        <InputLabel htmlFor="selectVariable">Items {numberOfItem}</InputLabel>
        <Select
          native
          value={variable}
          onChange={handleChange}
          input={<OutlinedInput label="Select" id="selectVariable" />}
        >
          <option value={""}></option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </FormControl>
      <Search
        searchDescription={searchDescription}
        setSearchDescription={setSearchDescription}
        variable={variable}
        setVariable={setVariable}
        order={order}
        setOrder={setOrder}
        refetch={refetch}
      />
      {loading ? (
        <ListSkeleton />
      ) : (
        <RepoList data={data} searchDescription={searchDescription} />
      )}
      <ButtonGroup>
        <Button
          variant="outlined"
          disabled={pageNumber === 1 ? true : false}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handlePageDecrease(e)
          }
          startIcon={<SendIcon />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={pageNumber >= evalPage ? true : false}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handlePageIncrease(e)
          }
          endIcon={<SendIcon />}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Index;
