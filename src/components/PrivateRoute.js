import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../Auth";

const PrivateRoute = ({
  component: RouteComponent,
  postData,
  dispatch,
  manageLoader,
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
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
