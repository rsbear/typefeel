export let accessToken = "";
console.log("access token" + accessToken)

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken;
};