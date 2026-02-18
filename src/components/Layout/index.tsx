import { ReactNode } from "react";
import Header from "./Header";
type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1  w-full flex justify-center items-center p-2">
        {children}
      </main>
      <footer className="shrink-0 w-full font-medium flex justify-center py-5 bg-snow-white border-t border-t-light-grey-500 ">
        © 2024 Escola DNC, Inc.
      </footer>
    </div>
  );
};

export default Layout;
