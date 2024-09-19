import { AiOutlineUser } from 'react-icons/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiGitRepositoryCommitsFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600">
      <div className="container flex flex-col gap-4 border-t-2 border-blue-500 pb-16 pt-12">
        <nav>
          <ul className="flex justify-center gap-4">
            <li>
              <NavLink
                aria-label="My LinkedIn account"
                to="https://www.linkedin.com/in/jjborrelli/"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaLinkedin size={24} className="text-white" />
              </NavLink>
            </li>
            <li>
              <NavLink
                aria-label="My GitHub account"
                to="https://github.com/jjborrelli28"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <FaGithub size={24} className="text-white" />
              </NavLink>
            </li>
            <li>
              <NavLink
                aria-label="SaveMyTask's Repository"
                to="https://github.com/jjborrelli28/SaveMyTask"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <RiGitRepositoryCommitsFill size={24} className="text-white" />
              </NavLink>
            </li>
            <li>
              <NavLink
                aria-label="My Portfolio"
                to="https://juanjoseborrelli.com/"
                target="_blank"
                rel="noreelnoopener noreferrer"
              >
                <AiOutlineUser size={24} className="text-white" />
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
