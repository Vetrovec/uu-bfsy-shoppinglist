import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: (event: { name: string }) => void;
}

function CreateListDialog({ open, onCancel, onConfirm }: Props) {
  const [name, setName] = useState("");

  const handleConfirm = () => {
    onConfirm({ name });
    setName("");
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Create shopping list</DialogTitle>
      <DialogContent>
        <DialogContentText mb={1}>
          Please enter the name of the new shopping list.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          variant="standard"
          label="Shopping list name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button autoFocus disabled={!name} onClick={handleConfirm}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateListDialog;
