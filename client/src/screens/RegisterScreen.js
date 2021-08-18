import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userAction";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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
    if (confirmPassword !== password) {
      setPasswordMessage("Password doesn't match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="form-container">
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {passwordMessage && <Message variant="danger">{passwordMessage}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            onChange={e => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Enter your Name"
            required
          />
        </div>
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
        <div className="form-control">
          <input
            type="password"
            onChange={e => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" className="form btn">
          Sign Up
        </button>
        <div>
          <p>
            Already have an account ? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
