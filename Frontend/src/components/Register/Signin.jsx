import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";
import { z } from "zod";
import Particles from './../Homepage/Particles';

const SignInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Signin = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});

  const [networkError, setNetworkError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenSnackbar(true);

    try {
      SignInSchema.parse(inputData);
      await dispatch(login(inputData, setNetworkError));
      setErrors({});
      setIncorrectPassword(false);
      setNetworkError(false); // Reset network error state on successful login
      setOpenSnackbar(false);
    } catch (error) {
      console.error("Login Error:", error);

      if (error.message === "Authentication failed") {
        setIncorrectPassword(true);
      } else if (error instanceof z.ZodError) {
        const errorMap = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errorMap[err.path.join(".")] = err.message;
          }
        });
        setErrors(errorMap);
      } else if (error.message === "Network error occurred") {
        setNetworkError(true);
        setOpenSnackbar(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
    
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser, navigate]);

  return (
    <>
    <Particles className="absolute inset-0 z-10" />
    <div className="relative bg-[#0a0a0a]">
      <div className="flex justify-center h-screen items-center ">
        <div
          className="min-w-[30%] p-10 bg-black rounded-md  z-10"
          style={{
            boxShadow:
              "-15px -15px 20px  rgba(255, 255, 255, 0.05), 5px 5px 15px rgba(0, 0, 0, 0.5)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5 ">
 
            <div>
              <div className="flex justify-center mb-3">
                <img
                  className="rounded-full w-[40px] h-[40px] cursor-pointer mr-6"
                  src="cipher.png"
                  alt=""
                />
                <h1 className="text-3xl font-semibold text-gray-200 pb-6 items-center text-center">
                  Cipher Messaging
                </h1>
              </div>
              <p className="mb-2 text-xl text-[#fffcfc]">Email</p>
              <input
                placeholder="Enter email address..."
                type="text"
                name="email"
                className="py-2 px-2 text-white border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                onChange={handleChange}
                value={inputData.email}
              />
              {errors.email && (
                <div className="text-red-600">{errors.email}</div>
              )}
            </div>

            <div>
              <p className="mb-2 text-xl text-[#fffcfc]">Password</p>
              <input
                placeholder="Enter your password"
                type="password"
                name="password"
                className="py-2 px-2 text-white border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                onChange={handleChange}
                value={inputData.password}
              />
              {errors.password && (
                <div className="text-red-600">{errors.password}</div>
              )}
            </div>
            <div className="w-[50%] mx-auto">
              <Button
                type="submit"
                sx={{
                  padding: ".5rem 0rem",
                  fontSize: "1.1rem",
                  borderRadius: "40px",
                }}
                variant="outlined"
                className="w-full"
                disabled={!inputData.email || !inputData.password}  
  
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-5 ">
            <p className="m-0 text-white">Create New Account</p>
            <Button
              variant="text"
              sx={{
                padding: ".5rem 0rem",
                fontSize: "1.1rem",
                borderRadius: "40px",
              }}
              onClick={() => navigate("/signup")}
            >
              {" "}
              Sign up
            </Button>
           
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            incorrectPassword || networkError ? "error" : "success"
          }
          sx={{ width: "100%", fontSize: "1.1rem" }}
        >
          {networkError
            ? "Network error occurred. Please try again later."
            : incorrectPassword
            ? "Incorrect email or password. Please try again."
            : "Login Successful!"}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
};

export default Signin;
