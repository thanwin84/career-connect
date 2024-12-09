import { useFormContext } from "react-hook-form";
import { Input } from "../components/ui";

type Props = {
  className?: string;
  name: string;
  placeholder?: string;
  label: string;
  type?: string;
};

export default function FormInput({
  className,
  name,
  placeholder,
  label,
  type = "text",
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      type={type}
      className={className}
      label={label}
      placeholder={placeholder}
      {...register(name)}
      errorMessage={errors[name]?.message as string}
    />
  );
}
