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
  //   const { readme } = useReadme({
  const owner: string = detail?.owner.login;
  const repo: string = detail?.name;
  const path: string = "README.md";
  //   });
  let readmeData;
  async function readme(owner: string, repo: string, path: string) {
    await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    )
      .then((d) => d.json())
      .then((d) =>
        fetch(
          `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
        )
      )
      .then((d) => d.json())
      .then((d) => {
        readmeData = JSON.parse(window.atob(d.content));
      });
  }

  console.log(readme);
  useEffect(() => {
    if (data) {
      setDetail(data);
      readme(owner, repo, path);
    }
  }, [data, detail]);

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
          <Typography variant="h2">{readmeData}</Typography>
        </Box>
      </div>
    );
  } else {
    return <Skeleton />;
  }
};

export default Details;
