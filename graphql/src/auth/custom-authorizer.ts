import * as jwt from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import axios from 'axios'

const region = process.env.AWS_REGION
const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID

export const handler = async (event) => {

  const token = event.headers.Authorization

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
  const res: any = jwt.verify(token, pem)

  return { user: res.username }
}
