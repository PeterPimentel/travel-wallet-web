import { getSession } from "../service/auth";
import { getToken } from "../service/token";
import { getSignInURL } from "../util";

export function withSession(getServerSideCb) {
  return async (context) => {
    try {
      const token = getToken(context);
      const data = await getSession(token)("");

      const ctx = {
        ...context,
        req: {
          ...context.req,
          session: data,
        },
      };
      return getServerSideCb(ctx);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: getSignInURL(),
        },
      };
    }
  };
}
