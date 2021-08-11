export enum ButtonLevel {
  WARNING,
  SUCCESS,
}

interface ButtonProps {
  /**
   * Button Text
   */
  children: React.ReactNode;
  /**
   * Optional click handler - triggered on click of button
   */
  onClick?: () => void;
  /**
   * Button type, used to affect default click behavior
   */
  type?: 'button' | 'submit';
  /**
   * Sets the type of button adjusting the colour to the appropriate level
   */
  buttonLevel?: ButtonLevel;
  /**
   * Optionally disable the button
   */
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  buttonLevel = ButtonLevel.SUCCESS,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full rounded-full px-12 py-3 text-white ${
        buttonLevel === ButtonLevel.SUCCESS ? 'bg-wb-green' : 'bg-wb-red'
      } hover:opacity-80 duration-200 text-xl`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
