import { ReactComponent as LoadingIcon } from '../icons/LoadingIcon.svg';

export const Loader = () => {
  return (
    <div
      className="absolute top-0 flex items-center justify-center w-screen h-screen pointer-events-none"
      data-testid="loader"
    >
      <LoadingIcon />
    </div>
  );
};
