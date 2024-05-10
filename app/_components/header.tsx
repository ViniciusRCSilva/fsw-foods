"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  FishIcon,
  GrapeIcon,
  HeartIcon,
  HomeIcon,
  IceCreamIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PizzaIcon,
  SandwichIcon,
  ScrollTextIcon,
  UtensilsIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();
  const handleSignOutClick = () => signOut();

  return (
    <div className="sticky top-0 z-50 flex justify-between bg-white px-5 pt-5">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
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

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <ScrollTextIcon size={16} />
                  <span className="block">Meus pedidos</span>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <UtensilsIcon size={16} />
              <span className="block">Pratos</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <SandwichIcon size={16} />
              <span className="block">Lanches</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <PizzaIcon size={16} />
              <span className="block">Pizza</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <FishIcon size={16} />
              <span className="block">Japonesa</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <IceCreamIcon size={16} />
              <span className="block">Sobremesa</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <GrapeIcon size={16} />
              <span className="block">Sucos</span>
            </Button>
          </div>

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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
