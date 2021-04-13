const authReducer = (state, action) => {
  switch (action.type) {
    case "OTP_GENERATE":
      return action.payload;
    case "LOGOUT":
      return action.payload;

    default:
      return state;
  }
};

export default authReducer;
