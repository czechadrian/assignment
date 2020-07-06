import React, { useState } from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { BottomNavigationStyled, HeaderWithBorder } from "../components/header";
import TableComponent from "../components/table-component";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../reducers";
import { removeSelectedCommentAction } from "./actions/selected-comments-actions";

function SelectedCommentsPage() {
  const [navValue, setNavValue] = useState<number>(0);

  let history = useHistory();
  const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
  const selectedComments = useTypedSelector((state) =>
    state.data.comments.filter((comment) => comment.selected)
  );
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
      {selectedComments.length === 0 || selectedComments === [] ? null : (
        <TableComponent
          rows={selectedComments}
          homePageTable={false}
          action={removeSelectedCommentAction}
        />
      )}
    </main>
  );
}

export default SelectedCommentsPage;
