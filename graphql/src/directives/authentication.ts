import { SchemaDirectiveVisitor } from "graphql-tools";
import { GraphQLField, defaultFieldResolver } from "graphql";
import { ResolverContext } from "..";
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';

const region = process.env.region
const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID

type RawAuthResponse = {
  sub: string,
  aud: string,
  email_verified: boolean,
  event_id: string,
  token_use: 'id',
  auth_time: number,
  iss: string,
  'cognito:username': string,
  exp: number,
  iat: number,
  email: string
}

const authenticationChecker = async (token?: string) => {
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
  return { user: { id: res.sub } }
}


export class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, ResolverContext>, ) {
    const resolve = field.resolve || defaultFieldResolver
    field.resolve = async (source, args, context, info) => {

      const user = await authenticationChecker(context.authorization)
      const res = await resolve.apply(this, [source, args, { ...context, user }, info])
      return res
    }
  }
}