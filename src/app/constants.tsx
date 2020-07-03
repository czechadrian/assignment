export enum TFetchingStatus {
  Defined = "Defined",
  Initial = "Initial",
  Success = "Success",
  Failure = "Failure",
}

export const COMMENTS_LIMIT = 20;
export const URL_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
export const PARAMS_LIMIT = {
  params: { _limit: COMMENTS_LIMIT },
};
