import { IUser } from '@ticket-swap-app/gql/src/generated/graphql'

export type UserSignUpEventPayload = Pick<IUser, 'id' | 'email'>
