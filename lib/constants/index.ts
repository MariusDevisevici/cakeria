export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Cakeria";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A local bakery for all your sweet cravings";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const SIGN_IN_DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const REGISTER_DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
