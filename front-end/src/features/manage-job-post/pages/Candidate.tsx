import { useState } from 'react';
import Search from '../components/candidates/Search';
import SearchIcon from '../components/candidates/SearchIIcon';
import { useSearchParams } from 'react-router-dom';
import ResetButton from '../components/candidates/ResetButton';
import Actions from '../components/candidates/actions/Actions';
import { useCandidateStore } from '../../../store/CandidateStore';
import CandidateContainer from '../components/candidates/CandidatesContainer';

type Props = {
  className?: string;
};

export default function Candidate({}: Props) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const candidateName = params.get('candidateName');
  const candidateStore = useCandidateStore();

  function toggleSearchBar() {
    setIsSearchBarOpen(!isSearchBarOpen);
  }

  function searchAction(form: FormData) {
    const search = form.get('candidateName');
    params.delete('page');
    if (search) {
      params.set('candidateName', search.toString());
      setParams(params);
    }
  }

  function reset() {
    params.delete('candidateName');
    params.delete('page');
    setParams(params);
  }

  return (
    <section className="h-screen">
      <div className={`flex items-start justify-between gap-4 h-16`}>
        <h2 className="ml-2 text-xl font-semibold text-slate-800 dark:text-slate-200 my-auto">
          Candidates
        </h2>
        {isSearchBarOpen ? (
          <Search
            action={searchAction}
            className="md:w-[60%]"
            closeSearchBar={toggleSearchBar}
          />
        ) : (
          <SearchIcon action={toggleSearchBar} className="my-auto" />
        )}
      </div>

      <div className="flex items-start  h-10">
        {candidateStore.selectedApplicantIds.length > 0 && <Actions />}
        {candidateName && <ResetButton reset={reset} />}
      </div>
      <CandidateContainer />
    </section>
  );
}
