import { customFetch } from '@/utils';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const action = async ({ params }: ActionFunctionArgs) => {
  const id = params.id;
  try {
    await customFetch.delete(`/jobs/${id}`);
    toast.success('Job is deleted successfully');
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
  return redirect('../jobs');
};
