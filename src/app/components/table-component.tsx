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

function TableComponent({ rows }: any) {
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

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCellAlignedRight>Name</TableCellAlignedRight>
              <TableCellAlignedRight>E-mail</TableCellAlignedRight>
              <TableCellAlignedRight>First 20 characters</TableCellAlignedRight>
              <TableCellAlignedRight>Add to selected</TableCellAlignedRight>
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
                    onClick={() => console.log("dodaj koemntarz do ulubionych")}
                  >
                    Add!
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
