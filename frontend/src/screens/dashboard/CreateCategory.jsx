import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useCreateMutation } from "../../store/services/categoryService";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saveCategory, data] = useCreateMutation();

  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];
  const submitCategory = (e) => {
    e.preventDefault();
    saveCategory({ name, description });
  };
  useEffect(() => {
    if (data?.isSuccess) {
      dispatch(setSuccess(data?.data?.msg));
      navigate("/dashboard/categories");
    }
  }, [data?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark">
          <i className="bi bi-arrow-left-short"> categories list</i>
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submitCategory}>
        <h3 className="text-lg capitalize mb-3">create category</h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">{error.msg}!</p>
            </div>
          ))}
        <div className="mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder="category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value={data.isLoading ? "loading..." : "create category"}
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
