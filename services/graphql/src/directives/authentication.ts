import axios from 'axios'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import * as jwt from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import { ResolverContext } from '..'
import { shared } from '@ticket-swap-app/config/src/global-config'

const region = shared.region
const userPoolId = shared.AWS_COGNITO_USER_POOL_ID

interface RawAuthResponse {
  sub: string
  aud: string
  email_verified: boolean
  event_id: string
  token_use: 'id'
  auth_time: number
  iss: string
  'cognito:username': string
  exp: number
  iat: number
  email?: string
  username: string // email
}

const authenticationChecker = async (
  token?: string
): Promise<ResolverContext['user']> => {
  if (!token) throw new Error('login required')

  const [, jwtToken] = token.split('Bearer ')

  if (!jwtToken) throw new Error('invalid token format')

  const decoded: any = jwt.decode(jwtToken, { complete: true })

  const kid = decoded.header.kid

  const jwks: any[] = await axios
    .get(
      `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    )
    .then(({ data }) => data.keys)

  const matchedIndex = jwks.findIndex(key => key.kid === kid)

  const jwk = jwks[matchedIndex]

  if (!jwk) throw new Error('invalid token')

  const pem = jwkToPem(jwk)
  const res = jwt.verify(jwtToken, pem) as RawAuthResponse

  return { email: res.username }
}

export class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, ResolverContext>) {
    const resolve = field.resolve || defaultFieldResolver
    field.resolve = async (source, args, context, info) => {
      const user = await authenticationChecker(context.authorization)
      console.log({ user })
      const res = await resolve.apply(this, [
        source,
        args,
        { ...context, user },
        info
      ])
      return res
    }
  }
}
