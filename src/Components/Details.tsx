import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { useReadme } from "./Readme";
import { Buffer } from "buffer";

type Props = {};

const Details = (props: Props) => {
  const [readme, setReadme] = useState<string>();
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
        .get(
          `http://localhost:8000/get-details?newName=${newName}&newRepo=${newRepo}`
        )
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

  //   let readmeData
  type readmeParam = {
    owner: string;
    repo: string;
    path: string;
  };
  async function readmeFn({ owner, repo, path }: readmeParam) {
    console.log(owner, "inside funciton<<----------------------------->>");
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
        console.log(d.content);
        const baseSF = Buffer.from(d.content, "base64");
        console.log(baseSF, "this is baseSF");
        const readmeString = baseSF.toString();
        console.log(readmeString, "this is unit 8");
        setReadme(readmeString);
      });
  }

  console.log(readme, "readme dataaaaaaaaaaaaaaaaaaaaaaaa");
  useEffect(() => {
    console.log(
      "useeffect data############################################",
      data
    );
    if (data) {
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^");
      let owner: string;
      let repo: string;
      const path: string = "README.md";
      var p1 = Promise.resolve(setDetail(data));
      var p2 = new Promise((resolve, reject) => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        owner = data.owner.login;
        repo = data.name;
      });
      var p3 = new Promise((resolve, reject) => {
        console.log("running p3-------------------------##");
        readmeFn({ owner, repo, path });
      });

      Promise.all([p1, p2, p3]).then((values) => {
        console.log(
          "all resolve<<<-------------------------*----------------->>>"
        );
        // readmeFn({ owner, repo, path });
      });
    }
  }, [data]);

  console.log("details", detail);
  if (detail) {
    console.log("detail =============");
    return (
      <div>
        <Box style={{ padding: "1rem" }}>
          <Typography
            variant="h4"
            style={{ display: "block", fontSize: "2rem" }}
          >
            {detail.owner.login}
          </Typography>
          <Typography
            variant="h6"
            style={{ fontSize: "1rem", paddingBottom: "1rem" }}
          >
            {detail.name}
          </Typography>
          <Typography variant="h2" style={{ fontSize: "1rem" }}>
            issues: {detail.open_issues_count}
          </Typography>
          <Typography variant="subtitle1">
            Branch: {detail.default_branch}
          </Typography>
          <pre
            style={{
              backgroundColor: "aliceblue",
              padding: "1rem",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              textAlign: "justify",
            }}
          >
            {readme ? readme : null}
          </pre>
        </Box>
      </div>
    );
  } else {
    return <Skeleton />;
  }
};

export default Details;
