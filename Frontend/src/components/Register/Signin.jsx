import { Alert, Button, Snackbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [openSbar, setOpenSbar] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSbar(true);
  };
  const handleChange = () => {};
  const handleSbarClose = () => {
    setOpenSbar(false);
  };
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 rounded-md shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <h1 className="text-3xl font-semibold text-gray-700 pb-6 items-center text-center">
                Cipher Messaging
              </h1>
              <p className="mb-2 text-xl">Email</p>
              <input
                placeholder="Enter email address..."
                type="text"
                className="py-2 outline-blue-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:border-blue-700 hover:outline-thin focus:outline-thin"
                onChange={handleChange}
                value={inputData.email}
              />
            </div>

            <div>
              <p className="mb-2 text-xl">Password</p>
              <input
                placeholder="Enter your password"
                type="text"
                className="py-2 outline-blue-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:border-blue-700 hover:outline-thin focus:outline-thin"
                onChange={handleChange}
                value={inputData.password}
              />
            </div>
            <div>
              <Button
                type="submit"
                sx={{ bgcolor: blue[700], padding: ".5rem 0rem" }}
                variant="contained"
                className="w-full"
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-5 ">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
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
          sx={{ width: "100%" }}
        >
          Login Successfull!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
