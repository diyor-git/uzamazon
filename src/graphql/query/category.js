import { gql } from "@apollo/client";

export const CATEGORY = gql`
query {
    products{
      result{
        name , id , price 
      }
    }
  }
`;
