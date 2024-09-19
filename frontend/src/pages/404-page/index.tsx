const NotFoundPage = () => {
  return (
    <div className="flex h-screen-with-navbar flex-col items-center justify-center gap-y-12">
      <h1 className="flex flex-col items-center bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-left font-bold text-transparent">
        <span className="text-7xl">404</span>
        <span className="text-4xl">Page Not Found</span>
      </h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
