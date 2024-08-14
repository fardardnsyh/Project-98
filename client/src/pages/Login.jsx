import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: "" };
    if (data.password.length < 3) {
      errors.msg = "password is too short";
      return errors;
    }
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("logged in successfully");
      return redirect("/dashboard");
    } catch (error) {
      // toast.error(error?.response?.data?.msg);
      errors.msg = error?.response?.data?.msg;
      return errors;
    }
  };

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet ?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
