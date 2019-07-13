export interface HandlerEvent<TBody = any, TActionType = any> {
  body: {
    action: TActionType,
    data: TBody
  }
}
