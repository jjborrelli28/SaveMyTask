import { NavLink } from 'react-router-dom';

type CTAProps = {
  content: {
    label: string;
    url?: string;
    action?: () => void;
  };
};

const CTA = ({ content }: CTAProps) => {
  const { label, url, action } = content;

  if (url) {
    return (
      <NavLink
        to={url}
        className="text-md text-text underline-animate font-semibold"
      >
        {label}
      </NavLink>
    );
  }

  if (action) {
    return (
      <button
        onClick={action}
        className="text-md text-text underline-animate font-semibold"
      >
        {label}
      </button>
    );
  }

  return null;
};

export default CTA;
