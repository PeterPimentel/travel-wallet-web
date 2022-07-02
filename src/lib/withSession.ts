import { ROUTES } from "../constants";
import { session } from "../service/auth";
import { getToken } from "../service/token";

export function withSession(getServerSideCb) {
  return async (context) => {
    try {
      const token = getToken(context);
      const data = await session(token);

      const ctx = {
        ...context,
        req: {
          ...context.req,
          mySession: data,
        },
      };
      return getServerSideCb(ctx);
    } catch (error) {
      console.log("ERRROR", error);
      return {
        redirect: {
          permanent: false,
          destination: `${ROUTES.signin}`,
        },
      };
    }
  };
}
