import { gql } from "@apollo/client";
export const LOGIN = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      success
      errors
      user {
        id
        email
        dob
        gender
        phoneNumber
        lastName
        firstName
      }
    }
  }
`;
