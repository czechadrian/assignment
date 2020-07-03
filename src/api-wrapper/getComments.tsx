import { apiGet } from "./apiCall";
import {PARAMS_LIMIT, URL_COMMENTS} from "../app/constants";

export const getComments = () => {
  const url = URL_COMMENTS;
  return apiGet(url, PARAMS_LIMIT);
};
