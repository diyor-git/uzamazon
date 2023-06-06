import { gql } from "@apollo/client";

export const REGISTRATION = gql`
  mutation register(
    $email: String!
    $lastName: String!
    $firstName: String!
    $dob: String!
    $gender: String!
    $phoneNumber: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      lastName: $lastName
      firstName: $firstName
      dob: $dob
      gender: $gender
      phoneNumber: $phoneNumber
      password1: $password1
      password2: $password2
    ) {
      success
      errors
    }
  }
`;
