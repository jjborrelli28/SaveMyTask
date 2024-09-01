import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lilac">
      <div className="container flex flex-col gap-4 border-t-2 border-lilac pb-16 pt-12">
        <nav>
          <ul className="flex justify-center gap-4">
            <li>
              <NavLink
                aria-label="LinkedIn"
                to="https://www.linkedin.com/in/jjborrelli/"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaLinkedin size={24} className="text-white" />
              </NavLink>
            </li>
            <li>
              <NavLink
                aria-label="GitHub"
                to="https://github.com/jjborrelli28"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaGithub size={24} className="text-white" />
              </NavLink>
            </li>
            <li>
              <NavLink
                aria-label="Portfolio"
                to="https://jj-dev.vercel.app/"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaPerson size={24} className="text-white" />
              </NavLink>
            </li>
            <li>
              <NavLink
                aria-label="Whatsapp"
                to="https://wa.link/t83bsi"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaWhatsapp size={24} className="text-white" />
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className="text-center text-white">
          Juan Jose Borrelli © {currentYear}
        </p>
        <p className="mt-4 text-center text-xs text-white lg:text-end">
          Made with ❤️ by me
        </p>
      </div>
    </footer>
  );
};

export default Footer;
