
import {
    Button,
    Input,
    Logo,
    Password
} from "../components/ui";
import {
    Link
} from 'react-router-dom'
import {useForm} from  'react-hook-form'
import { useLoginUser } from "../api/UserApi";

export default function Login(){
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {isPending, loginUser} = useLoginUser()
    
    
    return (
        <main className="h-screen bg-stone-50 dark:bg-zinc-900 py-8">
            <div className="bg-white p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto border-t-4 border-blue-500 dark:bg-zinc-800">
                <form onSubmit={handleSubmit(loginUser)}>
                    <Logo className="mx-auto mb-4 w-52"/>
                    <h2 className="text-center text-xl  text-blue-500 dark:text-white font-semibold">Login</h2>
                    
                    <Input  
                        type="email"
                        label="Email"
                        placeholder= "Enter your email"
                        className="mb-2"
                        errorMessage={errors?.email?.message as string}
                        {...register('email', {
                            required: "Email is required",
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        
                    />
                    
                    <Password 
                        className="mb-6"
                        errorMessage={errors?.password?.message as string}
                       {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long'
                        }
                    })}
                    />
                    <Button
                        type="submit"
                        loadingText="loading.."
                        loading={isPending}
                        classname="w-full"
                    >
                        Login
                    </Button>
                    <p className="text-center mt-2 dark:text-slate-100">
                        Not a member yet? <Link to="/register" className="text-blue-500 hover:text-blue-700 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
            
        </main>
    )
}