import axios, { AxiosResponse } from "axios";
import { useState } from "react";
type Props = {
  owner: string;
  repo: string;
  path: string;
};

export const useReadme = async ({ owner, repo, path }: Props) => {
  const [readmeFile, getReadmeFile] = useState<AxiosResponse | null>(null);

  await axios
    .get(`http://localhost:8000/${owner}/${repo}/${path}`)
    .then((res) => {
      getReadmeFile(res);
      console.log(res, "res of readme");
      // console.log(typeof res, window.atob(res), "this is readme res");
      // return window.atob(res);
    });
  console.log(readmeFile);

  return readmeFile;
};
