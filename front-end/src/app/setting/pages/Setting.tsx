import { Spinner } from '@/components/ui';
import { Tabs, TabContentList, TabContent } from '@/components/ui/tabs';
import { useCurrentUser } from '@/hooks/api';
import { i } from 'motion/react-client';
import {
  DeleteAccount,
  ChangePassword,
  TwoStepAuthentication,
} from '../components';

i;

export default function SettingPageLayout() {
  const { isLoading } = useCurrentUser();
  const tabs = {
    account: 'Account',
    passwrodAndSecurity: 'Password and Security',
  };

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner size='h-10 w-10' color='text-gray-500' />
      </div>
    );
  }

  return (
    <div className='w-full bg-white dark:bg-stone-900 min-h-screen '>
      <h2 className='text-2xl font-bold px-2 py-4 text-slate-800  dark:text-slate-100 ml-4'>
        Setting
      </h2>
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
            <TwoStepAuthentication />
          </TabContent>
        </TabContentList>
      </Tabs>
    </div>
  );
}
