import {
  ConditionExpressionPredicate,
  SimpleConditionExpression
} from '@aws/dynamodb-expressions'

export interface GetExpressionArgs<TModel> {
  type: ConditionExpressionPredicate['type']
  object: any
  subject: keyof TModel
}
export const getFilterExpression = <TModel>({
  type,
  object,
  subject
}: GetExpressionArgs<TModel>) => {
  return {
    type,
    object,
    subject
  } as SimpleConditionExpression
}
