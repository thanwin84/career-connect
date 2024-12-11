import { FaUserCircle } from "react-icons/fa";

type Props = {
  className?: string;
  url: string;
};

export default function UserIcon({ url, className }: Props) {
  return (
    <span className={`my-auto ${className}`}>
      {url ? (
        <img src={url} alt="avatar" className="w-8 h-8 rounded-full" />
      ) : (
        <FaUserCircle />
      )}
    </span>
  );
}
