import { useState, useEffect } from "react";
import { useAuthSignUpMutation } from "../../store/services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../../store/reducers/authReducer";
const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    name: "",
  });
  const [success, setSuccess] = useState("");

  const [register, response] = useAuthSignUpMutation();
  //   console.log(response?.data?.msg);
  let errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setState({});
    register(state);
    setTimeout(() => {
      errors = {};
    }, 4000);
  };

  useEffect(() => {
    if (response?.isSuccess) {
      setSuccess(response?.data?.msg);
      setState({
        email: "",
        name: "",
      });
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    }
  }, [response?.isSuccess]);
  // useEffect(() => {
  //   if (errors) {
  //     setState({});
  //     setTimeout(() => {
  //       errors = {};
  //     }, 4000);
  //   }
  // }, [errors]);
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-black2 p-5 w-50 rounded" onSubmit={handleSignup}>
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          signup
        </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}
        {
          success && (
            //   errors.map((error, key) => (
            <div>
              <p className="alert-success">{success}</p>
            </div>
          )
          //   ))
        }
        <div className="mb-4 mt-4">
          <input
            type="text"
            name="name"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            placeholder="Enter name..."
            value={state.name}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="email"
            name="email"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            placeholder="Enter email..."
            value={state.email}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-4">
          <input
            type="submit"
            value={response.isLoading ? "Loading..." : "sign up"}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
