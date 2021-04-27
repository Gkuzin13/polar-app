import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../Auth";

const PrivateRoute = ({
  component: RouteComponent,
  postData,
  dispatch,
  manageLoader,
  loading,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext);

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
