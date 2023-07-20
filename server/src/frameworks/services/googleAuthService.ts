import { OAuth2Client } from "google-auth-library";

import configKeys from "../../config";
const client = new OAuth2Client(configKeys.GOOGLE_AUTH_CLIENT);

export const googleAuthService = () => {
  const verify = async (token: string) => {
    console.log(token);
    const user = {
      firstName: "",
      lastName: "",
      email: "",
      // profilePic: "",
      isGoogleUser: true,
    };
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "761849749944-pi94r5hl0n2t0ql4q7n08hl2a212k386.apps.googleusercontent.com",
    });
    console.log(ticket);
    const payload = ticket.getPayload();
    console.log(payload);
    if (payload?.given_name && payload.email && payload.picture) {
      const nameParts = payload.given_name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = payload.email;
      // user.profilePic = payload.picture;
    }
    return user;
  };

  return {
    verify,
  };
};

export type GoogleAuthService = typeof googleAuthService;
