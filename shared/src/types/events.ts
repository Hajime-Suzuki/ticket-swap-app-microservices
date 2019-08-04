import {
  ICreateTicketInput,
  IUser,
  ICreateEventInput,
  IEvent
} from '@ticket-swap-app/gql/src/generated/graphql'

export type EventTypes = UserEventTypes | TicketEventTypes | EventEventTypes

export type UserEventTypes = 'userSignUp'
export type TicketEventTypes = 'ticketCreated'
export type EventEventTypes = 'eventCreated'

export interface EventHandlerBody<TEventType extends EventTypes, TPayload> {
  type: TEventType
  payload: TPayload
}

export type UserSignUpEventBody = EventHandlerBody<
  UserEventTypes,
  Pick<IUser, 'id' | 'email' | 'username'>
>

export type TicketCreatedEventBody = EventHandlerBody<
  TicketEventTypes,
  ICreateTicketInput
>

export type EventCreatedEventBody = EventHandlerBody<
  EventEventTypes,
  ICreateEventInput & { id: IEvent['id'] }
>
