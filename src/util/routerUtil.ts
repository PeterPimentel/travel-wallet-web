export const BASE_ROUTES = {
  newExpense: "expense/new",
  overview: "overview",
  profile: "profile",
  signin: "signin",
  signup: "signup",
  travel: "travel",
  request: "request",
};

export const getLandingURL = (): string => "/"

export const getSignInURL = (): string => `/${BASE_ROUTES.signin}`;

export const getSignUpURL = (): string => `/${BASE_ROUTES.signup}`;

export const getPasswordRequestURL = (): string => `/${BASE_ROUTES.request}`;

export const getTravelsURL = (): string => `/${BASE_ROUTES.travel}`;

export const getTravelURL = (id: string | number): string => `/${BASE_ROUTES.travel}/${id}`;

export const getProfileURL = (): string => `/${BASE_ROUTES.profile}`;

export const getNewExpenseURL = (): string => `/${BASE_ROUTES.newExpense}`;

export const getOverviewURL = (): string => `/${BASE_ROUTES.overview}`;
