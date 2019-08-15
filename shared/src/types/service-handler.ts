export interface HandlerEvent<TBody = any, TActionType = any> {
  body: {
    action: TActionType
    user?: { email: string }
    data: TBody
  }
}
