import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "../../src/lib/session";
import { AuthApiResponse } from "../../src/types/ApiType";
import { User } from "../../src/types/CommonType";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<AuthApiResponse>
) {
  if (req.session.auth) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.auth,
    });
  } else {
    res.json({
      user: {
        email: "",
        username: "",
        id: 0,
      },
      token: "",
    });
  }
}
