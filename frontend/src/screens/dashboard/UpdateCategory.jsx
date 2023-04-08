import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { setSuccess } from "../../store/reducers/globalReducer";
import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";

const UpdateCategory = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isFetching } = useFetchCategoryQuery(id);

  const updateSubmit = (e) => {
    e.preventDefault();
    saveCategory({ name: state, id });
  };
  useEffect(() => {
    if (data?.category) {
      setState(data?.category?.name);
    }
  }, [data?.category]);
  const [saveCategory, response] = useUpdateCategoryMutation();
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
      navigate("/dashboard/categories");
    }
  }, [response?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark">
          <i className="bi bi-arrow-left-short"> categories list</i>
        </Link>
      </ScreenHeader>
      {!isFetching ? (
        <form className="w-full md:w-8/12" onSubmit={updateSubmit}>
          <h3 className="text-lg capitalize mb-3">update category</h3>
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
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input type="submit" value="update" className="btn-indigo" />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default UpdateCategory;
