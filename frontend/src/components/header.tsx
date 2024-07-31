const Header = () => (
  <header className="p-5">
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="src/assets/logo.png" className="h-8" />
        <span className="text-text text-lg font-bold">TodoApp</span>
      </div>
      <nav>
        <ul className="flex gap-3">
          <li>
            <a
              href="/"
              className="text-md text-text underline-animate font-bold"
            >
              My account
            </a>
          </li>
          <span className="bg-lilac w-0.5"/>
          <li>
            <a
              href="/"
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
