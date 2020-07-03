import { apiGet } from "./apiCall";
import { CommentsLimit } from "../app/constants";

export const getComments = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const params: any = { params: { _limit: CommentsLimit } };
  return apiGet(url, params);
};
