import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  disabled?: boolean;
  onSubmit: (event: { name: string }) => void;
}

function CreateMemberForm({ disabled, onSubmit }: Props) {
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
        label="Member name"
        value={name}
        disabled={disabled}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" variant="contained" disabled={disabled || !name}>
        Add member
      </Button>
    </Box>
  );
}

export default CreateMemberForm;
