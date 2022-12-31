export const BASE_ROUTES = {
  map: "map",
  newExpense: "expense/new",
  overview: "overview",
  profile: "profile",
  request: "request",
  signin: "signin",
  signup: "signup",
  travel: "travel",
};

export const getLandingURL = (): string => "/"

export const getSignInURL = (): string => `/${BASE_ROUTES.signin}`;

export const getSignUpURL = (): string => `/${BASE_ROUTES.signup}`;

export const getPasswordRequestURL = (): string => `/${BASE_ROUTES.request}`;

export const getTravelsURL = (): string => `/${BASE_ROUTES.travel}`;

export const getTravelURL = (id: string | number): string => `/${BASE_ROUTES.travel}/${id}`;

export const getTravelEditURL = (id: string | number): string => `/${BASE_ROUTES.travel}/edit/${id}`;

export const getTravelShareURL = (id: string | number): string => `/${BASE_ROUTES.travel}/share/${id}`;

export const getProfileURL = (): string => `/${BASE_ROUTES.profile}`;

export const getNewExpenseURL = (): string => `/${BASE_ROUTES.newExpense}`;

export const getOverviewURL = (): string => `/${BASE_ROUTES.overview}`;

export const getMapURL = (): string => `/${BASE_ROUTES.map}`;
