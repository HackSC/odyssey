import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';




const createJwtVerifierForEnv = envType => {
  const isDev = envType == 'development';

  // Remote resources owned by: saresend@usc.edu
  const devParams = {
      jwksUri: 'https://dev-l4sg3wav.auth0.com/.well-known/jwks.json',
      audience: 'https://localhost',
      issuer: 'https://dev-l4sg3wav.auth0.com',
  };

  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 50,
      jwksUri: isDev ? devParams.jwksUri : process.env.JWKS_URI,
    }),
    audience: isDev ? devParams.audience : process.env.AUDIENCE,
    issuer:  isDev ? devParams.issuer : process.env.ISSUER,
    algorithms: ['RS256'],
  })
};


export { createJwtVerifierForEnv };
