const Header = () => (
  <header className="sticky top-0 z-10 py-5 backdrop-blur-md">
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="src/assets/logo.png" className="h-8" />
        <span className="text-text text-lg font-bold">TodoApp</span>
      </div>
      <nav>
        <ul className="flex gap-3">
          <li>
            <a
              href="/" // TODO: User page for when we have users
              className="text-md text-text underline-animate font-bold"
            >
              My account
            </a>
          </li>
          <span className="w-0.5 bg-lilac" />
          <li>
            <a
              href="/" // TODO: Function for when we have authentication
              className="text-md text-text underline-animate font-bold"
            >
              Log out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
