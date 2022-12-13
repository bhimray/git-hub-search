import React from "react";

type Props = {
  owner: string;
  repo: string;
  path: string;
};

export const useReadme = async ({ owner, repo, path }: Props) => {
  let readme: any = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  )
    .then((d) => d.json())
    .then((d) =>
      fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`)
    )
    .then((d) => d.json())
    .then((d) => JSON.parse(window.atob(d.content)));

  return readme;
};
