import React, { useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../reducers";
import TableComponent from "../components/table-component";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MessageIcon from "@material-ui/icons/Message";
import FolderIcon from "@material-ui/icons/Folder";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { BottomNavigationStyled, HeaderWithBorder } from "../components/header";
import { selectCommentAction } from "./actions/selected-comments-actions";

function HomePage() {
  const [value, setValue] = useState<number>(0);
  const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
  const comments = useTypedSelector((state) => state.data.comments);
  let history = useHistory();

  if (comments === [] || comments.length === 0) {
    return <>Loading....</>;
  }

  return (
    <main>
      <HeaderWithBorder>
        <BottomNavigationStyled
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Homepage" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Selected comments"
            icon={<FolderIcon />}
            onClick={() => history.push("/selected")}
          />
          <BottomNavigationAction
            label="Add comment"
            icon={<MessageIcon />}
            onClick={() => history.push("/add")}
          />
        </BottomNavigationStyled>
      </HeaderWithBorder>
      <TableComponent
        rows={comments}
        homePageTable={true}
        action={selectCommentAction}
      />
    </main>
  );
}

export default HomePage;
