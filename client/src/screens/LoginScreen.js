import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userAction";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const { userInfo, loading, error } = useSelector(state => state.login);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="form-container">
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="email"
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Enter your Password"
            required
          />
        </div>
        <button type="submit" className="form btn">
          Sign In
        </button>
        <div>
          <p>
            Dont have an account ? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
