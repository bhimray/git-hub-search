import React from "react";
import { Stack, Skeleton } from "@mui/material";
type Props = {};

const ListSkeleton = (props: Props) => {
  return (
    <div>
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={40}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={60}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={40}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={60}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={40}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={60}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={40}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={60}
        />
      </Stack>
    </div>
  );
};

export default ListSkeleton;
