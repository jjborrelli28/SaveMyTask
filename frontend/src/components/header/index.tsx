import { useAuthentication } from '@/context/authentication';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import CTA from './components/cta';
import logo from '/assets/images/logo.png';

const Header = () => {
  const { isAuthenticated, logout } = useAuthentication();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unauthenticatedLinks = [
    { label: 'Log in', url: '/login' },
    { label: 'Sign up', url: '/sign-up' }
  ];

  const authenticatedPages = {
    '/dashboard': { label: 'My account', url: '/my-account' },
    '/my-account': { label: 'Dashboard', url: '/dashboard' }
  };

  const authenticatedLink =
    authenticatedPages[pathname as keyof typeof authenticatedPages];

  const authenticatedLinks = authenticatedLink
    ? [
        { label: authenticatedLink.label, url: authenticatedLink.url },
        { label: 'Log out', action: handleLogout }
      ]
    : [{ label: 'Log out', action: handleLogout }];

  const ctas = isAuthenticated ? authenticatedLinks : unauthenticatedLinks;

  return (
    <header className="sticky top-0 z-10 py-5 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <NavLink to="/" aria-label="SaveMyTask Logo">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-7 w-7" />
            <span className="text-text text-md font-bold">SaveMyTask</span>
          </div>
        </NavLink>
        <nav>
          <ul className="flex gap-3">
            {ctas.map((cta, i) => {
              return (
                <Fragment key={i}>
                  <CTA content={cta} />
                  {i < ctas.length - 1 && <span className="w-0.5 bg-lilac" />}
                </Fragment>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
