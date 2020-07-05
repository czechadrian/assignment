import React, { useState } from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { BottomNavigationStyled, HeaderWithBorder } from "../components/header";

function SelectedCommentsPage() {
  const [navValue, setNavValue] = useState<number>(0);

  let history = useHistory();

  return (
    <main>
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
    </main>
  );
}

export default SelectedCommentsPage;
