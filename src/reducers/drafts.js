const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ADD_COPY":
      const payloadKey = Object.keys(payload)[0]
      if (Object.keys(state).includes(payloadKey)) {
        return {
          ...state,
          [payloadKey]: { ...state[payloadKey], ...payload[payloadKey] }
        }
      }

      return { ...state, ...payload }
    default:
      return state;
  }
};

export default reducer