import * as React from "react";
import styled from "styled-components";
import { BottomNavigation } from "@material-ui/core";

export const HeaderWithBorder = styled.header`
  width: 80%;
  margin: 0 10% 5%;
  border-bottom: 1px solid lightgray;
`;
export const BottomNavigationStyled = styled(BottomNavigation)`
  &:last-child {
    margin-bottom: 2.5%;
  }
`;

export default HeaderWithBorder;
