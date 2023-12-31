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
import { FormattedMessage } from "react-intl";

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
          <FormattedMessage id="components.createlistdialog.description" />
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          variant="standard"
          label={<FormattedMessage id="components.createlistdialog.label" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          <FormattedMessage id="components.createlistdialog.cancel" />
        </Button>
        <Button autoFocus disabled={!name} onClick={handleConfirm}>
          <FormattedMessage id="components.createlistdialog.confirm" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateListDialog;
