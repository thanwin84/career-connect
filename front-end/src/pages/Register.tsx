
import  { useState } from 'react'
import {
    CompleteSteps, 
    CreateAccount,
    DescribeYourself,
    AddProfilePhoto
} from '../components/create_account'
import useMultiStep from '../hooks/useMultiStep'
import { User } from '../types'
import { useAppContext } from '../contexts/AppProvider'
import { useNavigate } from 'react-router-dom'

type Props = {
    className?: string
}


export default function Register({}:Props){
    const [user, setUser] = useState<Partial<User>>({})
    const navigate = useNavigate()
    const {userStore: {state}} = useAppContext()
    if (state.user){
        navigate("/")
    }
    function handleUser(values:Partial<User>){
        setUser(prev => ({...prev, ...values}))
    }
    const {step, steps, currentStep, next, back} = useMultiStep([
        <CreateAccount 
            next={()=> next()}
            setUser={handleUser}
        />,
        <DescribeYourself 
            next={()=>next()} 
            goBack={()=>back()}
            setUser={handleUser}
        />,
        <AddProfilePhoto 
            goBack={()=>back()}
            user={user}
        />
    ])
    
    const titles = ["Create Account", "Describe yourself", "Add Profile Photo"]

    return (
        <main className='w-full bg-slate-50 dark:bg-zinc-900 '>
        <div className='lg:w-4/6 w-5/6  mx-auto'>
            <CompleteSteps 
                className= " mx-auto pt-6"
                totalSteps={steps.length}
                currentStep={currentStep}
                titles={titles}
            />
            <div className='mx-auto pb-6'>
                {step}
            </div>
        </div>
        </main>
    )
}