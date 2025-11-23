interface Props {
  msg: string | undefined;
}

export const Feedback = ({ msg }: Props) => {
  if (!msg) return null;

  return <div className="ml-2 text-left text-xs text-red-400">{msg}</div>;
};
