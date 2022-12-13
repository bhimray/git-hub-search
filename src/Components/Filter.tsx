import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

type Props = {
  setVariable: (param: string) => void;
  setOrder: (param: string) => void;
  order: string;
  variable: string;
};
export default function Filter({
  setVariable,
  setOrder,
  order,
  variable,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setVariable(event.target.value);
  };
  const handleOrder = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    console.log(event);
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Sort By</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Please Select:</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="selectVariable">Variable</InputLabel>
              <Select
                native
                value={variable}
                onChange={handleChange}
                input={<OutlinedInput label="Sort by" id="selectVariable" />}
              >
                <option aria-label="None" value="" />
                <option value={"interactions"}>interactions</option>
                <option value={"reactions"}>reactions</option>
                <option value={"author-date"}>author-date</option>
                <option value={"committer-date"}>committer-date</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="selectOrder">Order</InputLabel>
              <Select
                labelId="selectOrder"
                id="selectOrder"
                value={order}
                onChange={handleOrder}
                input={<OutlinedInput label="Order" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"asc"}>Ascending</MenuItem>
                <MenuItem value={"desc"}>Descending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}