import * as jwt from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import axios from 'axios'

// not used for now
const region = process.env.region
const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID
// CustomAuthorizerHandler
export const handler = async (event) => {
  console.log({ event })

  const token = event.headers && event.headers.Authorization || event.authorizationToken

  if (!token) return {
    policyDocument: {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow",
          "Resource": "arn:aws:execute-api:eu-central-1:145578607479:rnyeog276i/*/*"
        }
      ]
    }
  }

  const decoded: any = jwt.decode(token, { complete: true })
  const kid = decoded.header.kid

  const jwks: any[] = await axios
    .get(
      `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    )
    .then(({ data }) => data.keys)

  const matchedIndex = jwks.findIndex(key => key.kid === kid)

  const jwk = jwks[matchedIndex]

  if (!jwk) return {
    policyDocument: {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow",
          "Resource": "arn:aws:execute-api:eu-central-1:145578607479:rnyeog276i/*/*"
        }
      ]
    }
  }

  const pem = jwkToPem(jwk)
  const res: any = jwt.verify(token, pem)
  console.log(res)
  return {
    policyDocument: {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow",
          "Resource": "arn:aws:execute-api:eu-central-1:145578607479:rnyeog276i/*/*"
        }
      ]
    }
  }
}
