import { client } from "./client";
const usersQuery = `
  query Users {
    users {
      id
      username
      email
    }
  }
`;

export const getUsers = async () => {
  const {
    data: { users },
  } = await client.query(usersQuery).toPromise();

  return users;
};
