export const appConfig = {
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_BACkEND_URL: import.meta.env.VITE_BACkEND_URL,
  EMAIL_VERIFICATION_EXPIRY_TIME: import.meta.env
    .VITE_EMAIL_VERIFICATION_EXPIRY_TIME,
};

console.log(appConfig);
