import { useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(null);

  const handlePasswordMatch = () => {
    if (password !== cpassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handlePasswordMatch()) {
      return;
    }
    try {
      const response = await axios.post("/api/account/register", {
        username,
        email,
        password,
        cpassword,
      });
      window.location.href = "/login";
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <DefaultLayout title="Register" content="">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <form className="bg-light p-5 mb-5" onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal text-center">
                Create an Account
              </h1>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="username">Username*</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="email">Email*</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  minLength="8"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="password">Password*</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  placeholder="Confirm Password"
                  value={cpassword}
                  minLength="8"
                  required
                  onChange={(event) => setCPassword(event.target.value)}
                />
                <label htmlFor="cpassword">Confirm Password*</label>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg mt-5" type="submit">
                  Register
                </button>
              </div>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link href="/login" className="text-decoration-none">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}