import { useNavigate } from "react-router-dom";
import {
  addEducationRecordRequest,
  loginRequest,
  registerUserRequest,
  updateUserRequest,
  updateEducationRecordRequest,
  deleteEducationRecordRequest,
  getUserInformationRequest,
  changePasswordRequest,
  logoutUserRequest,
  toggleTwoStepAuthRequest,
  addPhoneNumberRequest,
  reEnterPasswordRequest,
  deleteAccountRequest,
} from "../apiRequest";
import { useMutation, useQuery } from "../hooks";
import { toast } from "react-toastify";
import { useAppContext } from "../contexts/AppProvider";
import { FormData } from "../types";
import { useUserStore } from "../store/userStore";
import { useProfileStore } from "../store/ProfileStore";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const { mutate: loginUser, isPending } = useMutation(loginRequest, {
    onSuccess: (data) => {
      userStore.addUser(data);
      toast.success("Login is successfull");
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    loginUser,
    isPending,
  };
};

export const useLogout = () => {
  const userStore = useUserStore();
  const { mutate: logout, isPending } = useMutation(() => logoutUserRequest(), {
    onSuccess: () => {
      userStore.logoutUser();
      toast.success("You are logged out successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return {
    logout,
    isPending,
  };
};
export const useChangePassword = () => {
  const navigate = useNavigate();
  const { mutate: changePassword, isPending } = useMutation(
    changePasswordRequest,
    {
      onSuccess: () => {
        toast.success("Your password is updated successfully");
        navigate("/dashboard/setting");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );
  return {
    changePassword,
    isPending,
  };
};

export const useVerifyPassword = () => {
  const {
    mutate: verifyPassword,
    isPending,
    isSuccess,
    isError,
    resetState,
  } = useMutation(reEnterPasswordRequest, {
    onSuccess: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });

  return {
    verifyPassword,
    isError,
    isSuccess,
    isPending,
    resetState,
  };
};
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const { mutate: deleteAccount, isPending } = useMutation(
    deleteAccountRequest,
    {
      onSuccess: () => {
        toast.success("You have successfully deleted your acount");
        navigate("/login");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );

  return {
    deleteAccount,
    isPending,
  };
};
export const useCreateUser = () => {
  const navigate = useNavigate();
  const { mutate: createUser, isPending } = useMutation(registerUserRequest, {
    onSuccess: () => {
      toast.success("Registration is successfull");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    isPending,
    createUser,
  };
};

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const { isPending, mutate: updateUser } = useMutation(updateUserRequest, {
    onSuccess: () => {
      toast.success("User information is updated successfully");
      navigate("/dashboard/profile");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    updateUser,
    isPending,
  };
};

export const useAddEducationRecord = () => {
  const {
    mutate: addEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(addEducationRecordRequest, {
    onSuccess: () => {
      toast.success("Education record is added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    addEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};

export const useUpdateEducationRecord = () => {
  const profileStore = useProfileStore();
  let id = "";
  const education = profileStore.selectedEducationRecord;
  if (education !== null) {
    const { _id } = education;
    id = _id;
  }
  const {
    mutate: updateEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(
    (formData: FormData) => updateEducationRecordRequest(formData, id),
    {
      onSuccess: () => {
        toast.success("Education record is updated successfully.");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );
  return {
    updateEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};

export const useDeleteEducationRecord = () => {
  const profileStore = useProfileStore();
  let id = "";
  const education = profileStore.selectedEducationRecord;
  if (education !== null) {
    const { _id } = education;
    id = _id;
  }
  const {
    mutate: deleteEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(() => deleteEducationRecordRequest(id), {
    onSuccess: () => {
      toast.success("Education is deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    deleteEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};

export const useUserInformation = () => {
  const userStore = useUserStore();

  const { data: user, isLoading } = useQuery(getUserInformationRequest, {
    onSuccess: (data) => {
      userStore.addUser(data.data);
    },
    onError: () => {},
  });

  return {
    user,
    isLoading,
  };
};

export const useToggleAuthStatus = () => {
  const userStore = useUserStore();
  const {
    mutate: updateTwoStepAuthStatus,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(toggleTwoStepAuthRequest, {
    onSuccess: () => {
      toast.success("Two step auth is updated successfully");
      userStore.toggleTwoStepAuthentication();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    updateTwoStepAuthStatus,
    isPending,
    isSuccess,
    resetState,
  };
};

export const useAddPhoneNumber = () => {
  const {
    mutate: addPhoneNumber,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(addPhoneNumberRequest, {
    onSuccess: () => {
      toast.success("Phone number is added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    addPhoneNumber,
    isPending,
    isSuccess,
    resetState,
  };
};
