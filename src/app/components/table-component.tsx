import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";

function TableComponent({ rows, homePageTable, action }: any) {
  const TableCellAlignedRight = styled(TableCell)`
    align: right;
  `;

  const TableStyled = styled(Table)`
    aria-label: "simple table";
  `;

  const TableWrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10% 0;
  `;

  let dispatch = useDispatch();
  const buttonText = (selected: boolean) => {
    return homePageTable
      ? selected
        ? "Added"
        : "Add"
      : selected
      ? "Remove"
      : "Removed";
  };
  const isButtonDisabled = (selected: boolean) => {
    return homePageTable ? selected : !selected;
  };
  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCellAlignedRight>Name</TableCellAlignedRight>
              <TableCellAlignedRight>E-mail</TableCellAlignedRight>
              <TableCellAlignedRight>First 20 characters</TableCellAlignedRight>
              <TableCellAlignedRight>
                Add/Remove to Selected
              </TableCellAlignedRight>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCellAlignedRight>{row.email}</TableCellAlignedRight>
                <TableCellAlignedRight>
                  {row.body.slice(0, 20)}
                </TableCellAlignedRight>
                <TableCellAlignedRight>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isButtonDisabled(row.selected)}
                    onClick={() => dispatch(action({ id: row.id }))}
                  >
                    {buttonText(row.selected)}
                  </Button>
                </TableCellAlignedRight>
              </TableRow>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainer>
    </TableWrapper>
  );
}

export default TableComponent;
