import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import {isDevEnvType } from './server';


const getDevParams = () => {
  // Remote resources owned by: saresend@usc.edu
  return  {
    jwksUri: 'https://dev-l4sg3wav.auth0.com/.well-known/jwks.json',
    audience: 'https://localhost',
    domain: 'https://dev-l4sg3wav.auth0.com',
    client_id: 'ICCkgINzCPDq66k7nuFmdrFwEjt2Uv8f',
  };
};

const createJwtVerifierForEnv = envType => {
  const isDev = isDevEnvType(envType);
  const devParams = getDevParams();

  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 50,
      jwksUri: isDev ? devParams.jwksUri : process.env.JWKS_URI,
    }),
    audience: isDev ? devParams.audience : process.env.AUDIENCE,
    issuer:  isDev ? devParams.issuer : process.env.DOMAIN,
    algorithms: ['RS256'],
  })
};


export { createJwtVerifierForEnv, getDevParams };
