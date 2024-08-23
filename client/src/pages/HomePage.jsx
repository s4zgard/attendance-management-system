import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Homepage;
