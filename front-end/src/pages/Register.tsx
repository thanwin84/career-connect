import { useState } from "react";
import {
  CompleteSteps,
  CreateAccount,
  DescribeYourself,
  AddProfilePhoto,
} from "../components/create_account";
import useMultiStep from "../hooks/useMultiStep";
import { useAppContext } from "../contexts/AppProvider";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../form-validation";

type Props = {
  className?: string;
};

export default function Register({}: Props) {
  const [user, setUser] = useState<Partial<CreateUser>>({});
  const navigate = useNavigate();
  const {
    userStore: { state },
  } = useAppContext();
  if (state.user) {
    navigate("/");
  }
  function updateUser(values: Partial<CreateUser>) {
    setUser((prev) => ({ ...prev, ...values }));
  }
  console.log(user);

  const { step, steps, currentStep, next, back } = useMultiStep([
    <CreateAccount next={() => next()} setUser={updateUser} user={user} />,
    <DescribeYourself
      next={() => next()}
      goBack={() => back()}
      setUser={updateUser}
      user={user}
    />,
    <AddProfilePhoto goBack={() => back()} user={user} />,
  ]);

  const titles = ["Create Account", "Describe yourself", "Add Profile Photo"];

  return (
    <main className="w-full bg-slate-50 dark:bg-zinc-900 ">
      <div className="lg:w-4/6 w-5/6  mx-auto">
        <CompleteSteps
          className=" mx-auto pt-6"
          totalSteps={steps.length}
          currentStep={currentStep}
          titles={titles}
        />
        <div className="mx-auto pb-6">{step}</div>
      </div>
    </main>
  );
}
