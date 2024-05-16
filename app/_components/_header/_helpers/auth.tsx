"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { HeartIcon, LogInIcon, LogOutIcon, ScrollTextIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import Link from "next/link";

export const LogInSection = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();

  return (
    <>
      {data?.user ? (
        <div className="flex items-center gap-3 pt-6">
          <Avatar className="border-[1px] border-primary">
            <AvatarImage src={data?.user?.image as string | undefined} />
            <AvatarFallback>
              {data?.user?.name?.split(" ")[0][0]}
              {data?.user?.name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>

          <div className="">
            <h3 className="font-semibold">{data.user.name}</h3>
            <span className="block text-xs text-muted-foreground">
              {data.user.email}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-10">
          <h2 className="font-semibold">Olá. Faça seu login!</h2>
          <Button size="icon" onClick={handleSignInClick}>
            <LogInIcon />
          </Button>
        </div>
      )}
    </>
  );
};

export const LoggedUserOptions = () => {
  const { data } = useSession();

  return (
    <>
      {data?.user && (
        <>
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            asChild
          >
            <Link href="/my-orders">
              <ScrollTextIcon size={16} />
              <span className="block">Meus pedidos</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            asChild
          >
            <Link href="/my-favorite-restaurants">
              <HeartIcon size={16} />
              <span className="block">Restaurantes Favoritos</span>
            </Link>
          </Button>
        </>
      )}
    </>
  );
};

export const SignOutSection = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();

  return (
    <>
      {data?.user && (
        <>
          <div className="py-6">
            <Separator />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            onClick={handleSignOutClick}
          >
            <LogOutIcon size={16} />
            <span className="block">Sair da conta</span>
          </Button>
        </>
      )}
    </>
  );
};
