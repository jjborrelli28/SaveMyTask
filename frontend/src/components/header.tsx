import { useAuthentication } from '@context/authentication';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-10 py-5 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="src/assets/logo.png" className="h-8" />
          <span className="text-text text-lg font-bold">SaveMyTask</span>
        </div>
        <nav>
          <ul className="flex gap-3">
            <li>
              <NavLink
                to={pathname === '/dashboard' ? '/my-account' : '/dashboard'}
                className="text-md text-text underline-animate font-bold"
              >
                {pathname === '/dashboard' ? 'My account' : 'Dashboard'}
              </NavLink>
            </li>
            <span className="w-0.5 bg-lilac" />
            <li>
              <button
                onClick={handleLogout}
                className="text-md text-text underline-animate font-bold"
              >
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
