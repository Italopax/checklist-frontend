interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage ({ error }: ErrorMessageProps) {
  return (
    <p className="text-(--destructiveDark)">{error}</p>
  );
}