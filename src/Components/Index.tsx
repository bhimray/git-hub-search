import React from "react";
import Search from "./Search";
import { useState, useEffect } from "react";
import { useSearchQuery } from "./Query";

type Props = {};

const Index = (props: Props) => {
  const [searchDescription, setSearchDescription] = useState("");
  const [variable, setVariable] = useState("");
  const [order, setOrder] = useState("");

  const { data, loading, error, refetch } = useSearchQuery({
    searchDescription: searchDescription,
    variable: variable,
    order: order,
  });

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div>
      <Search
        searchDescription={searchDescription}
        setSearchDescription={setSearchDescription}
        variable={variable}
        setVariable={setVariable}
        order={order}
        setOrder={setOrder}
        refetch={refetch}
      />
    </div>
  );
};

export default Index;
