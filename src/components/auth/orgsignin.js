import { ReactComponent as LoginSvg } from "../../assets/svg/login.svg";
import "../../assets/css/login.css";
import Input from "../Input";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
const orgsignin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
      <div className="auth--content">
        <h1 className="title">Log in</h1>
        {error && (
          <div className="error--message" role="alert">
            {error}
          </div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="wrapper">
            <Input type="email" ref={emailRef} name="Email" icon="email" />
            <Input type="password" ref={passwordRef} name="Password" icon="password" />
          </div>
          <div className="wrapper">
            <button type="submit" className="btn" disabled={loading}>
              Log in
            </button>
          </div>
        </form>
        <div className="link-text">
          Need an account? <Link to="/orgsignup">Sign up</Link>
        </div>
      </div>
  );
};

export default orgsignin;