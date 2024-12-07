import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Input } from "../ui";

type Props = {
  className?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Password = forwardRef<HTMLInputElement, Props>(
  ({ className, errorMessage, ...props }: Props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    function handleClick() {
      setShowPassword(!showPassword);
    }

    return (
      <div className={`flex items-center relative gap-3  ${className}`}>
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          className="border-none focus:none pr-8"
          errorMessage={errorMessage}
          {...props}
          ref={ref}
          aria-label="password"
        />
        <span
          className="absolute right-3 top-11 cursor-pointer dark:text-slate-300 my-auto"
          onClick={handleClick}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaEye />}
        </span>
      </div>
    );
  }
);

export default Password;
