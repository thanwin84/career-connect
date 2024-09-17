import {
    ChangePassword,
    TwoStepAuthentication
} from "../components/Setting"

export default function PasswordAndSecurity({className}){
    return (
        <div className={`w-full h-screen   ${className}`}>
            <ChangePassword />
            <TwoStepAuthentication />
        </div>
    )
}