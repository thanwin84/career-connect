import {
  useState,
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Input } from "..";
import ComboDropDownList from "./ComboDropDownList";

type Props = {
  label?: string;
  className?: string;
  name?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  onSelect?: (value: string) => void;
  errorMessage?: string;
  children: ReactNode;
};
type ContextT = {
  handleClick: (value: string) => void;
};
const ComboBoxContext = createContext<ContextT | undefined>(undefined);

export default function ComboBox({
  label,
  className,
  name,
  onChange,
  defaultValue = "",
  onSelect,
  errorMessage,
  children,
}: Props) {
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

  function handleClick(item: string) {
    setSearchTerm(item);
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
    document.addEventListener("mousedown", handleClickOutside);
    return document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ComboBoxContext.Provider
      value={{
        handleClick,
      }}
    >
      <div ref={comboBoxRef} className={`w-full relative ${className}`}>
        <Input
          label={label}
          name={name}
          onChange={(e) => handleChange(e)}
          onFocus={() => setIsDropDownOpen(true)}
          value={searchTerm || defaultValue}
          aria-controls={dropDownId}
          aria-expanded={isDropDownOpen}
          aria-autocomplete="list"
          role="combobox"
          errorMessage={errorMessage}
        />
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
    throw new Error("Component should use within ComboxBox");
  }
  return context;
};
