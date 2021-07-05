import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "quot-test",
      name: "quot-test",
      type: "oauth",
      version: "2.0",
      scope: "openid email",
      state: true,
      protection: "state",
      params: { grant_type: "authorization_code" },
      idToken: true,
      authorizationUrl:
        "http://localhost:9000/oauth2/authorize?response_type=code",
      accessTokenUrl: "http://localhost:9000/oauth2/token",
      requestTokenUrl: "http://localhost:9000/oauth2/jwks",
      clientId: process.env.QUOT_ID,
      clientSecret: process.env.QUOT_SECRET,
  
      profile: (profile, tokens) => ({
          id: tokens.idToken,
          token: tokens.idToken,
      }),
    },
  ],
  secret: process.env.SECRET,
  debug: true,
  session: {
    jwt: true,
    maxAge: 60 * 5,
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: false,
  },
  callbacks: {
    jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    session(session, token) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
});
