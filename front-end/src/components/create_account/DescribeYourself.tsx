import { Button } from "../ui";
import { useForm } from "react-hook-form";
import FormError from "../ui/FormError";
import { FormData, UserRole } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DescribeYourself as DescribeT,
  describeYourselfSchema,
  CreateUser as CreateUserT,
} from "../../form-validation";
import { useState } from "react";

type Props = {
  className?: string;
  next: () => void;
  goBack: () => void;
  setUser: (values: { role: UserRole }) => void;
  user: Partial<CreateUserT>;
};
const options = [
  { text: "I'm a recruiter", value: "recruiter" },
  { text: "I'm a job seeker", value: "user" },
];

export default function DescribeYourself({
  className,
  next,
  goBack,
  setUser,
  user,
}: Props) {
  const { handleSubmit, formState, register } = useForm<DescribeT>({
    resolver: zodResolver(describeYourselfSchema),
    defaultValues: user,
  });
  const [selected, setSelected] = useState<UserRole>(user.role as UserRole);

  async function action(form: FormData) {
    next();
    setUser({ role: form.role });
  }

  return (
    <form
      onSubmit={handleSubmit(action)}
      className={`w-full h-screen ${className}`}
    >
      <h2 className="text-xl dark:text-slate-300 mb-6">
        What brings to Career Connect?
      </h2>
      <ul className="mb-1 flex flex-col">
        {options.map(({ text, value }) => (
          <label
            className={`py-2 px-4 text-lg border mb-4 rounded-md bg-white hover:border-1 hover:border-blue-300 cursor-pointer ${
              selected === value ? "border-2 border-blue-500" : ""
            } `}
            key={text}
          >
            <input
              value={value}
              {...register("role")}
              type="radio"
              className="hidden"
              onChange={() => setSelected(value as UserRole)}
            />
            {text}
          </label>
        ))}
      </ul>

      {formState.errors.role?.message && (
        <FormError
          className="ml-2 text-base"
          message={formState.errors.role?.message}
          id="user-type-error"
        />
      )}
      <div className="flex justify-between gap-4 mt-2">
        <Button
          type="button"
          classname="w-24"
          onClick={goBack}
          category="normal"
        >
          Back
        </Button>
        <Button disabled={!selected} type="submit" classname="w-24">
          Next
        </Button>
      </div>
    </form>
  );
}
