const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const reducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case 'GOOD':
      const changedStateGood = {
        ...state,
        good: state.good + 1,
      };
      return changedStateGood;
    case 'OK':
      const changedStateOk = {
        ...state,
        ok: state.ok + 1,
      };
      return changedStateOk;
    case 'BAD':
      const changedStateBad = {
        ...state,
        bad: state.bad + 1,
      };
      return changedStateBad;
    case 'ZERO':
      const changedStateZero = {
        good: 0,
        ok: 0,
        bad: 0,
      };
      return changedStateZero;
    default:
      return state;
  }
};

export default reducer;
