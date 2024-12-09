import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "../../types";
import { Button, Input } from "../ui";
import { Password } from "../ui";
import { useForm } from "react-hook-form";
import {
  CreateUserForm as CreateUserT,
  PersonalInfo,
  personalInfoSchema,
} from "../../form-validation";

type Props = {
  className?: string;
  next: () => void;
  setUser: (data: PersonalInfo) => void;
  user: Partial<CreateUserT>;
};

export default function CreateAccount({
  next,
  setUser,
  className,
  user,
}: Props) {
  async function action(formData: FormData) {
    setUser(formData as PersonalInfo);
    next();
  }

  console.log(user);

  const { handleSubmit, formState, register } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: user,
  });
  return (
    <div
      className={`w-full   dark:bg-zinc-900  bg-white px-6 py-4 rounded-md mx-auto ${className}`}
    >
      <h2
        id="formTitle"
        className="text-xl text-slate-800 font-semibold dark:text-slate-100 py-4"
      >
        Create your account
      </h2>
      <form onSubmit={handleSubmit(action)} aria-labelledby="formTitle">
        <div className="flex flex-col gap-3">
          <Input
            label="First Name"
            placeholder="Enter your first Name"
            aria-required="true"
            {...register("firstName")}
            errorMessage={formState.errors?.firstName?.message}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            aria-required="true"
            {...register("lastName")}
            errorMessage={formState.errors?.lastName?.message}
          />
          <Input
            label="Location"
            placeholder="Enter your location"
            {...register("location")}
            errorMessage={formState.errors?.location?.message}
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            aria-required="true"
            {...register("email")}
            errorMessage={formState.errors?.email?.message}
          />
          <Password
            className="mb-4"
            errorMessage={formState.errors?.password?.message}
            aria-required="true"
            {...register("password")}
          />
          <Button classname="self-end">Next</Button>
        </div>
      </form>
    </div>
  );
}
