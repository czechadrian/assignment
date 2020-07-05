import { apiGet } from "./api-call";
import { PARAMS_LIMIT, URL_COMMENTS } from "../app/constants";

export const getComments = () => {
  return apiGet(URL_COMMENTS, PARAMS_LIMIT);
};
