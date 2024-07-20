import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/AccountInfo";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import AccountInfoForm from "./accountInfoForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useToasts } from "react-toast-notifications";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    fontSize: "1.25rem",
  },
}));

const AccountInfo = ({ fetchAllaccountInfo, deleteaccountInfo, AccountInfoList }) => {
  const { addToast } = useToasts();
  const [currentId, setCurrentId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("accountName");

  useEffect(() => {
    fetchAllaccountInfo();
  }, [fetchAllaccountInfo]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      deleteaccountInfo(id, () => addToast("Deleted Successfully", { appearance: "info" }));
    }
  };

  const filteredAccounts = AccountInfoList.filter((account) =>
    account[filterField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AccountInfoForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth style={{ marginBottom: "16px" }}>
            <InputLabel>Filter By</InputLabel>
            <Select
              label="Filter By"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <MenuItem value="accountName">Account Name</MenuItem>
              <MenuItem value="userName">Username</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {filteredAccounts && filteredAccounts.length > 0 ? (
                  filteredAccounts.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.accountName}</TableCell>
                      <TableCell>{record.userName}</TableCell>
                      <TableCell>{record.password}</TableCell>
                      <TableCell>{record.category}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button onClick={() => setCurrentId(record.id)}>
                            <EditIcon color="primary" />
                          </Button>
                          <Button onClick={() => onDelete(record.id)}>
                            <DeleteIcon color="secondary" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No account information available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

const mapStateToProps = (state) => ({
  AccountInfoList: state.AccountInfo?.list,
});

const mapActionToProps = {
  fetchAllaccountInfo: actions.fetchAll,
  deleteaccountInfo: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(AccountInfo);