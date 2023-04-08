import { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../store/services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../../store/reducers/authReducer";
const AdminLogin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, response] = useAuthLoginMutation();
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    login(state);
  };

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("admin-token", response.data?.token);
      dispatch(setAdminToken(response.data?.token));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess]);
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form className="bg-black2 p-5 w-50 rounded" onSubmit={handleAdminLogin}>
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          signin
        </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}
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
            type="password"
            name="password"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            placeholder="Enter password..."
            value={state.password}
            onChange={handleInputs}
          />
        </div>
        <div className="mb-4">
          <input
            type="submit"
            value={response.isLoading ? "Loading..." : "sign in"}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
