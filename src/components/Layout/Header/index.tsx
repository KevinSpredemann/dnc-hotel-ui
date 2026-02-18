"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../../Button";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data } = useSession();
  const user = data?.user;
  const headerStyle = user ? "justify-between px-20" : "justify-center px-0";
  const menuStyle = showMenu ? "" : "sr-only";

  const logout = async () => {
    await signOut({ callbackUrl: "/login" }).then(() => setShowMenu(false));
  };

  return (
    <header
      className={`shrink-0 w-full flex py-2 border-b border-b-light-grey-400 ${headerStyle} `}
    >
      <Link href="/">
        <Image
          src="/dnc-logo-black.svg"
          alt="DNC Hotel Logo"
          width={60}
          height={30}
          className="mt-2"
        />
      </Link>
      {user && (
        <div>
          <div
            className="flex border border-light-grey-400 py-1 px-2 rounded-full cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Image
              src="/bars-solid.png"
              alt="Menu"
              width={30}
              height={25}
              className="mr-2"
            />
            <Image
              key={user.avatar}
              src={user.avatar ?? "/no-avatar.png"}
              alt="Foto do perfil no Menu"
              width={20}
              height={20}
              className="rounded-full w-8 h-8 object-cover"
              unoptimized
            />
          </div>
          {showMenu && (
            <nav
              className={`absolute px-5 py-4 bg-white rounded-2xl shadow-lg right-10 mt-2 ${menuStyle}`}
            >
              <ul className="font-medium">
                <li>
                  <Link href="/perfil" onClick={() => setShowMenu(!showMenu)}>
                    Meu Perfil
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/reservas" onClick={() => setShowMenu(!showMenu)}>
                    Minhas reservas
                  </Link>
                </li>
                <hr className="mt-4" />
                <li>
                  <Button
                    appearance="secondary"
                    className="text-left py-0 px-0 mt-4"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
