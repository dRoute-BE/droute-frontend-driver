export const selectUser = (state) => state.auth.user;  // ✅ Get user data
export const selectAuthloader = (state) => state.auth.loading;  // ✅ Get loader data
export const selectAuthErrorMessage = (state) => state.auth.errorMessage;  // ✅ Get errorMessage data
export const selectJourney = (state) => state.auth.journey;
