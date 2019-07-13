import * as jwt from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import axios from 'axios'
import { APIGatewayEvent } from 'aws-lambda';

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

export type AuthResponse = {
  user: Pick<RawAuthResponse, 'sub'> | null
}

export const authenticationChecker = async (event: APIGatewayEvent) => {
  const authHeader = event.headers.Authorization
  if (!authHeader) return { user: null }

  const [, token] = authHeader.split('Bearer ')
  if (!token) return { user: null }

  const decoded: any = jwt.decode(token, { complete: true })

  const kid = decoded.header.kid

  const jwks: any[] = await axios
    .get(
      `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    )
    .then(({ data }) => data.keys)

  const matchedIndex = jwks.findIndex(key => key.kid === kid)

  const jwk = jwks[matchedIndex]

  if (!jwk) return { user: null }

  const pem = jwkToPem(jwk)
  const res = jwt.verify(token, pem) as RawAuthResponse
  return { user: res.sub }
}


