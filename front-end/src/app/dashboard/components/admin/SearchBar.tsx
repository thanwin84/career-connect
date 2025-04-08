import { ComboBox } from '@/components/ui';
import { ComboBoxListItem } from '@/components/ui/combobox';
import { useDebounce } from '@/hooks';
import { useUserNameAutocompleteSuggestions } from '@/hooks/api/user/useUserNameAutocompleteSuggestions';
import { useSearchParams } from 'react-router-dom';

type Props = {
  className?: string;
};

export default function SearchBar({}: Props) {
  const { searchUsers, isLoading, data } = useUserNameAutocompleteSuggestions();
  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce(500);

  function handleOnChange(searchTerm: string) {
    debounce(() => searchUsers(searchTerm));
  }
  return (
    <ComboBox
      onSelect={(value: { _id: string; value: string }) => {
        searchParams.set('_id', value._id);
        searchParams.set('page', '1');
        setSearchParams(searchParams);
      }}
      onHandleclear={() => {
        searchParams.delete('page');
        searchParams.delete('_id');
        setSearchParams(searchParams);
      }}
      isLoading={isLoading}
      onChange={handleOnChange}
      className='text-sm w-[50%]'
    >
      {data?.data.length === 0 ? (
        <p className='text-center text-sm'>No matching results found.</p>
      ) : (
        <>
          {data?.data.map((item) => (
            <ComboBoxListItem
              className='text-center text-sm rounded-md hover:bg-slate-100 dark:hover:bg-stone-700 py-2'
              value={{
                ...item,
                value: item.firstName + ' ' + item.lastName,
              }}
            >
              {item.firstName + ' ' + item.lastName}
            </ComboBoxListItem>
          ))}
        </>
      )}
    </ComboBox>
  );
}
