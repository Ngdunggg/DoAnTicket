import {
  RadioButton as PrimeRadioButton,
  RadioButtonProps,
} from "primereact/radiobutton";

/**
 * Custom RadioButton component that wraps PrimeReact's RadioButton.
 *
 * This component applies a default styling with consistent alignment,
 * and allows for additional custom class names via the `className` prop.
 *
 * @param {IRadioButtonProps} props - The properties for the RadioButton component.
 * @returns {JSX.Element} The styled RadioButton component.
 */
interface IRadioButtonProps extends Omit<RadioButtonProps, "className"> {
  className?: string;
}

const RadioButton = ({ className = "", ...props }: IRadioButtonProps) => {
  const classNames = ` ${className}`;

  return <PrimeRadioButton {...props} className={classNames} />;
};

export default RadioButton;
