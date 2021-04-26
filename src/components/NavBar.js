const NavBar = () => {
  return (
    <nav className="fixed bg-pink-700 z-40 top-0 left-0 h-16 w-full border-b-2 border-pink-600 border-opacity-50 grid grid-cols-12 gap-4 items-center px-4">
      <div className="col-span-9 flex gap-2 items-center">
        <img
          className="cursor-pointer"
          width={42}
          height={42}
          src="/logo.svg"
          alt="logo"
        />
        <h1 className="text-2xl font-semibold text-pink-50">
          Ice Scream
        </h1>
      </div>
    </nav>
  );
}

export default NavBar;