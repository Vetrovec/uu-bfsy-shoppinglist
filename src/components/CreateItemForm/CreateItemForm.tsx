import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  onSubmit: (event: { name: string }) => void;
}

function CreateItemForm({ onSubmit }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name });
    setName("");
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      my={2}
      onSubmit={handleSubmit}
    >
      <TextField
        size="small"
        label={<FormattedMessage id="components.createitemform.name" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" variant="contained" disabled={!name}>
        <FormattedMessage id="components.createitemform.add" />
      </Button>
    </Box>
  );
}

export default CreateItemForm;
