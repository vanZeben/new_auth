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
      clientId: process.env.QUOTECH_ID,
      clientSecret: process.env.QUOTECH_SECRET,
      profile: (profile, tokens) => {
        console.log(profile, tokens);
        return {
          id: tokens.idToken,
          token: tokens.idToken,
        };
      },
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
    async signin(user, account, profile) {
      console.log("user", user, account, profile);
      return true;
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log("here");
      console.log(token);
      console.log(user);
      console.log(account);
      console.log(profile);
      console.log(isNewUser);
      if (account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve(token);
    },
    async session(session, token) {
      console.log("here 2");
      console.log(session);
      console.log(token);
      return session;
    },
  },
});
