import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { StyledTableCell } from "../../styled/StyledTableCell";
import { StyledTableRow } from "../../styled/StyledTableRow";
import { ShoppingListMember, ShoppingListUser } from "../../types/shoppingList";

interface Props {
  isCurrentUserOwner: boolean;
  currentUser: ShoppingListUser;
  members: ShoppingListMember[];
  onDelete: (event: { member: ShoppingListMember }) => void;
}

function ListMemberTable({
  isCurrentUserOwner,
  currentUser,
  members,
  onDelete,
}: Props) {
  return (
    <TableContainer>
      <Table aria-label="Member table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell component="th">Name</StyledTableCell>
            <StyledTableCell component="th" align="right">
              Action
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!members.length && (
            <StyledTableRow>
              <StyledTableCell colSpan={2} align="center">
                No members found
              </StyledTableCell>
            </StyledTableRow>
          )}
          {members.map((member) => (
            <StyledTableRow
              key={member.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell>{member.name}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  color="error"
                  disabled={!isCurrentUserOwner && member.id !== currentUser.id}
                  onClick={() => onDelete({ member })}
                >
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

export default ListMemberTable;
