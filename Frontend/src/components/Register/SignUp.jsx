import { Alert, Button, Snackbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
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
    <div className="bg-[#131419]">
      <div>
        <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-[30%] p-10 bg-black rounded-md shadow-lg ring-1 ">

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
              <h1 className="text-3xl font-semibold text-gray-200 pb-6 items-center text-center">
                Cipher Messaging
              </h1>
                <p className="mb-2 text-xl text-[#c7c7c7]">User Name</p>
                <input
                  placeholder="Enter username"
                  name="full_name"
                  type="text"
                  className="py-2 border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                  onChange={(e) => handleChange(e)}
                  value={inputData.full_name}
                />
              </div>
              <div>
                <p className="mb-2 text-xl text-[#c7c7c7]">Email</p>
                <input
                  placeholder="Enter email"
                  name="full_name"
                  type="text"
                  className="py-2 border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                  onChange={(e) => handleChange(e)}
                  value={inputData.email}
                />
              </div>
              <div>
                <p className="mb-2 text-xl text-[#c7c7c7]">Password</p>
                <input
                  placeholder="Enter your password"
                  name="full_name"
                  type="text"
                  className="py-2 border-gray-500 w-full rounded-md border transition duration-300 ease-in-out hover:border-blue-700 focus:outline-none hover:outline-thin focus:outline-thin bg-black"
                  onChange={(e) => handleChange(e)}
                  value={inputData.password}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  sx={{ padding: ".5rem 0rem" ,fontSize: "1.1rem" }}
                  variant="outlined"
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="flex space-x-3 items-center mt-5">
              <p className="text-white">Already have an Account?</p>
              <Button variant="text" sx={{ padding: ".5rem 0rem" ,fontSize: "1.1rem",borderRadius: '40px'  }}   onClick={() => navigate("/signin")}>
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
