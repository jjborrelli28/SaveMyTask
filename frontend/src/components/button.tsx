import { PropsWithChildren } from 'react';

const Button = ({
  children,
  onClick
}: PropsWithChildren<{ onClick?: () => void }>) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden border-2 border-lilac bg-white px-4 py-2 text-white lg:px-6 lg:py-3"
    >
      <span className="absolute inset-0 translate-x-0 transform bg-lilac transition-transform duration-300 group-hover:translate-x-full" />
      <span className="text-md relative z-10 font-semibold group-hover:text-lilac lg:text-lg">
        {children}
      </span>
    </button>
  );
};

export default Button;
