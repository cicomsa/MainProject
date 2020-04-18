const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case "ADD_COPY":
      const index = state.findIndex(el => el[0] && el[0].id === payload[0].id)

      if (index !== -1) {
        return [
          ...state.slice(0, index),
          payload
        ]
      }

      return [...state, payload]
    default:
      return state;
  }
};

export default reducer