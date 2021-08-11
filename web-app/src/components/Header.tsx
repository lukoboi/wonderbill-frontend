interface HeaderProps {
  /**
   * Sets the title of the header
   */
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex items-center justify-center w-full h-16 bg-wb-blue sm:h-24">
      <h1 className="text-xl text-white">{title}</h1>
    </header>
  );
};
