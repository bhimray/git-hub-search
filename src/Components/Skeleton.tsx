import React from "react";
import { Stack, Skeleton } from "@mui/material";
type Props = {};

const styleSkeleton = {
  display: "flex",
  padding: "5rem",
  justifyContent: "center",
  alignItems: "center",
};
const width = 800;
const height = 150;
const profileWidth = 300;
const profileHeight = 20;

const ListSkeleton = (props: Props) => {
  return (
    <div style={styleSkeleton}>
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={profileWidth}
          height={profileHeight}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={width}
          height={height}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={profileWidth}
          height={profileHeight}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={width}
          height={height}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={profileWidth}
          height={profileHeight}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={width}
          height={height}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={profileWidth}
          height={profileHeight}
        />
      </Stack>
    </div>
  );
};

export default ListSkeleton;
