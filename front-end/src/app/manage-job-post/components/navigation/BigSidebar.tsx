import { NavLink } from 'react-router-dom';
import { postJobsLinks } from '../../../../config/postJobsLinks';
import CloseButton from './CloseButton';
import { usePostLayoutContext } from '../../context/postLayoutContext';

type Props = {
  className?: string;
};

export default function BigSidebar({ className }: Props) {
  const { collapsed } = usePostLayoutContext();
  return (
    <aside
      className={`border dark:border-none flex flex-col  px-4 pt-10 dark:bg-black/[0.96]  ${className}`}
    >
      <CloseButton className="mb-8" />
      {postJobsLinks?.map((link) => (
        <NavLink
          key={link.text}
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
          {!collapsed && link.text}
        </NavLink>
      ))}
    </aside>
  );
}
