export default () => ({
  senderId: process.env.PHONE_NUMBER_VERIFICATION_SENDER_ID,
  length: process.env.PHONE_NUMBER_VERIFICATION_LENGTH,
  expiry: process.env.PHONE_NUMBER_VERIFICATION_EXPIRY,
  type: process.env.PHONE_NUMBER_VERIFICATION_TYPE,
  medium: process.env.PHONE_NUMBER_VERIFICATION_MEDIUM,
});
