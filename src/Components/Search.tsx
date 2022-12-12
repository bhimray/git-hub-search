import React, { useEffect, useState } from "react";
import { useSearchQuery } from "./Query";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";

type Props = {};

const Search = (props: Props) => {
  const [searchDescription, setSearchDescription] = useState<string>("");
  //   const [search, setSearch] = useState<string>("");
  console.log(searchDescription);

  const { data, loading, error, refetch } = useSearchQuery({
    searchDescription: searchDescription,
  });

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  if (loading) return <div> Loading...</div>;
  if (error) return <div>Error occured</div>;

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
      <TextField
        id="outlined-basic"
        value={searchDescription}
        label="Search repositories"
        variant="outlined"
        required
        onChange={(e) => handleSearchChange(e)}
      />
    </div>
  );
};

export default Search;
