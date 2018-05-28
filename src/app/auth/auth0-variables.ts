interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'dR7f9tlR4JqeWEo5meV8NsxyF2di1YiA',
  domain: 'csc-csc.auth0.com',
  callbackURL: 'http://cryptotracker-csc360.s3-website.us-east-2.amazonaws.com/dashboard'
};
