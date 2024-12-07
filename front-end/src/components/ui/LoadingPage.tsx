import Spinner from "./Spinner";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner size="h-10 w-10" color="text-gray-600" />
    </div>
  );
};

export default LoadingPage;
