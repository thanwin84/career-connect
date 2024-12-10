import { useState } from "react";
import { Button, Input } from "../ui";
import { useForm } from "react-hook-form";
import { useSendCode, useVerifyCode } from "../../api/ThirdApi";
import { FormData } from "../../types";
import { useUserStore } from "../../store/userStore";

type Props = {
  moveToNextModal: () => void;
};

export default function EnterConfirmationCode({ moveToNextModal }: Props) {
  const userStore = useUserStore();
  const [sendCode, setSendCode] = useState(false);
  const [code, setCode] = useState("");
  const moveNext = code !== "";

  const { handleSubmit, register } = useForm();
  const { sendAuthCode, isPending: isSendPending } = useSendCode();
  const { verifyCode, isPending: isVerifyPending } = useVerifyCode();
  function sendVerificationCode() {
    const formObject = {
      channel: "sms",
      phoneNumber: userStore?.user?.phoneNumber,
    };
    try {
      sendAuthCode(formObject);
      setSendCode(true);
    } catch (error) {
      setSendCode(false);
    }
  }
  function handleVerify(formData: FormData) {
    verifyCode(formData);
    moveToNextModal();
    setCode(formData.code);
  }

  return (
    <div className="p-10  bg-white rounded dark:bg-zinc-900">
      <h4 className="text-xl font-semibold mb-2 dark:text-slate-100">
        Enter Confirmation Code
      </h4>
      <p className="mb-2 dark:text-slate-200">
        {sendCode ? (
          `A 6-digit code has been sent to +**********${
            userStore?.user?.phoneNumber?.slice(-3) || ""
          }`
        ) : (
          <>
            Click <span className="text-blue-500 font-semibold">Send Code</span>{" "}
            button to get a new code.
          </>
        )}
      </p>
      <p className="mb-4 dark:text-slate-200">
        It may take up to a minute for you to receive this code
      </p>
      <form onSubmit={handleSubmit(handleVerify)}>
        <Input
          placeholder="Enter code"
          className="text-center"
          {...register("code")}
        />
        <input
          className="hidden"
          {...register("phoneNumber")}
          value={userStore?.user?.phoneNumber}
        />
        <Button
          type="submit"
          loading={isVerifyPending}
          classname={`w-full mt-2 mb-2 ${
            !moveNext ? "cursor-not-allowed" : ""
          }`}
          disabled={!moveNext}
        >
          Next
        </Button>
      </form>
      <form onSubmit={handleSubmit(sendVerificationCode)} className="mt-2">
        <Button
          type="submit"
          classname="w-full"
          loading={isSendPending}
          loadingText="in progess.."
        >
          Send Code
        </Button>
      </form>
    </div>
  );
}
