import {
    DeleteAccount,
    ChangePassword,
    TwoStepAuthentication
} from '../components/Setting'
import {Tabs, TabContent, TabContentList} from "../components/ui/tabs";
import { useUserInformation } from "../api/UserApi";
import { Spinner } from "../components/ui";



export default function SettingPageLayout(){

    const {isLoading} = useUserInformation()
    const tabs = {
        account: "Account",
        passwrodAndSecurity: "Password and Security"
    }

    if (isLoading){
        return (
            <div className="h-screen flex justify-center items-center">
                <Spinner size="h-10 w-10" color="text-gray-500" />
            </div>
        )
    }
    
    return (
        <div className="w-full bg-white dark:bg-zinc-800">
            <h3 className="text-2xl font-semibold px-2 py-4 text-slate-800 dark:text-slate-100 ml-4">Setting</h3>
            <Tabs
                tabs={[tabs.account, tabs.passwrodAndSecurity]}
                defaultTab={tabs.account}
            >
                <TabContentList>
                    <TabContent value={tabs.account}>
                        <DeleteAccount />
                    </TabContent>
                    <TabContent value={tabs.passwrodAndSecurity}>
                        <ChangePassword />
                        <TwoStepAuthentication  />
                    </TabContent>
                </TabContentList>
                
            </Tabs>
            
        </div>
    )
}

