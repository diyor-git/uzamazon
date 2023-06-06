import { gql } from "@apollo/client";

const id = localStorage.getItem("userId");

export const USER_INFO = gql`
query {
  user(id: "${id}") {
    id
    firstName
    lastName
    dob
    gender
    phoneNumber
    email
  }
}
`;
