import React from "react";
import { useDispatch } from "react-redux";
import { fetchComments } from "./app/screens/comments-actions";

function App() {
  const dispatch = useDispatch();
  dispatch(fetchComments());
  return <main>plain project</main>;
}

export default App;
