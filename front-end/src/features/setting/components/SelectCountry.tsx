import { countries } from '../../../app/constants/constant';
import { IoIosArrowBack } from 'react-icons/io';

type Country = {
  name: string;
  code: string;
};
type Props = {
  onSelect: (item: Country) => void;
  selectedCountry: Country | null;
  handleBackClick: () => void;
};

export default function SelectCountry({
  onSelect,
  selectedCountry,
  handleBackClick,
}: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900   rounded-md">
      <div className=" mb-4">
        <button className="dark:text-slate-300 flex" onClick={handleBackClick}>
          <IoIosArrowBack className="text-2xl hover:text-blue-500" />
        </button>
      </div>
      <h2 className="px-4 mb-4 text-xl text-slate-800  font-bold dark:text-slate-100">
        Select a country
      </h2>
      <ul className="p-4 h-80 overflow-y-auto border rounded-md">
        {countries.map((item, index) => (
          <li
            key={index}
            onClick={() => onSelect(item)}
            className="p-2 cursor-pointer rounded-md w-full flex justify-between text-lg mb-1 hover:bg-slate-50 dark:hover:bg-zinc-800"
          >
            <span className="dark:text-slate-200">
              {item.name} ({item.code})
            </span>
            <input
              type="radio"
              checked={item.name === selectedCountry?.name}
              className="w-4"
              readOnly
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
