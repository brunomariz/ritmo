interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({ onClick, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 rounded hover:brightness-90 active:brightness-75`}
    >
      {children}
    </button>
  );
}
