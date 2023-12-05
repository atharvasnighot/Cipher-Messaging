import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";

const Signin = () => {
  const [inputData, setInputData] = useState({ email: "", password: "",});
  const [openSbar, setOpenSbar] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const auth = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSbar(true);
    dispatch(login(inputData))
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };
  const handleSbarClose = () => {
    setOpenSbar(false);
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser]);

  return (
    <div className="bg-[#131419]">
      <div className="flex justify-center h-screen items-center b">
        <div
          className="min-w-[30%] p-10 bg-black rounded-md "
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
            </div>
            <div className=" w-[50%] mx-auto">
              <Button
                type="submit"
                sx={{
                  padding: ".5rem 0rem",
                  fontSize: "1.1rem",
                  borderRadius: "40px",
                }}
                variant="outlined"
                className="w-full"
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
        open={openSbar}
        autoHideDuration={3000}
        onClose={handleSbarClose}
      >
        <Alert
          onClose={handleSbarClose}
          severity="success"
          sx={{ width: "100%", fontSize: "1.1rem" }}
        >
          Login Successfull!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
