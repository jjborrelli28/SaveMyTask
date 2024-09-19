import { useAuthentication } from '@/context/authentication';
import clsx from 'clsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CTA from './components/cta';

const Header = () => {
  const { isAuthenticated, logout } = useAuthentication();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unauthenticatedLinks =
    pathname === '/'
      ? [
          { label: 'Sign in', url: '/sign-in' },
          { label: 'Sign up', url: '/sign-up' }
        ]
      : [
          pathname === '/sign-in'
            ? { label: 'Sign up', url: '/sign-up' }
            : { label: 'Sing in', url: '/sign-in' }
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
        <nav className={clsx(pathname === '/' ? 'invisible' : 'visible')}>
          <NavLink
            to="/"
            className={clsx(
              isAuthenticated && 'pointer-events-none cursor-default'
            )}
          >
            <span className="text-md bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text font-semibold text-transparent">
              SaveMyTasks
            </span>
          </NavLink>
        </nav>
        <nav>
          <ul className="flex">
            {ctas.map((cta, i) => (
              <li
                key={i}
                className={clsx(
                  ctas.length > 1 &&
                    i !== ctas.length - 1 &&
                    'border-gray-200 border-r-2'
                )}
              >
                <CTA content={cta} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
