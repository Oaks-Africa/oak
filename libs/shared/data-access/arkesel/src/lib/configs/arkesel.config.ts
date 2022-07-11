export default () => ({
  baseUrl: process.env.ARKESEL_BASE_URL,
  apiKey: process.env.ARKESEL_API_KEY,
  senderId: process.env.ARKESEL_SENDER_ID,
  otp: {
    length: process.env.ARKESEL_OTP_LENGTH,
    expiry: process.env.ARKESEL_OTP_EXPIRY,
    generateOtpUrl: process.env.ARKESEL_OTP_GENERATE_OTP_URL,
    verifyOtpUrl: process.env.ARKESEL_OTP_VERIFY_OTP_URL,
  },
});
