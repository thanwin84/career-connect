import React, { useRef } from 'react';
import useForm from './hooks/FormCheck/useForm.ts';
import {
  Input,
  Button,
  Select
} from './components/ui'

const MyForm = () => {
  const refs = {
    fNameRef: useRef(),
    lNameRef: useRef()
  }
  const {register, formObject, handleSubmit, errors, isError, isLoading} = useForm()

  const onSubmitFn = async(data) => {
    console.log("submitting data", data)
     
  };
  
  
  return (
    <form onSubmit={(e)=>handleSubmit(e, onSubmitFn)} className='dark:bg-zinc-900 p-6 space-y-2' >
      <Input 
        name="FirstName"
        label="First Name"
        {...register("fName", 
          [
            {
              required: true,
              errorMessage: "This field is required"
            },
            {
              maxLength: 5,
              errorMessage: "First name can be more than 5 characters long"
            }
          ]
        )}
        errorMessage={errors.fName}
      />
      <Input 
        name="LastName"
        label="Last Name"
        {...register("lName", [{required: true}])}
        errorMessage={errors.lName}
      />
      <Input
        type="email"
        label="Email"
        errorMessage={errors.email}
        {...register("email", [
          {
            required: true,
            errorMessage: "Email is required"
          },
          {
            isEmail: true,
            errorMessage: "Please enter valid email address"
          }
        ])}
      />
      <Select
        label="Favorite color"
        options={["red", "blue", "orange"]}
        {...register("color", [{required:true}])}
        errorMessage={errors.color}
       />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;
