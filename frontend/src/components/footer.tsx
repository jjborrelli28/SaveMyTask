import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container">
      <div className="flex flex-col gap-4 border-t-2 border-lilac pb-16 pt-12">
        <nav>
          <ul className="flex justify-center gap-4">
            <li>
              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/jjborrelli/"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaLinkedin size={24} className="text-black" />
              </a>
            </li>
            <li>
              <a
                aria-label="GitHub"
                href="https://github.com/jjborrelli28"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaGithub size={24} className="text-black" />
              </a>
            </li>
            <li>
              <a
                aria-label="Portfolio"
                href="https://jj-dev.vercel.app/"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaPerson size={24} className="text-black" />
              </a>
            </li>
            <li>
              <a
                aria-label="Whatsapp"
                href="wa.link/t83bsi"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaWhatsapp size={24} className="text-black" />
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-center">Juan Jose Borrelli © {currentYear}</p>
        <p className="text-end text-sm">Made with ❤️ by me</p>
      </div>
    </footer>
  );
};

export default Footer;
