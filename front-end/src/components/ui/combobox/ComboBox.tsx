import {
  useState,
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { CrossButton, Input, Spinner } from '..';
import ComboDropDownList from './ComboDropDownList';
import { CiSearch } from 'react-icons/ci';

type Props<T extends { value: string }> = {
  label?: string;
  className?: string;
  name?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  onSelect?: (value: T) => void;
  errorMessage?: string;
  children: ReactNode;
  isLoading?: boolean;
  onHandleclear?: () => void;
};
type ContextT<T extends { value: string }> = {
  handleClick: (value: T) => void;
  searchTerm: string;
};
const ComboBoxContext = createContext<ContextT<any> | undefined>(undefined);

export default function ComboBox<T extends { value: string }>({
  label,
  className,
  name,
  onChange,
  defaultValue = '',
  onSelect,
  errorMessage,
  children,
  isLoading = false,
  onHandleclear,
}: Props<T>) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownId = `dropdown-${name}`;
  const comboBoxRef = useRef<HTMLDivElement | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setSearchTerm(e.target.value);
    setIsDropDownOpen(true);
    if (onChange) {
      onChange(value);
    }
  }
  function handleClear() {
    const resetValue = '';
    setSearchTerm('');
    if (onChange) {
      onChange(resetValue);
    }
    if (onHandleclear) {
      onHandleclear();
    }
  }

  function handleClick(item: T) {
    setSearchTerm(item.value);
    setIsDropDownOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboBoxRef.current &&
        !comboBoxRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <ComboBoxContext.Provider
      value={{
        handleClick,
        searchTerm,
      }}
    >
      <div ref={comboBoxRef} className={`w-full relative ${className}`}>
        <div className='w-full bg-white dark:bg-stone-800 flex items-center pr-2 rounded-md gap-2 border dark:border-stone-600'>
          <CiSearch size={22} className='ml-2 w-8' />
          <Input
            label={label}
            className='w-full border-none text-slate-600 '
            name={name}
            onChange={(e) => handleChange(e)}
            onFocus={() => setIsDropDownOpen(true)}
            value={searchTerm}
            aria-controls={dropDownId}
            aria-expanded={isDropDownOpen}
            aria-autocomplete='list'
            role='combobox'
            errorMessage={errorMessage}
            autoComplete='off'
          />
          <div className='w-10'>
            {isLoading && <Spinner className='w-4 h-4' />}
            {searchTerm && !isLoading && <CrossButton action={handleClear} />}
          </div>
        </div>

        {isDropDownOpen && (
          <ComboDropDownList id={dropDownId}>{children}</ComboDropDownList>
        )}
      </div>
    </ComboBoxContext.Provider>
  );
}

export const useComboContext = () => {
  const context = useContext(ComboBoxContext);
  if (!context) {
    throw new Error('Component should use within ComboxBox');
  }
  return context;
};
