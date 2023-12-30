import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteListDialog({ open, onCancel, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        <FormattedMessage id="components.deletelistdialog.title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="components.deletelistdialog.description" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          <FormattedMessage id="components.deletelistdialog.cancel" />
        </Button>
        <Button color="error" onClick={onConfirm}>
          <FormattedMessage id="components.deletelistdialog.confirm" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteListDialog;
