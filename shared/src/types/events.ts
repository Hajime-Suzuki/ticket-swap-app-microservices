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

// TODO: remove these
export type UserSignUpEventBody = EventHandlerBody<
  UserEventTypes,
  Pick<IUser, 'id' | 'email'>
>

export type TicketCreatedEventBody = EventHandlerBody<
  TicketEventTypes,
  ICreateTicketInput
>

export type EventCreatedEventBody = EventHandlerBody<
  EventEventTypes,
  ICreateEventInput & { id: IEvent['id'] }
>

// TODO: use these
export type TicketEventPayload<
  TKey extends TicketEventTypes
> = TKey extends 'ticketCreated' ? ICreateTicketInput : any

export type UserEventPayload<
  TKey extends UserEventTypes
> = TKey extends 'userSignUp' ? Pick<IUser, 'id' | 'email'> : any
