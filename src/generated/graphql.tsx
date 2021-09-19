import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Scalars["Boolean"]>;
  register?: Maybe<UserResponse>;
  login?: Maybe<UserResponse>;
  logout: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  updatePassword: UserResponse;
};

export type MutationCreatePostArgs = {
  title: Scalars["String"];
};

export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars["String"]>;
  id: Scalars["Float"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationUpdatePasswordArgs = {
  options: ResetPasswordInput;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Int"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  posts: Array<Post>;
  post?: Maybe<Post>;
  getUsers: Array<User>;
  me?: Maybe<User>;
};

export type QueryPostArgs = {
  id: Scalars["Float"];
};

export type RegisterInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
};

export type ResetPasswordInput = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  email: Scalars["String"];
  username: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CoreErrorFieldsFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type CoreUserFieldsFragment = {
  __typename?: "User";
  id: number;
  username: string;
};

export type RegularUserResponseFragment = {
  __typename?: "UserResponse";
  errors?: Maybe<
    Array<{ __typename?: "FieldError"; field: string; message: string }>
  >;
  user?: Maybe<{ __typename?: "User"; id: number; username: string }>;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginUserMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  login?: Maybe<{
    __typename?: "UserResponse";
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: "User"; id: number; username: string }>;
  }>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterUserMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterUserMutation = {
  __typename?: "Mutation";
  register?: Maybe<{
    __typename?: "UserResponse";
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: "User"; id: number; username: string }>;
  }>;
};

export type UpdatePasswordMutationVariables = Exact<{
  options: ResetPasswordInput;
}>;

export type UpdatePasswordMutation = {
  __typename?: "Mutation";
  updatePassword: {
    __typename?: "UserResponse";
    errors?: Maybe<
      Array<{ __typename?: "FieldError"; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: "User"; id: number; username: string }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: Maybe<{ __typename?: "User"; id: number; username: string }>;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostsQuery = {
  __typename?: "Query";
  posts: Array<{ __typename?: "Post"; title: string; id: number }>;
};

export const CoreErrorFieldsFragmentDoc = gql`
  fragment CoreErrorFields on FieldError {
    field
    message
  }
`;
export const CoreUserFieldsFragmentDoc = gql`
  fragment CoreUserFields on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...CoreErrorFields
    }
    user {
      ...CoreUserFields
    }
  }
  ${CoreErrorFieldsFragmentDoc}
  ${CoreUserFieldsFragmentDoc}
`;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginUserDocument = gql`
  mutation LoginUser($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument
  );
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterUserDocument = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    register(input: $registerInput) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument
  );
}
export const UpdatePasswordDocument = gql`
  mutation UpdatePassword($options: ResetPasswordInput!) {
    updatePassword(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UpdatePasswordDocument);
}
export const MeDocument = gql`
  query ME {
    me {
      ...CoreUserFields
    }
  }
  ${CoreUserFieldsFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const GetPostsDocument = gql`
  query GetPosts {
    posts {
      title
      id
    }
  }
`;

export function useGetPostsQuery(
  options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
}
