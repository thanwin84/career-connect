import  { useState } from 'react'
import {
    CompleteSteps, 
    CreateAccount,
    DescribeYourself,
    AddProfilePhoto
} from '../components/create_account'
import useMultiStep from '../hooks/useMultiStep'


export default function CreateAccountPageLayout(){
    const [user, setUser] = useState({})
    
    function handleUser(values){
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