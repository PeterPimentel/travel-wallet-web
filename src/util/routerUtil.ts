const ROUTES = {
  newExpense: "expense/new",
  overview: "overview",
  profile: "profile",
  signin: "/signin",
  signup: "/signup",
  landing: "/",
};

export const getLandingURL = (): string => ROUTES.landing;
export const getSignInURL = (): string => ROUTES.signin;
export const getSignUpURL = (): string => ROUTES.signup;
