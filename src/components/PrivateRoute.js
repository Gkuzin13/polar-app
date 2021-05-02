import { Redirect, Route } from "react-router";

const PrivateRoute = ({
  component: RouteComponent,
  postData,
  dispatch,
  manageLoader,
  loading,
  currentUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <RouteComponent
            {...routeProps}
            postData={postData}
            dispatch={dispatch}
            currentUser={currentUser}
            manageLoader={manageLoader}
            loading={loading}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
