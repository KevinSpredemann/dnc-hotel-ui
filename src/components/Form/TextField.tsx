import { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null | boolean;
};
const TextField = ({
  id,
  label,
  type = "text",
  className,
  error,
  ...props
}: TextFieldProps) => {
  const defaultStyle =
    "border border-light-grey-600 rounded-lg px-4 py-2 w-full";
  const errorStyle = "border-2 border-red-500";
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...props}
        placeholder={label}
        className={`${defaultStyle} ${error ? errorStyle : ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextField;
