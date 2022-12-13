import React, { useEffect, useState, useRef } from "react";
import { TextField } from "@mui/material";
import Filter from "./Filter";

type Props = {
  searchDescription: string;
  setSearchDescription: (param: string) => void;
  variable: string;
  setVariable: (param: string) => void;
  order: string;
  setOrder: (param: string) => void;
  refetch: any;
};

const Search = ({
  searchDescription,
  setSearchDescription,
  variable,
  setVariable,
  order,
  setOrder,
  refetch,
}: Props) => {
  const timeRef = useRef<null | ReturnType<typeof setTimeout>>();

  console.log(searchDescription);

  useEffect(() => {
    console.log(variable, order, "this is variable and order");
    if (variable || order) {
      clearTimeout(Number(timeRef));
      timeRef.current = setTimeout(() => {
        console.log("refetching", variable, order);
        refetch();
      }, 2000);
    }
  }, [variable, order, refetch]);

  let timeout: any;
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchDescription(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      //   setSearch(searchDescription);
      refetch();
    }, 2000);
  };
  return (
    <div>
      {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
      <TextField
        id="outlined-basic"
        value={searchDescription}
        label="Search repositories"
        variant="outlined"
        required
        onChange={(e) => handleSearchChange(e)}
      />
      <Filter
        setVariable={setVariable}
        setOrder={setOrder}
        order={order}
        variable={variable}
      />
    </div>
  );
};

export default Search;
