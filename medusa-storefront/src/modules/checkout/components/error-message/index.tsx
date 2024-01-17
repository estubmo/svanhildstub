const ErrorMessage = ({
  error,
}: {
  error?: { message: string } | string | null;
}) => {
  if (!error) {
    return null;
  }

  return (
    <div className="text-small-regular pt-2 text-rose-500">
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
