const initialState = {
  contacts: [{
    name: 'Vic Henry',
    age: 30
  }]
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_CONTACT":
      return Object.assign({}, state, {
        contacts: [...state.contacts, action.payload]
      });
    default:
      return state;
  }
};

export default {
  contactReducer
}