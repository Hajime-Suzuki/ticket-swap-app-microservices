import {
  ICreateTicketInput,
  IUser
} from '@ticket-swap-app/gql/src/generated/graphql'

export type EventTypes = UserEventTypes | TicketEventTypes

export type UserEventTypes = 'userSignUp'
export type TicketEventTypes = 'ticketCreated'

export interface EventHandlerBody<TEventType extends EventTypes, TPayload> {
  type: TEventType
  payload: TPayload
}

export type UserSignUpEventBody = EventHandlerBody<
  UserEventTypes,
  Pick<IUser, 'id' | 'email'>
>

export type TicketCreatedEventBody = EventHandlerBody<
  TicketEventTypes,
  ICreateTicketInput
>
