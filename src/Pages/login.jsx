import {
  useLoaderData,
  //useNavigate,
  useNavigation,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { loginUser } from "../Api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  console.log(pathname);
  try {
    const response = redirect(pathname);
    response.body = true; // It's silly, but it works
    const data = await loginUser({ email, password });
    window.localStorage.setItem("isLoggedIn", true);
    return response;
    // return redirect("/host");
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  /* const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  }); */
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();
  // const [status, setStatus] = useState("idle");
  /* function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    //serError(null);
    loginUser(loginFormData)
      .then((data) => console.log(data))
      //.catch((err) => serError(err))
      .finally(() => setStatus("idle"));
  } */

  /* function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  } */

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      <Form method="post" className="login-form" replace>
        <input
          name="email"
          //onChange={handleChange}
          type="email"
          placeholder="Email address"
          //value={loginFormData.email}
        />
        <input
          name="password"
          //onChange={handleChange}
          type="password"
          placeholder="Password"
          //value={loginFormData.password}
        />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
