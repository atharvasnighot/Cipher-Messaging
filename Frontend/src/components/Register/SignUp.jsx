import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "./../../Redux/Auth/Action";

const SignUp = () => {
  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [openSbar, setOpenSbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSbar(true);
    console.log(inputData);
    dispatch(register(inputData));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };
  const handleSbarClose = () => {
    setOpenSbar(false);
  };

  return (
    <div className="bg-[#131419]">
      <div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div
            className="min-w-[30%] p-10 bg-black rounded-md "
            style={{
              boxShadow:
                "-15px -15px 20px  rgba(255, 255, 255, 0.05), 5px 5px 15px rgba(0, 0, 0, 0.5)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <p className="mb-2 text-xl text-[#fffcfc]">User Name</p>
                <input
                  placeholder="Enter username"
                  name="full_name"
                  type="text"
                  className="py-2 px-2 border-gray-500 text-white w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                  onChange={(e) => handleChange(e)}
                  value={inputData.full_name}
                />
              </div>
              <div>
                <p className="mb-2 text-xl text-[#fffcfc]">Email</p>
                <input
                  placeholder="Enter email"
                  name="email"
                  type="text"
                  className="py-2 px-2  text-white border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                  onChange={(e) => handleChange(e)}
                  value={inputData.email}
                />
              </div>
              <div>
                <p className="mb-2 text-xl text-[#fffcfc]">Password</p>
                <input
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  className="py-2 px-2 text-white border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                  onChange={(e) => handleChange(e)}
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
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="flex space-x-3 items-center mt-5 ">
              <p className="text-white">Already have an Account?</p>
              <Button
                variant="text"
                sx={{
                  padding: ".5rem 0rem",
                  fontSize: "1.1rem",
                  borderRadius: "40px",
                }}
                onClick={() => navigate("/signin")}
              >
                {" "}
                Sign In
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
            sx={{ width: "100%" }}
          >
            Your Account has been successfully created!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignUp;
