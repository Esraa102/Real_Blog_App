import { OAuthGoogle } from ".";

const AuthForm = ({ register }) => {
  return (
    <form className="bg-glass w-full md:w-1/2 p-4 rounded-lg flex flex-col gap-4">
      {register && (
        <div className="field-container">
          <label htmlFor="name" className="label">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="username"
            placeholder="Your Username"
            className="form-input"
          />
          <p className="error"></p>
        </div>
      )}
      <div className="field-container">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email"
          className="form-input"
        />
        <p className="error"></p>
      </div>
      <div className="field-container">
        <label htmlFor="pass" className="label">
          Password
        </label>
        <input
          type="password"
          id="pass"
          name="password"
          placeholder="Your Password"
          className="form-input"
        />
        <p className="error"></p>
      </div>
      {register && (
        <div className="field-container">
          <label htmlFor="confirm" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm"
            name="confirmPassword"
            placeholder="Enter Your Password Again"
            className="form-input"
          />
          <p className="error"></p>
        </div>
      )}
      <div className="flex items-center gap-4 flex-col md:flex-row justify-between">
        <button type="submit" className="main-btn flex-1">
          {register ? "Create Account" : "Sign In"}
        </button>
        <span className="text-center">OR</span>
        <OAuthGoogle />
      </div>
    </form>
  );
};

export default AuthForm;
