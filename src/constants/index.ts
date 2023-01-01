export const EXPENSE_TYPE = {
  activity: "ACTIVITY",
  drink: "DRINK",
  flight: "FLIGHT",
  food: "FOOD",
  hotel: "HOTEL",
  other: "OTHER",
  shopping: "SHOPPING",
  transport: "TRANSPORT",
};

export const EXPENSE_PAYMENT = {
  cash: "CASH",
  card: "CARD",
};

export const EXPENSE_COLORS = {
  activity: "#B9A394",
  drink: "#3f51b5",
  flight: "#0073c6",
  food: "#E15554",
  hotel: "#E8C547",
  other: "#E2B6CF",
  shopping: "#14CC60",
  transport: "#1098F7",
};

export const BASE_COLORS = {
  primary: "#5377F0",
  primary_hover: "#728ff2",
  primary_active: "#096dd9",
}

export const MAPPED_COLORS_BY_TYPE = {
  [EXPENSE_TYPE.activity]: EXPENSE_COLORS.activity,
  [EXPENSE_TYPE.drink]: EXPENSE_COLORS.drink,
  [EXPENSE_TYPE.flight]: EXPENSE_COLORS.flight,
  [EXPENSE_TYPE.food]: EXPENSE_COLORS.food,
  [EXPENSE_TYPE.hotel]: EXPENSE_COLORS.hotel,
  [EXPENSE_TYPE.other]: EXPENSE_COLORS.other,
  [EXPENSE_TYPE.shopping]: EXPENSE_COLORS.shopping,
  [EXPENSE_TYPE.transport]: EXPENSE_COLORS.transport,
}

export const DATE_FORMAT = "dd-MM-yyyy";

export const CDN_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_CDN_URL;

export const APP_NAME = "Travel Wallet";

export const CHART_FILTER = {
  category: "category",
  country: "country",
  payment: "payment",
}

export const COUNTRY_FLAG_API_URL = 'https://countryflagsapi.com/png/'