import { ReactNode } from "react";
import Image from "next/image";
type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <header className="shrink-0 w-full flex justify-center py-5 border-b border-b-light-grey-400 ">
        <Image
          src="/dnc-logo-black.svg"
          alt="DNC Hotel Logo"
          width={45}
          height={40}
        />
      </header>
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
