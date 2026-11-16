export const Base_Api_Url =
  process.env.NODE_ENV === "development"
    ? "https://www.api.dev.example.com"
    : "https://www.api.production.example.com";