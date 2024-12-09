import { Input, Button } from "../components/ui";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../api/UserApi";
import { useFilePreview } from "../hooks";
import { FormData as FData, User } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserProfileSchema } from "../form-validation";

export default function EditProfile() {
  const { user } = useOutletContext<{ user: User }>();
  const { isPending, updateUser } = useUpdateUser();
  const { fileUrl, handleFileChange } = useFilePreview(user?.avatar?.url);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: user,
    resolver: zodResolver(editUserProfileSchema),
  });
  const errors = formState.errors;

  function action(data: FData) {
    const formData = new FormData();
    const file = data.avatar?.[0];
    if (file) {
      formData.append("avatar", file);
    }
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("location", data?.location || "");
    formData.append("phoneNumber", data?.phoneNumber || "");
    updateUser(formData);
  }

  return (
    <section className="p-4  ">
      <div className="bg-white  dark:bg-zinc-800 p-4 rounded-md shadow-md">
        <h2
          id="formTitle"
          className="mb-4 text-2xl font-semibold dark:text-slate-200"
        >
          Profile
        </h2>

        <form
          onSubmit={handleSubmit(action)}
          aria-describedby="formTitle"
          method="post"
          encType="multipart/form-data"
        >
          <div className="w-full flex gap-3">
            <img className="w-40 h-36 rounded-md" src={fileUrl as string} />
            <div className="flex flex-col self-start gap-8">
              <h3 className="font-semibold text-xl dark:text-slate-200">
                Upload your profile Photo
              </h3>
              <Input
                label="Select an image File (Max 0.5MB)"
                type="file"
                className=""
                accept="image/*"
                {...register("avatar")}
                onChange={(e) => handleFileChange(e)}
                errorMessage={errors?.avatar?.message}
              />
            </div>
          </div>
          <div className="mt-4 w-full grid gap-4 lg:grid-cols-2">
            <Input
              label="Name"
              {...register("firstName")}
              errorMessage={errors?.firstName?.message}
            />
            <Input
              label="Last Name"
              errorMessage={errors?.lastName?.message}
              {...register("lastName")}
            />
            <Input
              type="email"
              label="Email"
              disabled={true}
              className="text-gray-400 cursor-not-allowed"
              defaultValue={user.email}
            />
            <Input
              label="Location"
              {...register("location")}
              errorMessage={errors?.location?.message}
            />

            <Input label="Phone Number" {...register("phoneNumber")} />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              category="success"
              classname="text-nowrap"
              loadingText={"loading"}
              loading={isPending}
            >
              Update User
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
