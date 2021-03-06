import { Container } from "react-bootstrap";

import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from "./Components/PrivateRoute";

//components
import { Signup } from "./Components/Signup";
import { Dashboard } from "./Components/Dashboard";
import { Login } from "./Components/Login";
import {ForgotPassword} from "./Components/ForgotPassword";
import { UpdateProfile } from "./Components/UpdateProfile";


function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{
      minHeight: "100vh"
    }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router >
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/" exact component={Dashboard}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
