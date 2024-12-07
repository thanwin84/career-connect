import { TurnOff, TurnOn } from "../ui";

type Props = {
  accessStatus: boolean;
  onToggleClick: () => void;
};

export default function ToggleStatus({ accessStatus, onToggleClick }: Props) {
  return (
    <button
      type="submit"
      onClick={onToggleClick}
      aria-label={
        accessStatus ? "Turn off access status" : "turn on access status"
      }
    >
      {accessStatus ? <TurnOn /> : <TurnOff />}
    </button>
  );
}
