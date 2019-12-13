import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type Auth = {
   __typename?: 'Auth',
  id: Scalars['String'],
  email: Scalars['String'],
  token: Scalars['String'],
  secret: Scalars['String'],
  created: Scalars['DateTime'],
};

export type Color = {
   __typename?: 'Color',
  id: Scalars['String'],
  hex?: Maybe<Scalars['String']>,
  ral?: Maybe<Scalars['String']>,
};

export type ColorInput = {
  hex?: Maybe<Scalars['String']>,
  ral?: Maybe<Scalars['String']>,
};


export type Edition = {
   __typename?: 'Edition',
  id: Scalars['String'],
  shortId: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
  suggestedPrice?: Maybe<Scalars['Int']>,
  cases?: Maybe<Array<Scalars['String']>>,
  colors?: Maybe<Array<Scalars['String']>>,
  plates?: Maybe<Array<Scalars['String']>>,
};

export type EditionInput = {
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
  suggestedPrice?: Maybe<Scalars['Int']>,
  cases?: Maybe<Array<Scalars['String']>>,
  colors?: Maybe<Array<Scalars['String']>>,
  plates?: Maybe<Array<Scalars['String']>>,
};

export type Follow = {
   __typename?: 'Follow',
  id: Scalars['String'],
  productId?: Maybe<Scalars['String']>,
  keyboard?: Maybe<Keyboard>,
  keyset?: Maybe<Keyset>,
};

export type FollowInput = {
  productId?: Maybe<Scalars['String']>,
};

export type JoinKeyboard = {
   __typename?: 'JoinKeyboard',
  id: Scalars['String'],
  keyboardId: Scalars['String'],
  caseChoice: Scalars['String'],
  plateChoice: Scalars['String'],
  layoutChoice: Scalars['String'],
  created: Scalars['DateTime'],
  keyboard?: Maybe<Keyboard>,
  user?: Maybe<User>,
};

export type JoinKeyboardInput = {
  caseChoice: Scalars['String'],
  plateChoice: Scalars['String'],
  layoutChoice: Scalars['String'],
};

export type JoinKeyset = {
   __typename?: 'JoinKeyset',
  id: Scalars['String'],
  keysetId: Scalars['String'],
  kits?: Maybe<Array<Scalars['String']>>,
  created: Scalars['DateTime'],
  keyset?: Maybe<Keyset>,
  user?: Maybe<User>,
};

export type JoinKeysetInput = {
  kits?: Maybe<Array<Scalars['String']>>,
};

export type Keyboard = {
   __typename?: 'Keyboard',
  angle?: Maybe<Scalars['String']>,
  announcement?: Maybe<Scalars['String']>,
  brand?: Maybe<Scalars['String']>,
  connector?: Maybe<Scalars['String']>,
  details?: Maybe<Array<Scalars['String']>>,
  editions?: Maybe<Array<Edition>>,
  firmware?: Maybe<Scalars['String']>,
  mount?: Maybe<Scalars['String']>,
  layouts?: Maybe<Array<Scalars['String']>>,
  pcb?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['String']>,
  support?: Maybe<Array<Scalars['String']>>,
  id: Scalars['String'],
  shortId: Scalars['String'],
  images600?: Maybe<Array<Scalars['String']>>,
  images800?: Maybe<Array<Scalars['String']>>,
  images1500?: Maybe<Array<Scalars['String']>>,
  imagesRaw?: Maybe<Array<Scalars['String']>>,
  created: Scalars['DateTime'],
  updated: Scalars['DateTime'],
  maker?: Maybe<User>,
  interestCheck?: Maybe<Scalars['Boolean']>,
  market?: Maybe<Scalars['Boolean']>,
  groupBuy?: Maybe<Scalars['Boolean']>,
  groupBuySoon?: Maybe<Scalars['Boolean']>,
  closed?: Maybe<Scalars['Boolean']>,
  joins?: Maybe<Array<JoinKeyboard>>,
  posts?: Maybe<Array<Post>>,
};

export type KeyboardInput = {
  angle?: Maybe<Scalars['String']>,
  brand?: Maybe<Scalars['String']>,
  connector?: Maybe<Scalars['String']>,
  details?: Maybe<Array<Scalars['String']>>,
  editions?: Maybe<Array<EditionInput>>,
  firmware?: Maybe<Scalars['String']>,
  mount?: Maybe<Scalars['String']>,
  layouts?: Maybe<Array<Scalars['String']>>,
  pcb?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['String']>,
  support?: Maybe<Array<Scalars['String']>>,
  interestCheck?: Maybe<Scalars['Boolean']>,
  groupBuy?: Maybe<Scalars['Boolean']>,
  groupBuySoon?: Maybe<Scalars['Boolean']>,
  market?: Maybe<Scalars['Boolean']>,
  closed?: Maybe<Scalars['Boolean']>,
};

export type Keyset = {
   __typename?: 'Keyset',
  id: Scalars['String'],
  shortId: Scalars['String'],
  name: Scalars['String'],
  profile: Scalars['String'],
  stem: Scalars['String'],
  kits?: Maybe<Array<Kit>>,
  colors?: Maybe<Array<Color>>,
  images600?: Maybe<Array<Scalars['String']>>,
  images800?: Maybe<Array<Scalars['String']>>,
  images1500?: Maybe<Array<Scalars['String']>>,
  imagesRaw?: Maybe<Array<Scalars['String']>>,
  details?: Maybe<Array<Scalars['String']>>,
  created: Scalars['DateTime'],
  updated: Scalars['DateTime'],
  maker?: Maybe<User>,
  joins?: Maybe<Array<JoinKeyset>>,
  interestCheck?: Maybe<Scalars['Boolean']>,
  market?: Maybe<Scalars['Boolean']>,
  groupBuy?: Maybe<Scalars['Boolean']>,
  groupBuySoon?: Maybe<Scalars['Boolean']>,
  closed?: Maybe<Scalars['Boolean']>,
};

export type KeysetInput = {
  name: Scalars['String'],
  profile: Scalars['String'],
  stem: Scalars['String'],
  kits: Array<KitInput>,
  colors: Array<ColorInput>,
  details: Array<Scalars['String']>,
  interestCheck?: Maybe<Scalars['Boolean']>,
  groupBuy?: Maybe<Scalars['Boolean']>,
  groupBuySoon?: Maybe<Scalars['Boolean']>,
  market?: Maybe<Scalars['Boolean']>,
  closed?: Maybe<Scalars['Boolean']>,
};

export type Kit = {
   __typename?: 'Kit',
  id: Scalars['String'],
  shortId: Scalars['String'],
  kit?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
  suggestedPrice?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type KitInput = {
  kit?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
  suggestedPrice?: Maybe<Scalars['Int']>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  logout: Scalars['Boolean'],
  revokeRefreshTokensForUser: Scalars['Boolean'],
  login: LoginResponse,
  signup: Scalars['Boolean'],
  banUser: Scalars['Boolean'],
  generateAuth: Scalars['Boolean'],
  deleteAuth: Scalars['Boolean'],
  makeKeyboard: Scalars['Boolean'],
  updateKeyboardStage: Scalars['Boolean'],
  updateKeyboard: Scalars['Boolean'],
  keyboardAnnouncement: Scalars['Boolean'],
  deleteKeyboard: Scalars['Boolean'],
  makeKeyset: Scalars['Boolean'],
  deleteKeyset: Scalars['Boolean'],
  deleteEdition: Scalars['Boolean'],
  voteKeyboardUp: Scalars['Boolean'],
  voteKeyboardDown: Scalars['Boolean'],
  deleteVote: Scalars['Boolean'],
  joinKeyboard: Scalars['Boolean'],
  deleteJoin: Scalars['Boolean'],
  joinKeyset: Scalars['Boolean'],
  deleteJoinKeyset: Scalars['Boolean'],
  createPost: Scalars['Boolean'],
  deletePost: Scalars['Boolean'],
  createFollow: Scalars['Boolean'],
  followKeyboard: Scalars['Boolean'],
  followKeyboardDelete: Scalars['Boolean'],
  followKeyset: Scalars['Boolean'],
  followKeysetDelete: Scalars['Boolean'],
  deleteFollow: Scalars['Boolean'],
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String']
};


export type MutationLoginArgs = {
  secret: Scalars['String'],
  email: Scalars['String']
};


export type MutationSignupArgs = {
  username: Scalars['String'],
  email: Scalars['String'],
  secret: Scalars['String']
};


export type MutationBanUserArgs = {
  id: Scalars['String']
};


export type MutationGenerateAuthArgs = {
  email: Scalars['String']
};


export type MutationDeleteAuthArgs = {
  id: Scalars['String']
};


export type MutationMakeKeyboardArgs = {
  images: Array<Scalars['Upload']>,
  data: KeyboardInput
};


export type MutationUpdateKeyboardStageArgs = {
  id: Scalars['String']
};


export type MutationUpdateKeyboardArgs = {
  data: KeyboardInput,
  id: Scalars['String']
};


export type MutationKeyboardAnnouncementArgs = {
  announcement: Scalars['String'],
  id: Scalars['String']
};


export type MutationDeleteKeyboardArgs = {
  id: Scalars['String']
};


export type MutationMakeKeysetArgs = {
  images: Array<Scalars['Upload']>,
  data: KeysetInput
};


export type MutationDeleteKeysetArgs = {
  id: Scalars['String']
};


export type MutationDeleteEditionArgs = {
  id: Scalars['String']
};


export type MutationVoteKeyboardUpArgs = {
  id: Scalars['String']
};


export type MutationVoteKeyboardDownArgs = {
  id: Scalars['String']
};


export type MutationDeleteVoteArgs = {
  id: Scalars['String']
};


export type MutationJoinKeyboardArgs = {
  data: JoinKeyboardInput,
  id: Scalars['String']
};


export type MutationDeleteJoinArgs = {
  id: Scalars['String']
};


export type MutationJoinKeysetArgs = {
  data: JoinKeysetInput,
  id: Scalars['String']
};


export type MutationDeleteJoinKeysetArgs = {
  id: Scalars['String']
};


export type MutationCreatePostArgs = {
  body: Scalars['String'],
  id: Scalars['String']
};


export type MutationDeletePostArgs = {
  id: Scalars['String']
};


export type MutationCreateFollowArgs = {
  id: Scalars['String']
};


export type MutationFollowKeyboardArgs = {
  id: Scalars['String']
};


export type MutationFollowKeyboardDeleteArgs = {
  id: Scalars['String']
};


export type MutationFollowKeysetArgs = {
  id: Scalars['String']
};


export type MutationFollowKeysetDeleteArgs = {
  id: Scalars['String']
};


export type MutationDeleteFollowArgs = {
  id: Scalars['String']
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['String'],
  body: Scalars['String'],
  created: Scalars['DateTime'],
  user: User,
};

export type Query = {
   __typename?: 'Query',
  bye: Scalars['String'],
  users: Array<User>,
  me?: Maybe<User>,
  auths: Array<Auth>,
  keyboards: Array<Keyboard>,
  keyboard: Keyboard,
  sortKeyboards: Array<Keyboard>,
  keysets: Array<Keyset>,
  keyset: Keyset,
  sortKeysets: Array<Keyset>,
  editions: Array<Edition>,
  votes: Array<Vote>,
  joinss: Array<JoinKeyboard>,
  keysetJoins: Array<JoinKeyset>,
  postss: Array<Post>,
  follows: Array<Follow>,
};


export type QueryKeyboardArgs = {
  shortId: Scalars['String']
};


export type QuerySortKeyboardsArgs = {
  where: SearchInput
};


export type QueryKeysetArgs = {
  shortId: Scalars['String']
};


export type QuerySortKeysetsArgs = {
  where: SearchInput
};

export type SearchInput = {
  interestCheck?: Maybe<Scalars['Boolean']>,
  market?: Maybe<Scalars['Boolean']>,
  groupBuy?: Maybe<Scalars['Boolean']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
  keyboards: Array<Keyboard>,
  votes: Array<Vote>,
  follows: Array<Follow>,
  keyboardjoins: Array<JoinKeyboard>,
  keysetjoins: Array<JoinKeyset>,
};

export type Vote = {
   __typename?: 'Vote',
  id: Scalars['String'],
  editionId: Scalars['String'],
  created: Scalars['DateTime'],
  expiration?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type AuthsQueryVariables = {};


export type AuthsQuery = (
  { __typename?: 'Query' }
  & { auths: Array<(
    { __typename?: 'Auth' }
    & Pick<Auth, 'id' | 'secret' | 'email'>
  )> }
);

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CreateFollowMutationVariables = {
  id: Scalars['String']
};


export type CreateFollowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createFollow'>
);

export type CreatePostMutationVariables = {
  id: Scalars['String'],
  body: Scalars['String']
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPost'>
);

export type FollowKeyboardMutationVariables = {
  id: Scalars['String']
};


export type FollowKeyboardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followKeyboard'>
);

export type FollowKeyboardDeleteMutationVariables = {
  id: Scalars['String']
};


export type FollowKeyboardDeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followKeyboardDelete'>
);

export type GenerateAuthMutationVariables = {
  email: Scalars['String']
};


export type GenerateAuthMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'generateAuth'>
);

export type JoinKeyboardMutationVariables = {
  id: Scalars['String'],
  data: JoinKeyboardInput
};


export type JoinKeyboardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinKeyboard'>
);

export type JoinKeysetMutationVariables = {
  id: Scalars['String'],
  data: JoinKeysetInput
};


export type JoinKeysetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinKeyset'>
);

export type KeyboardQueryVariables = {
  shortId: Scalars['String']
};


export type KeyboardQuery = (
  { __typename?: 'Query' }
  & { keyboard: (
    { __typename?: 'Keyboard' }
    & Pick<Keyboard, 'angle' | 'announcement' | 'brand' | 'closed' | 'connector' | 'details' | 'firmware' | 'groupBuy' | 'groupBuySoon' | 'id' | 'images1500' | 'interestCheck' | 'layouts' | 'market' | 'mount' | 'name' | 'pcb' | 'shortId' | 'size' | 'support'>
    & { editions: Maybe<Array<(
      { __typename?: 'Edition' }
      & Pick<Edition, 'id' | 'name' | 'price' | 'suggestedPrice' | 'cases' | 'plates'>
    )>>, posts: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'body'>
    )>> }
  ) }
);

export type KeyboardAnnouncementMutationVariables = {
  id: Scalars['String'],
  announcement: Scalars['String']
};


export type KeyboardAnnouncementMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'keyboardAnnouncement'>
);

export type KeyboardPostsQueryVariables = {
  shortId: Scalars['String']
};


export type KeyboardPostsQuery = (
  { __typename?: 'Query' }
  & { keyboard: (
    { __typename?: 'Keyboard' }
    & Pick<Keyboard, 'id' | 'shortId' | 'images600' | 'name'>
    & { posts: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'body' | 'created'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>> }
  ) }
);

export type KeyboardsQueryVariables = {};


export type KeyboardsQuery = (
  { __typename?: 'Query' }
  & { keyboards: Array<(
    { __typename?: 'Keyboard' }
    & Pick<Keyboard, 'id' | 'images600' | 'mount' | 'shortId' | 'size' | 'name'>
  )> }
);

export type KeysetQueryVariables = {
  shortId: Scalars['String']
};


export type KeysetQuery = (
  { __typename?: 'Query' }
  & { keyset: (
    { __typename?: 'Keyset' }
    & Pick<Keyset, 'created' | 'details' | 'id' | 'images1500' | 'name' | 'profile' | 'shortId' | 'stem' | 'interestCheck' | 'groupBuy' | 'groupBuySoon' | 'market' | 'closed'>
    & { colors: Maybe<Array<(
      { __typename?: 'Color' }
      & Pick<Color, 'id' | 'hex' | 'ral'>
    )>>, kits: Maybe<Array<(
      { __typename?: 'Kit' }
      & Pick<Kit, 'id' | 'kit' | 'name' | 'price'>
    )>>, joins: Maybe<Array<(
      { __typename?: 'JoinKeyset' }
      & Pick<JoinKeyset, 'id' | 'kits'>
    )>>, maker: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) }
);

export type KeysetsQueryVariables = {};


export type KeysetsQuery = (
  { __typename?: 'Query' }
  & { keysets: Array<(
    { __typename?: 'Keyset' }
    & Pick<Keyset, 'id' | 'shortId' | 'name' | 'profile' | 'images600'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  secret: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MakeKeyboardMutationVariables = {
  data: KeyboardInput,
  images: Array<Scalars['Upload']>
};


export type MakeKeyboardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'makeKeyboard'>
);

export type MakeKeysetMutationVariables = {
  data: KeysetInput,
  images: Array<Scalars['Upload']>
};


export type MakeKeysetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'makeKeyset'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
    & { keyboardjoins: Array<(
      { __typename?: 'JoinKeyboard' }
      & Pick<JoinKeyboard, 'id'>
    )>, follows: Array<(
      { __typename?: 'Follow' }
      & Pick<Follow, 'id' | 'productId'>
      & { keyboard: Maybe<(
        { __typename?: 'Keyboard' }
        & Pick<Keyboard, 'id'>
      )>, keyset: Maybe<(
        { __typename?: 'Keyset' }
        & Pick<Keyset, 'id'>
      )> }
    )> }
  )> }
);

export type SignupMutationVariables = {
  username: Scalars['String'],
  email: Scalars['String'],
  secret: Scalars['String']
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signup'>
);

export type SortKeyboardsQueryVariables = {
  where: SearchInput
};


export type SortKeyboardsQuery = (
  { __typename?: 'Query' }
  & { sortKeyboards: Array<(
    { __typename?: 'Keyboard' }
    & Pick<Keyboard, 'id' | 'shortId' | 'name' | 'mount' | 'size' | 'images600'>
  )> }
);

export type SortKeysetsQueryVariables = {
  where: SearchInput
};


export type SortKeysetsQuery = (
  { __typename?: 'Query' }
  & { sortKeysets: Array<(
    { __typename?: 'Keyset' }
    & Pick<Keyset, 'id' | 'shortId' | 'name' | 'profile' | 'images600'>
  )> }
);

export type UpdateKeyboardMutationVariables = {
  id: Scalars['String'],
  data: KeyboardInput
};


export type UpdateKeyboardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateKeyboard'>
);

export type UserDashboardQueryVariables = {};


export type UserDashboardQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
    & { keyboards: Array<(
      { __typename?: 'Keyboard' }
      & Pick<Keyboard, 'id' | 'shortId' | 'name' | 'interestCheck' | 'groupBuy' | 'groupBuySoon' | 'closed'>
      & { joins: Maybe<Array<(
        { __typename?: 'JoinKeyboard' }
        & Pick<JoinKeyboard, 'id'>
      )>> }
    )>, keyboardjoins: Array<(
      { __typename?: 'JoinKeyboard' }
      & Pick<JoinKeyboard, 'id'>
      & { keyboard: Maybe<(
        { __typename?: 'Keyboard' }
        & Pick<Keyboard, 'shortId' | 'id' | 'name'>
      )> }
    )>, follows: Array<(
      { __typename?: 'Follow' }
      & Pick<Follow, 'id'>
      & { keyboard: Maybe<(
        { __typename?: 'Keyboard' }
        & Pick<Keyboard, 'id' | 'name' | 'size' | 'mount' | 'shortId'>
      )> }
    )> }
  )> }
);

export type VoteKeyboardDownMutationVariables = {
  id: Scalars['String']
};


export type VoteKeyboardDownMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'voteKeyboardDown'>
);

export type VoteKeyboardUpMutationVariables = {
  id: Scalars['String']
};


export type VoteKeyboardUpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'voteKeyboardUp'>
);


export const AuthsDocument = gql`
    query auths {
  auths {
    id
    secret
    email
  }
}
    `;

/**
 * __useAuthsQuery__
 *
 * To run a query within a React component, call `useAuthsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthsQuery, AuthsQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthsQuery, AuthsQueryVariables>(AuthsDocument, baseOptions);
      }
export function useAuthsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthsQuery, AuthsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthsQuery, AuthsQueryVariables>(AuthsDocument, baseOptions);
        }
export type AuthsQueryHookResult = ReturnType<typeof useAuthsQuery>;
export type AuthsLazyQueryHookResult = ReturnType<typeof useAuthsLazyQuery>;
export type AuthsQueryResult = ApolloReactCommon.QueryResult<AuthsQuery, AuthsQueryVariables>;
export const ByeDocument = gql`
    query bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const CreateFollowDocument = gql`
    mutation createFollow($id: String!) {
  createFollow(id: $id)
}
    `;
export type CreateFollowMutationFn = ApolloReactCommon.MutationFunction<CreateFollowMutation, CreateFollowMutationVariables>;

/**
 * __useCreateFollowMutation__
 *
 * To run a mutation, you first call `useCreateFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFollowMutation, { data, loading, error }] = useCreateFollowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateFollowMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFollowMutation, CreateFollowMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFollowMutation, CreateFollowMutationVariables>(CreateFollowDocument, baseOptions);
      }
export type CreateFollowMutationHookResult = ReturnType<typeof useCreateFollowMutation>;
export type CreateFollowMutationResult = ApolloReactCommon.MutationResult<CreateFollowMutation>;
export type CreateFollowMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFollowMutation, CreateFollowMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($id: String!, $body: String!) {
  createPost(id: $id, body: $body)
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const FollowKeyboardDocument = gql`
    mutation followKeyboard($id: String!) {
  followKeyboard(id: $id)
}
    `;
export type FollowKeyboardMutationFn = ApolloReactCommon.MutationFunction<FollowKeyboardMutation, FollowKeyboardMutationVariables>;

/**
 * __useFollowKeyboardMutation__
 *
 * To run a mutation, you first call `useFollowKeyboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowKeyboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followKeyboardMutation, { data, loading, error }] = useFollowKeyboardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFollowKeyboardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowKeyboardMutation, FollowKeyboardMutationVariables>) {
        return ApolloReactHooks.useMutation<FollowKeyboardMutation, FollowKeyboardMutationVariables>(FollowKeyboardDocument, baseOptions);
      }
export type FollowKeyboardMutationHookResult = ReturnType<typeof useFollowKeyboardMutation>;
export type FollowKeyboardMutationResult = ApolloReactCommon.MutationResult<FollowKeyboardMutation>;
export type FollowKeyboardMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowKeyboardMutation, FollowKeyboardMutationVariables>;
export const FollowKeyboardDeleteDocument = gql`
    mutation followKeyboardDelete($id: String!) {
  followKeyboardDelete(id: $id)
}
    `;
export type FollowKeyboardDeleteMutationFn = ApolloReactCommon.MutationFunction<FollowKeyboardDeleteMutation, FollowKeyboardDeleteMutationVariables>;

/**
 * __useFollowKeyboardDeleteMutation__
 *
 * To run a mutation, you first call `useFollowKeyboardDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowKeyboardDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followKeyboardDeleteMutation, { data, loading, error }] = useFollowKeyboardDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFollowKeyboardDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowKeyboardDeleteMutation, FollowKeyboardDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<FollowKeyboardDeleteMutation, FollowKeyboardDeleteMutationVariables>(FollowKeyboardDeleteDocument, baseOptions);
      }
export type FollowKeyboardDeleteMutationHookResult = ReturnType<typeof useFollowKeyboardDeleteMutation>;
export type FollowKeyboardDeleteMutationResult = ApolloReactCommon.MutationResult<FollowKeyboardDeleteMutation>;
export type FollowKeyboardDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowKeyboardDeleteMutation, FollowKeyboardDeleteMutationVariables>;
export const GenerateAuthDocument = gql`
    mutation generateAuth($email: String!) {
  generateAuth(email: $email)
}
    `;
export type GenerateAuthMutationFn = ApolloReactCommon.MutationFunction<GenerateAuthMutation, GenerateAuthMutationVariables>;

/**
 * __useGenerateAuthMutation__
 *
 * To run a mutation, you first call `useGenerateAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAuthMutation, { data, loading, error }] = useGenerateAuthMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGenerateAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateAuthMutation, GenerateAuthMutationVariables>) {
        return ApolloReactHooks.useMutation<GenerateAuthMutation, GenerateAuthMutationVariables>(GenerateAuthDocument, baseOptions);
      }
export type GenerateAuthMutationHookResult = ReturnType<typeof useGenerateAuthMutation>;
export type GenerateAuthMutationResult = ApolloReactCommon.MutationResult<GenerateAuthMutation>;
export type GenerateAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateAuthMutation, GenerateAuthMutationVariables>;
export const JoinKeyboardDocument = gql`
    mutation joinKeyboard($id: String!, $data: JoinKeyboardInput!) {
  joinKeyboard(id: $id, data: $data)
}
    `;
export type JoinKeyboardMutationFn = ApolloReactCommon.MutationFunction<JoinKeyboardMutation, JoinKeyboardMutationVariables>;

/**
 * __useJoinKeyboardMutation__
 *
 * To run a mutation, you first call `useJoinKeyboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinKeyboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinKeyboardMutation, { data, loading, error }] = useJoinKeyboardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJoinKeyboardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinKeyboardMutation, JoinKeyboardMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinKeyboardMutation, JoinKeyboardMutationVariables>(JoinKeyboardDocument, baseOptions);
      }
export type JoinKeyboardMutationHookResult = ReturnType<typeof useJoinKeyboardMutation>;
export type JoinKeyboardMutationResult = ApolloReactCommon.MutationResult<JoinKeyboardMutation>;
export type JoinKeyboardMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinKeyboardMutation, JoinKeyboardMutationVariables>;
export const JoinKeysetDocument = gql`
    mutation joinKeyset($id: String!, $data: JoinKeysetInput!) {
  joinKeyset(id: $id, data: $data)
}
    `;
export type JoinKeysetMutationFn = ApolloReactCommon.MutationFunction<JoinKeysetMutation, JoinKeysetMutationVariables>;

/**
 * __useJoinKeysetMutation__
 *
 * To run a mutation, you first call `useJoinKeysetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinKeysetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinKeysetMutation, { data, loading, error }] = useJoinKeysetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJoinKeysetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinKeysetMutation, JoinKeysetMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinKeysetMutation, JoinKeysetMutationVariables>(JoinKeysetDocument, baseOptions);
      }
export type JoinKeysetMutationHookResult = ReturnType<typeof useJoinKeysetMutation>;
export type JoinKeysetMutationResult = ApolloReactCommon.MutationResult<JoinKeysetMutation>;
export type JoinKeysetMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinKeysetMutation, JoinKeysetMutationVariables>;
export const KeyboardDocument = gql`
    query Keyboard($shortId: String!) {
  keyboard(shortId: $shortId) {
    angle
    announcement
    brand
    closed
    connector
    editions {
      id
      name
      price
      suggestedPrice
      cases
      plates
    }
    details
    firmware
    groupBuy
    groupBuySoon
    id
    images1500
    interestCheck
    layouts
    market
    mount
    name
    pcb
    shortId
    size
    support
    posts {
      id
      body
    }
  }
}
    `;

/**
 * __useKeyboardQuery__
 *
 * To run a query within a React component, call `useKeyboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeyboardQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeyboardQuery({
 *   variables: {
 *      shortId: // value for 'shortId'
 *   },
 * });
 */
export function useKeyboardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeyboardQuery, KeyboardQueryVariables>) {
        return ApolloReactHooks.useQuery<KeyboardQuery, KeyboardQueryVariables>(KeyboardDocument, baseOptions);
      }
export function useKeyboardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeyboardQuery, KeyboardQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeyboardQuery, KeyboardQueryVariables>(KeyboardDocument, baseOptions);
        }
export type KeyboardQueryHookResult = ReturnType<typeof useKeyboardQuery>;
export type KeyboardLazyQueryHookResult = ReturnType<typeof useKeyboardLazyQuery>;
export type KeyboardQueryResult = ApolloReactCommon.QueryResult<KeyboardQuery, KeyboardQueryVariables>;
export const KeyboardAnnouncementDocument = gql`
    mutation keyboardAnnouncement($id: String!, $announcement: String!) {
  keyboardAnnouncement(id: $id, announcement: $announcement)
}
    `;
export type KeyboardAnnouncementMutationFn = ApolloReactCommon.MutationFunction<KeyboardAnnouncementMutation, KeyboardAnnouncementMutationVariables>;

/**
 * __useKeyboardAnnouncementMutation__
 *
 * To run a mutation, you first call `useKeyboardAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKeyboardAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [keyboardAnnouncementMutation, { data, loading, error }] = useKeyboardAnnouncementMutation({
 *   variables: {
 *      id: // value for 'id'
 *      announcement: // value for 'announcement'
 *   },
 * });
 */
export function useKeyboardAnnouncementMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<KeyboardAnnouncementMutation, KeyboardAnnouncementMutationVariables>) {
        return ApolloReactHooks.useMutation<KeyboardAnnouncementMutation, KeyboardAnnouncementMutationVariables>(KeyboardAnnouncementDocument, baseOptions);
      }
export type KeyboardAnnouncementMutationHookResult = ReturnType<typeof useKeyboardAnnouncementMutation>;
export type KeyboardAnnouncementMutationResult = ApolloReactCommon.MutationResult<KeyboardAnnouncementMutation>;
export type KeyboardAnnouncementMutationOptions = ApolloReactCommon.BaseMutationOptions<KeyboardAnnouncementMutation, KeyboardAnnouncementMutationVariables>;
export const KeyboardPostsDocument = gql`
    query keyboardPosts($shortId: String!) {
  keyboard(shortId: $shortId) {
    id
    shortId
    images600
    name
    posts {
      id
      body
      created
      user {
        username
      }
    }
  }
}
    `;

/**
 * __useKeyboardPostsQuery__
 *
 * To run a query within a React component, call `useKeyboardPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeyboardPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeyboardPostsQuery({
 *   variables: {
 *      shortId: // value for 'shortId'
 *   },
 * });
 */
export function useKeyboardPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeyboardPostsQuery, KeyboardPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeyboardPostsQuery, KeyboardPostsQueryVariables>(KeyboardPostsDocument, baseOptions);
      }
export function useKeyboardPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeyboardPostsQuery, KeyboardPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeyboardPostsQuery, KeyboardPostsQueryVariables>(KeyboardPostsDocument, baseOptions);
        }
export type KeyboardPostsQueryHookResult = ReturnType<typeof useKeyboardPostsQuery>;
export type KeyboardPostsLazyQueryHookResult = ReturnType<typeof useKeyboardPostsLazyQuery>;
export type KeyboardPostsQueryResult = ApolloReactCommon.QueryResult<KeyboardPostsQuery, KeyboardPostsQueryVariables>;
export const KeyboardsDocument = gql`
    query keyboards {
  keyboards {
    id
    images600
    mount
    shortId
    size
    name
  }
}
    `;

/**
 * __useKeyboardsQuery__
 *
 * To run a query within a React component, call `useKeyboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeyboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeyboardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useKeyboardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeyboardsQuery, KeyboardsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeyboardsQuery, KeyboardsQueryVariables>(KeyboardsDocument, baseOptions);
      }
export function useKeyboardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeyboardsQuery, KeyboardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeyboardsQuery, KeyboardsQueryVariables>(KeyboardsDocument, baseOptions);
        }
export type KeyboardsQueryHookResult = ReturnType<typeof useKeyboardsQuery>;
export type KeyboardsLazyQueryHookResult = ReturnType<typeof useKeyboardsLazyQuery>;
export type KeyboardsQueryResult = ApolloReactCommon.QueryResult<KeyboardsQuery, KeyboardsQueryVariables>;
export const KeysetDocument = gql`
    query keyset($shortId: String!) {
  keyset(shortId: $shortId) {
    colors {
      id
      hex
      ral
    }
    created
    details
    id
    images1500
    kits {
      id
      kit
      name
      price
    }
    joins {
      id
      kits
    }
    maker {
      username
    }
    name
    profile
    shortId
    stem
    interestCheck
    groupBuy
    groupBuySoon
    market
    closed
  }
}
    `;

/**
 * __useKeysetQuery__
 *
 * To run a query within a React component, call `useKeysetQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeysetQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeysetQuery({
 *   variables: {
 *      shortId: // value for 'shortId'
 *   },
 * });
 */
export function useKeysetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeysetQuery, KeysetQueryVariables>) {
        return ApolloReactHooks.useQuery<KeysetQuery, KeysetQueryVariables>(KeysetDocument, baseOptions);
      }
export function useKeysetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeysetQuery, KeysetQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeysetQuery, KeysetQueryVariables>(KeysetDocument, baseOptions);
        }
export type KeysetQueryHookResult = ReturnType<typeof useKeysetQuery>;
export type KeysetLazyQueryHookResult = ReturnType<typeof useKeysetLazyQuery>;
export type KeysetQueryResult = ApolloReactCommon.QueryResult<KeysetQuery, KeysetQueryVariables>;
export const KeysetsDocument = gql`
    query keysets {
  keysets {
    id
    shortId
    name
    profile
    images600
  }
}
    `;

/**
 * __useKeysetsQuery__
 *
 * To run a query within a React component, call `useKeysetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeysetsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeysetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useKeysetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeysetsQuery, KeysetsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeysetsQuery, KeysetsQueryVariables>(KeysetsDocument, baseOptions);
      }
export function useKeysetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeysetsQuery, KeysetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeysetsQuery, KeysetsQueryVariables>(KeysetsDocument, baseOptions);
        }
export type KeysetsQueryHookResult = ReturnType<typeof useKeysetsQuery>;
export type KeysetsLazyQueryHookResult = ReturnType<typeof useKeysetsLazyQuery>;
export type KeysetsQueryResult = ApolloReactCommon.QueryResult<KeysetsQuery, KeysetsQueryVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $secret: String!) {
  login(email: $email, secret: $secret) {
    accessToken
    user {
      id
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      secret: // value for 'secret'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MakeKeyboardDocument = gql`
    mutation makeKeyboard($data: KeyboardInput!, $images: [Upload!]!) {
  makeKeyboard(data: $data, images: $images)
}
    `;
export type MakeKeyboardMutationFn = ApolloReactCommon.MutationFunction<MakeKeyboardMutation, MakeKeyboardMutationVariables>;

/**
 * __useMakeKeyboardMutation__
 *
 * To run a mutation, you first call `useMakeKeyboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeKeyboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeKeyboardMutation, { data, loading, error }] = useMakeKeyboardMutation({
 *   variables: {
 *      data: // value for 'data'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useMakeKeyboardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MakeKeyboardMutation, MakeKeyboardMutationVariables>) {
        return ApolloReactHooks.useMutation<MakeKeyboardMutation, MakeKeyboardMutationVariables>(MakeKeyboardDocument, baseOptions);
      }
export type MakeKeyboardMutationHookResult = ReturnType<typeof useMakeKeyboardMutation>;
export type MakeKeyboardMutationResult = ApolloReactCommon.MutationResult<MakeKeyboardMutation>;
export type MakeKeyboardMutationOptions = ApolloReactCommon.BaseMutationOptions<MakeKeyboardMutation, MakeKeyboardMutationVariables>;
export const MakeKeysetDocument = gql`
    mutation makeKeyset($data: KeysetInput!, $images: [Upload!]!) {
  makeKeyset(data: $data, images: $images)
}
    `;
export type MakeKeysetMutationFn = ApolloReactCommon.MutationFunction<MakeKeysetMutation, MakeKeysetMutationVariables>;

/**
 * __useMakeKeysetMutation__
 *
 * To run a mutation, you first call `useMakeKeysetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeKeysetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeKeysetMutation, { data, loading, error }] = useMakeKeysetMutation({
 *   variables: {
 *      data: // value for 'data'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useMakeKeysetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MakeKeysetMutation, MakeKeysetMutationVariables>) {
        return ApolloReactHooks.useMutation<MakeKeysetMutation, MakeKeysetMutationVariables>(MakeKeysetDocument, baseOptions);
      }
export type MakeKeysetMutationHookResult = ReturnType<typeof useMakeKeysetMutation>;
export type MakeKeysetMutationResult = ApolloReactCommon.MutationResult<MakeKeysetMutation>;
export type MakeKeysetMutationOptions = ApolloReactCommon.BaseMutationOptions<MakeKeysetMutation, MakeKeysetMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    keyboardjoins {
      id
    }
    follows {
      id
      productId
      keyboard {
        id
      }
      keyset {
        id
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const SignupDocument = gql`
    mutation signup($username: String!, $email: String!, $secret: String!) {
  signup(username: $username, email: $email, secret: $secret)
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      secret: // value for 'secret'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SortKeyboardsDocument = gql`
    query sortKeyboards($where: SearchInput!) {
  sortKeyboards(where: $where) {
    id
    shortId
    name
    mount
    size
    images600
  }
}
    `;

/**
 * __useSortKeyboardsQuery__
 *
 * To run a query within a React component, call `useSortKeyboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSortKeyboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSortKeyboardsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSortKeyboardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SortKeyboardsQuery, SortKeyboardsQueryVariables>) {
        return ApolloReactHooks.useQuery<SortKeyboardsQuery, SortKeyboardsQueryVariables>(SortKeyboardsDocument, baseOptions);
      }
export function useSortKeyboardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SortKeyboardsQuery, SortKeyboardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SortKeyboardsQuery, SortKeyboardsQueryVariables>(SortKeyboardsDocument, baseOptions);
        }
export type SortKeyboardsQueryHookResult = ReturnType<typeof useSortKeyboardsQuery>;
export type SortKeyboardsLazyQueryHookResult = ReturnType<typeof useSortKeyboardsLazyQuery>;
export type SortKeyboardsQueryResult = ApolloReactCommon.QueryResult<SortKeyboardsQuery, SortKeyboardsQueryVariables>;
export const SortKeysetsDocument = gql`
    query sortKeysets($where: SearchInput!) {
  sortKeysets(where: $where) {
    id
    shortId
    name
    profile
    images600
  }
}
    `;

/**
 * __useSortKeysetsQuery__
 *
 * To run a query within a React component, call `useSortKeysetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSortKeysetsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSortKeysetsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSortKeysetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SortKeysetsQuery, SortKeysetsQueryVariables>) {
        return ApolloReactHooks.useQuery<SortKeysetsQuery, SortKeysetsQueryVariables>(SortKeysetsDocument, baseOptions);
      }
export function useSortKeysetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SortKeysetsQuery, SortKeysetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SortKeysetsQuery, SortKeysetsQueryVariables>(SortKeysetsDocument, baseOptions);
        }
export type SortKeysetsQueryHookResult = ReturnType<typeof useSortKeysetsQuery>;
export type SortKeysetsLazyQueryHookResult = ReturnType<typeof useSortKeysetsLazyQuery>;
export type SortKeysetsQueryResult = ApolloReactCommon.QueryResult<SortKeysetsQuery, SortKeysetsQueryVariables>;
export const UpdateKeyboardDocument = gql`
    mutation updateKeyboard($id: String!, $data: KeyboardInput!) {
  updateKeyboard(id: $id, data: $data)
}
    `;
export type UpdateKeyboardMutationFn = ApolloReactCommon.MutationFunction<UpdateKeyboardMutation, UpdateKeyboardMutationVariables>;

/**
 * __useUpdateKeyboardMutation__
 *
 * To run a mutation, you first call `useUpdateKeyboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKeyboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKeyboardMutation, { data, loading, error }] = useUpdateKeyboardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateKeyboardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateKeyboardMutation, UpdateKeyboardMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateKeyboardMutation, UpdateKeyboardMutationVariables>(UpdateKeyboardDocument, baseOptions);
      }
export type UpdateKeyboardMutationHookResult = ReturnType<typeof useUpdateKeyboardMutation>;
export type UpdateKeyboardMutationResult = ApolloReactCommon.MutationResult<UpdateKeyboardMutation>;
export type UpdateKeyboardMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateKeyboardMutation, UpdateKeyboardMutationVariables>;
export const UserDashboardDocument = gql`
    query userDashboard {
  me {
    id
    username
    email
    keyboards {
      id
      shortId
      name
      joins {
        id
      }
      interestCheck
      groupBuy
      groupBuySoon
      closed
    }
    keyboardjoins {
      id
      keyboard {
        shortId
        id
        name
      }
    }
    follows {
      id
      keyboard {
        id
        name
        size
        mount
        shortId
      }
    }
  }
}
    `;

/**
 * __useUserDashboardQuery__
 *
 * To run a query within a React component, call `useUserDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDashboardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserDashboardQuery, UserDashboardQueryVariables>) {
        return ApolloReactHooks.useQuery<UserDashboardQuery, UserDashboardQueryVariables>(UserDashboardDocument, baseOptions);
      }
export function useUserDashboardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserDashboardQuery, UserDashboardQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserDashboardQuery, UserDashboardQueryVariables>(UserDashboardDocument, baseOptions);
        }
export type UserDashboardQueryHookResult = ReturnType<typeof useUserDashboardQuery>;
export type UserDashboardLazyQueryHookResult = ReturnType<typeof useUserDashboardLazyQuery>;
export type UserDashboardQueryResult = ApolloReactCommon.QueryResult<UserDashboardQuery, UserDashboardQueryVariables>;
export const VoteKeyboardDownDocument = gql`
    mutation voteKeyboardDown($id: String!) {
  voteKeyboardDown(id: $id)
}
    `;
export type VoteKeyboardDownMutationFn = ApolloReactCommon.MutationFunction<VoteKeyboardDownMutation, VoteKeyboardDownMutationVariables>;

/**
 * __useVoteKeyboardDownMutation__
 *
 * To run a mutation, you first call `useVoteKeyboardDownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteKeyboardDownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteKeyboardDownMutation, { data, loading, error }] = useVoteKeyboardDownMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteKeyboardDownMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteKeyboardDownMutation, VoteKeyboardDownMutationVariables>) {
        return ApolloReactHooks.useMutation<VoteKeyboardDownMutation, VoteKeyboardDownMutationVariables>(VoteKeyboardDownDocument, baseOptions);
      }
export type VoteKeyboardDownMutationHookResult = ReturnType<typeof useVoteKeyboardDownMutation>;
export type VoteKeyboardDownMutationResult = ApolloReactCommon.MutationResult<VoteKeyboardDownMutation>;
export type VoteKeyboardDownMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteKeyboardDownMutation, VoteKeyboardDownMutationVariables>;
export const VoteKeyboardUpDocument = gql`
    mutation voteKeyboardUp($id: String!) {
  voteKeyboardUp(id: $id)
}
    `;
export type VoteKeyboardUpMutationFn = ApolloReactCommon.MutationFunction<VoteKeyboardUpMutation, VoteKeyboardUpMutationVariables>;

/**
 * __useVoteKeyboardUpMutation__
 *
 * To run a mutation, you first call `useVoteKeyboardUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteKeyboardUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteKeyboardUpMutation, { data, loading, error }] = useVoteKeyboardUpMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteKeyboardUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteKeyboardUpMutation, VoteKeyboardUpMutationVariables>) {
        return ApolloReactHooks.useMutation<VoteKeyboardUpMutation, VoteKeyboardUpMutationVariables>(VoteKeyboardUpDocument, baseOptions);
      }
export type VoteKeyboardUpMutationHookResult = ReturnType<typeof useVoteKeyboardUpMutation>;
export type VoteKeyboardUpMutationResult = ApolloReactCommon.MutationResult<VoteKeyboardUpMutation>;
export type VoteKeyboardUpMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteKeyboardUpMutation, VoteKeyboardUpMutationVariables>;