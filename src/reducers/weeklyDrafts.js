const reducer = (state = {category: '', values: []}, { type, payload }) => {
  switch (type) {
    case "ADD_COPY":
      return {...state, category: payload.category, values: payload.values}
    default:
      return state;
  }
};

export default reducer