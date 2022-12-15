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

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setSearchDescription(e.target.value);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // e.preventDefault();
    console.log(searchDescription.length, e.key);
    if (searchDescription.length >= 1 && e.key === "Enter") {
      refetch();
    }
  };
  const styleSearch = {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };
  return (
    <div style={styleSearch}>
      {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
      <TextField
        id="outlined-basic"
        value={searchDescription}
        label="Search repositories"
        variant="outlined"
        required
        onKeyDown={(e) => handleEnter(e)}
        onChange={(e) => handleSearchChange(e)}
      />
      <Filter
        searchDescription={searchDescription}
        setVariable={setVariable}
        setOrder={setOrder}
        order={order}
        variable={variable}
      />
    </div>
  );
};

export default Search;
