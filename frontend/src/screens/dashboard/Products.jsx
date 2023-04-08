import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper";
import productService, {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { success } = useSelector((state) => state.globalReducer);

  const { data = [], isFetching } = useGetProductsQuery(page);
  const [delProduct, response] = useDeleteProductMutation();
  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    if (window.confirm("Are you really want to delete this product?")) {
      delProduct(id);
    }
  };
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response.data.msg));
      dispatch(productService.util.resetApiState());
    }
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [response?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-product" className="btn-dark">
          create product<i className="bi bi-plus"></i>
        </Link>
        <Toaster position="top-right" />
      </ScreenHeader>
      {success && <div className="alert-success">{success}!</div>}
      {!isFetching ? (
        data?.cars?.length > 0 ? (
          <>
            <Table data={data?.cars} deleteProduct={deleteProduct} />
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
          </>
        ) : (
          "No products!"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
