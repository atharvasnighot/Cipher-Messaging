const HomePage = () => {
  return (
    <div className="relative">
      <div className=" w-full py-14 bg-[#39A7FF] "></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-6 left-6 w-full">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          <div className="w-full">
            <div>
              <div>
                <img className="rounded-full w-10 h-10 cursor-pointer " src="luffy.jpeg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default HomePage;
