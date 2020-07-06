import React, { useState } from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BottomNavigationStyled, HeaderWithBorder } from "../components/header";
import CustomForm from "../components/form-component";

function AddComment() {
  const [navValue, setNavValue] = useState<number>(0);
  let history = useHistory();

  const TextFieldWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <main>
      <TextFieldWrapper>
        <HeaderWithBorder>
          <BottomNavigationStyled
            value={navValue}
            onChange={(event, newValue) => {
              setNavValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction
              label="Homepage"
              icon={<HomeIcon />}
              onClick={() => history.push("/")}
            />
          </BottomNavigationStyled>
        </HeaderWithBorder>
        <CustomForm />
      </TextFieldWrapper>
    </main>
  );
}
export default AddComment;
