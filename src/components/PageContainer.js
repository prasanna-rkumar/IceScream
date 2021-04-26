import NavBar from './NavBar'

const PageContainer = ({ children }) => (
  <div className="mt-20 pt-0.5 max-w-7xl mx-auto px-3">
    <NavBar />
    {children}
  </div>
);

export default PageContainer;
