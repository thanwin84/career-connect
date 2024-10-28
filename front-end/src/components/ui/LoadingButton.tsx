import Spinner from "./Spinner";
type Props = {
  className?: string
  buttonText?: string
}
const LoadingButton = ({
    buttonText="loading...",
    className
}:Props) => {
  return (
    <button type="button" disabled={true} className={`bg-gray-500 w-full text-gray-300 px-4 py-2 rounded-md ${className}`}>
        {buttonText}
        <Spinner 
            color="text-gray-500" 
            size="h-4 w-4" 
            borderThickness="border-2"
            className="ml-2"
        />
    </button>
  );
};

export default LoadingButton;