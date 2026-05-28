import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import { ThemeProvider } from "./theme";
import "./i18next";
import "./assets/scss/App.scss";
import "./assets/less/variables.less";
import "moment/locale/th";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// Containers
const DefaultLayout = React.lazy(() => import("./contrainers/DefaultLayout"));
// Pages
const Login = React.lazy(() => import("./views/pages/Login"));
const ComingSoon = React.lazy(() => import("./views/pages/ComingSoon"));
const ChangePassword = React.lazy(() =>
  import("./views/pages/ChangePassword/ChangePassword")
);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/comingsoon"
                name="comingsoon"
                render={(props) => <ComingSoon {...props} />}
              />
              <Route
                exact
                path="/changepassword"
                name="changepassword"
                render={(props) => <ChangePassword {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={(props) => <DefaultLayout {...props} />}
              />
            </Switch>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
