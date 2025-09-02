import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          marginTop: "5px",
          width: "295px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        size="small"
        label={
          <>
            <SearchIcon />
            Search
          </>
        }
        // placeholder="Search"
        InputProps={{
          // disableUnderline: true,
          sx: {
            height: "40px",
            borderRadius: "6px",
            fontSize: "14px",
          },
        }}
        variant="outlined"
      />
    </Box>
  );
}
