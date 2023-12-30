import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { StyledTableCell } from "../../styled/StyledTableCell";
import { StyledTableRow } from "../../styled/StyledTableRow";
import { ShoppingListItem } from "../../types/shoppingList";

interface Props {
  items: ShoppingListItem[];
  onDelete: (event: { item: ShoppingListItem }) => void;
  onChange: (event: { item: ShoppingListItem }) => void;
}

function ListItemTable({ items, onDelete, onChange }: Props) {
  return (
    <TableContainer>
      <Table aria-label="Member table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell component="th">Status</StyledTableCell>
            <StyledTableCell component="th">Name</StyledTableCell>
            <StyledTableCell component="th" align="right">
              Action
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!items?.length && (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                No items found
              </StyledTableCell>
            </StyledTableRow>
          )}
          {items.map((item) => (
            <StyledTableRow
              key={item.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell>
                <Checkbox
                  checked={item.status === "Resolved"}
                  onChange={(e) =>
                    onChange({
                      item: {
                        ...item,
                        status: e.target.checked ? "Resolved" : "Active",
                      },
                    })
                  }
                />
              </StyledTableCell>
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell align="right">
                <Button color="error" onClick={() => onDelete({ item })}>
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListItemTable;
