import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "../../src/lib/session";
import { signin } from "../../src/service/auth";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  try {
    const data = await signin(email, password);

    req.session.auth = data;
    await req.session.save();

    res.json(data);
  } catch (error) {
    throw error;
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
