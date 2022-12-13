import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { useReadme } from "./Readme";

type Props = {};

const Details = (props: Props) => {
  const [readme, setReadme] = useState();
  const [detail, setDetail] = useState<any>();
  const { name, reponame } = useParams();
  let newName: string;
  let newRepo: string;
  if (typeof name === "string" && typeof reponame === "string") {
    newName = name;
    newRepo = reponame;
  }
  console.log("url", name, reponame);
  const { data, isLoading, error } = useQuery(
    "details-query",
    async () => {
      return await axios
        .get(`https://api.github.com/repos/${newName}/${newRepo}`)
        .then(function (response) {
          console.log(response.data, response, "axios data");
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    {
      keepPreviousData: true,
    }
  );

  //   let readmeData;
  //   let owner: any;
  //   async function readmeFn() {
  //     const repo: string = data.name;
  //     const path: string = "README.md";
  //     console.log(detail, owner, "inside funciton");
  //     await fetch(
  //       `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  //     )
  //       .then((d) => d.json())
  //       .then((d) =>
  //         fetch(
  //           `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
  //         )
  //       )
  //       .then((d) => d.json())
  //       .then((d) => {
  //         setReadme(JSON.parse(window.atob(d.content)));
  //       });
  //   }

  //   console.log(readmeData, "readme dataaaaaaaaaaaaaaaaaaaaaaaa");
  useEffect(() => {
    console.log(
      "useeffect data############################################",
      data
    );
    if (data) {
      //   owner = data.owner.login;
      setDetail(data);
      //   readmeFn();
    }
  }, [data]);

  console.log("detailss", detail);
  if (detail) {
    console.log("detail =============");
    return (
      <div>
        <Box>
          <Typography variant="h4">{detail.owner.login}</Typography>
          <Typography variant="h6">{detail.name}</Typography>
          <Typography variant="h2">{detail.open_issues_count}</Typography>
          <Typography variant="h2">{detail.default_branch}</Typography>
          {/* <Typography variant="h2">{readme ? readme : null}</Typography> */}
        </Box>
      </div>
    );
  } else {
    return <Skeleton />;
  }
};

export default Details;
