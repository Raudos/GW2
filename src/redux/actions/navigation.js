
export const navigate = ({ type, routeName, params }) => {
  return (dispatch, getState) => {
    dispatch({
      type,
      data: {
        routeName,
        params
      }
    });
  };
};
