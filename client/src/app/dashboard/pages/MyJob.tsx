import { Tabs, TabContentList, TabContent } from '@/components/ui/tabs';
import { constants } from '@/config/appConfig';
import MyJobsContainer from '../components/my-jobs/MyJobsContainer';

type Props = {
  className?: string;
};

export default function MyJob({}: Props) {
  const tabs = {
    ALL: 'All',
    APPLIED: 'Applied',
    SHORTLISTED: 'Short Listed',
    INTERVIEW: 'Interveiw',
    HIRED: 'Hired',
    DECLINED: 'Declined',
  };
  // TODO: after refresh tab should not change it back to start
  return (
    <div className='bg-slate-50 dark:bg-stone-900  h-screen'>
      <Tabs
        tabs={Object.values(tabs)}
        defaultTab={tabs.ALL}
        className='dark:bg-stone-900'
        tabFontSize='text-sm'
      >
        <TabContentList>
          <TabContent value={tabs.ALL}>
            <MyJobsContainer type='all' />
          </TabContent>
          <TabContent value={tabs.APPLIED}>
            <MyJobsContainer type={constants.JOB_STATUS.APPLIED} />
          </TabContent>
          <TabContent value={tabs.SHORTLISTED}>
            <MyJobsContainer type={constants.JOB_STATUS.SHORTLISTED} />
          </TabContent>
          <TabContent value={tabs.INTERVIEW}>
            <MyJobsContainer type={constants.JOB_STATUS.INTERVIEW} />
          </TabContent>
          <TabContent value={tabs.HIRED}>
            <MyJobsContainer type={constants.JOB_STATUS.HIRED} />
          </TabContent>
          <TabContent value={tabs.DECLINED}>
            <MyJobsContainer type={constants.JOB_STATUS.DECLINED} />
          </TabContent>
        </TabContentList>
      </Tabs>
    </div>
  );
}
