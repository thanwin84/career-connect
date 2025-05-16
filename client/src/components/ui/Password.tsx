import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import FormInput from '../forms/FormInput';

type Props = {
  className?: string;
};

const Password = ({ className }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  function handleClick() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={`flex items-center relative gap-3  ${className}`}>
      <FormInput
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="Enter your password"
        className=" focus:none pr-8"
        name="password"
      />
      <span
        className="absolute right-3 top-11 cursor-pointer dark:text-slate-300 my-auto"
        onClick={handleClick}
      >
        {showPassword ? <FaRegEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default Password;
