import React from "react";
import { Typography, ButtonGroup, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

type Props = {
  data: any;
};
const styleNoResult = {
  width: "-webkit - fill - available",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "aliceblue",
  margin: "2%",
  borderRadius: "2rem",
  fontSize: "3rem",
};

const styleResult = {
  width: "-webkit - fill - available",
  height: "80vh",
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "aliceblue",
  margin: "2%",
  borderRadius: "2rem",
  fontSize: "3rem",
  overflow: "scroll",
};

const RepoList = ({ data }: Props) => {
  return (
    <>
      {data ? (
        <div style={styleResult}>
          <Button
            variant="contained"
            disabled
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "fit-content",
              marginTop: "1rem",
            }}
          >
            Total: {data.total_count}
          </Button>
          {data?.items?.map((item: any) => (
            <Link
              to={`/details/${item.owner.login}/${item.name}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                component="span"
                sx={{ p: 2 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                }}
              >
                <Box
                  component="span"
                  sx={{ p: 2 }}
                  style={{
                    display: "grid",
                    justifyContent: "flex-start",
                    padding: "1rem",
                    textAlign: "justify",
                    marginTop: "1rem",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      gap: "2rem",
                      marginBottom: "1rem",
                      // justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {item.full_name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Owner: {item.owner.login}
                    </Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {item.updated_at}
                  </Typography>
                </Box>
                <div>
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                  >
                    <Button variant="outlined" startIcon={<StarIcon />}>
                      {item.stargazer_count}
                    </Button>
                    <Button variant="outlined">{item.forks_count}</Button>
                    <Button variant="outlined" startIcon={<VisibilityIcon />}>
                      {item.watchers_count}
                    </Button>
                  </ButtonGroup>
                </div>
              </Box>
            </Link>
          ))}
        </div>
      ) : (
        <div style={styleNoResult}>No search results</div>
      )}
    </>
  );
};

export default RepoList;
