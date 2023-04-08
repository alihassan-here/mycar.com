import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Colors from "../../components/Colors";
import ImagesPreview from "./ImagesPreview";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import productService, {
  useCreateProductMutation,
} from "../../store/services/productService";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  const [state, setState] = useState({
    make: "",
    year: 0,
    mileage: 0,
    price: 0,
    registerationNo: "",
    description: "",
    category: "",
    color: [],
    image: "",
    model: "",
  });
  const [preview, setPreview] = useState({
    image: "",
  });
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveColors = (color) => {
    const filtered = state.color.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      color: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [createNewProduct, response] = useCreateProductMutation();
  const createProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    // formData.append("sizes", JSON.stringify(sizeList));
    formData.append("description", value);
    formData.append("image", state.image);
    createNewProduct(formData);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors]);

  console.log(response);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
      dispatch(productService.util.resetApiState());
    }
  }, [response?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"> Products list</i>
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex flex-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createProduct}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">
                Make
              </label>
              <input
                type="text"
                name="make"
                id="make"
                className="form-control"
                placeholder="make..."
                onChange={handleInput}
                value={state.make}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">
                Registeration No.
              </label>
              <input
                type="text"
                name="registerationNo"
                id="registerationNo"
                className="form-control"
                placeholder="reg no..."
                onChange={handleInput}
                value={state.registerationNo}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">
                Model
              </label>
              <input
                type="text"
                name="model"
                id="model"
                className="form-control"
                placeholder="model..."
                onChange={handleInput}
                value={state.model}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="price" className="label">
                price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                placeholder="price..."
                onChange={handleInput}
                value={state.price}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="discount" className="label">
                Mileage
              </label>
              <input
                type="number"
                name="mileage"
                id="mileage"
                className="form-control"
                placeholder="mileage..."
                onChange={handleInput}
                value={state.mileage}
                min="0"
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="stock" className="label">
                Year
              </label>
              <input
                type="number"
                name="year"
                id="year"
                className="form-control"
                placeholder="year..."
                onChange={handleInput}
                value={state.year}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="categories" className="label">
                categories
              </label>
              {!isFetching ? (
                data?.categories?.length > 0 && (
                  <select
                    name="category"
                    id="categories"
                    className="form-control"
                    onChange={handleInput}
                    value={state.category}
                  >
                    <option value="">choose category</option>
                    {data.categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="colors">choose color</label>
              <TwitterPicker onChangeComplete={saveColors} />
            </div>
            {/* <div className="w-full p-3">
              <label htmlFor="sizes">choose sizes</label>
              {sizes.length > 0 && (
                <div className="flex flex-wrap -mx-3">
                  {sizes.map((size) => (
                    <div
                      className="size"
                      key={size.name}
                      onClick={() => chooseSize(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div> */}
            <div className="w-full p-3">
              <label htmlFor="image1" className="label">
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="description" className="label">
                Description
              </label>
              <ReactQuill
                id="description"
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="w-full p-3">
              <input
                className="btn btn-indigo"
                type="submit"
                value={response.isLoading ? "loading..." : "save product"}
                disabled={response.isLoading ? true : false}
              />
            </div>
          </div>
        </form>
        <div className="w-full xl:w-4/12 p-3">
          <Colors colors={state.color} deleteColor={deleteColor} />
          {/* <SizesList list={sizeList} deleteSize={deleteSize} /> */}
          <ImagesPreview url={preview.image} heading="image" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
