interface RequiredErrorProps {
  msg: string;
}

const RequiredError = ({ msg }: RequiredErrorProps) => {
  return <span className="text-red-500 text-sm">{msg}</span>;
};

export default RequiredError;
