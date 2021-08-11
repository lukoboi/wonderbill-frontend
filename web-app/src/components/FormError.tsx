interface FormErrorProps {
  /**
   * Error message text
   */
  children: React.ReactNode;
}

export const FormError = ({ children }: FormErrorProps) => {
  return (
    <div
      className="absolute right-0 text-base text-wb-red"
      data-testid="formError"
    >
      {children}
    </div>
  );
};
