import { Input, Button } from "../ui";
import { useFilePreview } from "../../hooks";
import { useCreateUser } from "../../api/UserApi";
import { useForm } from "react-hook-form";
import {
  addProfilePhotoSchema,
  AddProfileType,
  CreateUserForm as CreateUserT,
} from "../../form-validation";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  className?: string;
  goBack: () => void;
  user: Partial<CreateUserT>;
};

export default function AddProfilePhoto({ className, goBack, user }: Props) {
  const { file, fileUrl, handleFileChange } = useFilePreview();
  const { createUser, isPending } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: {
      errors: { avatar },
    },
  } = useForm<AddProfileType>({
    resolver: zodResolver(addProfilePhotoSchema),
  });

  async function handleFinish() {
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key as keyof CreateUserT] as string);
    });
    if (file) {
      formData.append("avatar", file);
    }
    if (avatar && avatar.message) {
      return;
    }

    await createUser(formData);
  }
  function handleBack() {
    goBack();
  }
  return (
    <form
      onSubmit={handleSubmit(handleFinish)}
      className={`h-screen ${className}`}
    >
      <h2 className="dark:text-slate-200 text-xl mb-6">
        Add Your Profile Photo or Skip it to upload later.
      </h2>
      <div className="flex justify-center mb-4">
        <div className="border-2 border-dashed w-40 h-40 rounded-md">
          {fileUrl && <img className="w-full h-full" src={fileUrl} />}
        </div>
      </div>
      <div className="flex gap-2 lg:w-3/6 mx-auto">
        <Input
          type="file"
          {...register("avatar")}
          onChange={handleFileChange}
          errorMessage={avatar?.message}
        />
      </div>
      <div className="flex gap-4 justify-between mt-4">
        <Button classname="w-24" category="normal" onClick={handleBack}>
          Back
        </Button>
        <Button
          classname=""
          category="success"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "In progess..." : "Finish"}
        </Button>
      </div>
    </form>
  );
}
