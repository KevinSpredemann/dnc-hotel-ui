import { ReactElement } from "react";

type AlertProps = {
  type?: "success" | "danger";
  children?: ReactElement | string;
};

const getsStylesByAlertType = (alertType: "success" | "danger") =>
  ({
    success: "bg-green-300 text-black",
    danger: "bg-red-400 text-black",
  }[alertType]);

const defaultStyles =
  "px-4 py-2 rounded-lg font-medium text-black my-4 w-full justify-center flex ";
const Alert = ({ type = "success", ...props }: AlertProps) => {
  return (
    <span className={`${defaultStyles} ${getsStylesByAlertType(type)}`} {...props} />
  );
};
export default Alert;
