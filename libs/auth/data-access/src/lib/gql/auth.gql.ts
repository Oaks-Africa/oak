import { gql } from 'apollo-angular';

export const SIGN_IN_VIA_EMAIL = gql`
  mutation SignInViaEmail($signInViaEmailInput: SignInViaEmailInput!) {
    signInViaEmail(signInViaEmailInput: $signInViaEmailInput) {
      user {
        id
        profile {
          name {
            first
            last
            other
          }
        }
        lastSignIn
        createdAt
        email
        updatedAt
      }
    }
  }
`;
