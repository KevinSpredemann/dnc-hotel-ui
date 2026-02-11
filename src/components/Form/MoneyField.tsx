import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "./TextField";

type MoneyFieldProps = Omit<
  NumericFormatProps,
  | "customInput"
  | "prefix"
  | "decimalScale"
  | "decimalSeparator"
  | "thousandSeparator"
> & {
  label?: string;
  error?: boolean | string;
};
const MoneyField = ({ label, error, ...props }: MoneyFieldProps) => {
  return (
    <NumericFormat
      customInput={TextField}
      label={label}
      error={error}
      prefix="R$ "
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator="."
      {...props}
    />
  );
};

export default MoneyField;
