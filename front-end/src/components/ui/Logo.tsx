import logo from "../../assets/images/logo-5.svg";

type Props = {
  className?: string;
};
export default function Logo({ className }: Props) {
  return (
    <div className={className}>
      <img className={`w-full h-auto `} src={logo} alt="logo" />
    </div>
  );
}
