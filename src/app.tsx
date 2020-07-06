import React from "react";
import { useDispatch } from "react-redux";
import { fetchComments } from "./app/screens/actions/fetch-comments-actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./app/screens/home-page";
import AddComment from "./app/screens/add-comment";
import SelectedCommentsPage from "./app/screens/selected-comments-page";

function App() {
  const dispatch = useDispatch();
  dispatch(fetchComments());

  return (
    <Router>
      <main>
        <Switch>
          <Route
            path="/selected"
            render={() => {
              return <SelectedCommentsPage />;
            }}
          />{" "}
          <Route
            path="/add"
            render={() => {
              return <AddComment />;
            }}
          />
          <Route
            path="/"
            render={() => {
              return <HomePage />;
            }}
          />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
