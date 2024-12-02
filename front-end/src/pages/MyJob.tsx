import MyJobsContainer from "../components/myjobs/MyJobsContainer";
import { TabContent, TabContentList, Tabs } from "../components/ui/tabs";
import { JOB_STATUS } from "../constant";

type Props = {
  className?: string;
};

export default function MyJob({}: Props) {
  const tabs = {
    ALL: "All",
    APPLIED: "Applied",
    SHORTLISTED: "Short Listed",
    INTERVIEW: "Interveiw",
    HIRED: "Hired",
    DECLINED: "Declined",
  };
  // TODO: after refresh tab should not change it back to start
  return (
    <div className="bg-slate-50 dark:bg-zinc-700 h-screen">
      <Tabs
        tabs={Object.values(tabs)}
        defaultTab={tabs.ALL}
        className=""
        tabFontSize="text-sm"
      >
        <TabContentList>
          <TabContent value={tabs.ALL}>
            <MyJobsContainer type="all" />
          </TabContent>
          <TabContent value={tabs.APPLIED}>
            <MyJobsContainer type={JOB_STATUS.APPLIED} />
          </TabContent>
          <TabContent value={tabs.SHORTLISTED}>
            <MyJobsContainer type={JOB_STATUS.SHORTLISTED} />
          </TabContent>
          <TabContent value={tabs.INTERVIEW}>
            <MyJobsContainer type={JOB_STATUS.INTERVIEW} />
          </TabContent>
          <TabContent value={tabs.HIRED}>
            <MyJobsContainer type={JOB_STATUS.HIRED} />
          </TabContent>
          <TabContent value={tabs.DECLINED}>
            <MyJobsContainer type={JOB_STATUS.DECLINED} />
          </TabContent>
        </TabContentList>
      </Tabs>
    </div>
  );
}
