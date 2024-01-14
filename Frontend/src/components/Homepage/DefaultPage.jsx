const DefaultPage = () => {
  return (
    <div className="hidden md:flex max-w-max flex-col items-center justify-center h-full mx-20 text-white">
      <div className=" max-w-[50%] text-center">
        <img className="mx-auto " src="cipher.png" alt="" />
        <h1 className="text-4xl text-gray-400 ">Cipher Messaging</h1>
        <p className="my-9 text-xl">Send and recieve messages </p>
      </div>
    </div>
  );
};

export default DefaultPage;
