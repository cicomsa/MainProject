const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ADD_COPY":
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default reducer