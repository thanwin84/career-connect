import { NavLink } from 'react-router-dom';
import { postJobsLinks } from '../../../../app/config/postJobsLinks';
import { RxCross2 as CrossIcon } from 'react-icons/rx';
import { usePostLayoutContext } from '../../../../contexts/postLayoutContext';

type Props = {
  className?: string;
};

export default function MobileSidebar({ className }: Props) {
  const { toggleSmallSidebar } = usePostLayoutContext();
  return (
    <section className={` p-6 ${className}`}>
      <button
        onClick={toggleSmallSidebar}
        className="w-full flex gap-4 justify-between my-auto mb-6"
      >
        <span>Close</span>
        <span className="my-auto text-xl hover:bg-zinc-800 rounded-full hover:text-white">
          <CrossIcon />
        </span>
      </button>
      {postJobsLinks?.map((link) => (
        <NavLink
          key={link.text}
          onClick={toggleSmallSidebar}
          className={({ isActive, isPending }) => {
            return `rounded-md p-2 text-nowrap mb-4 flex gap-4  ${
              isActive
                ? 'bg-zinc-800 dark:bg-zinc-100 dark:text-slate-800 text-slate-200'
                : isPending
                ? 'bg-zinc-100'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-400 dark:hover:text-slate-800 dark:text-slate-200'
            }`;
          }}
          to={link.path}
          end
        >
          <span className="my-auto text-xl">{link.icon}</span>
          {link.text}
        </NavLink>
      ))}
    </section>
  );
}
