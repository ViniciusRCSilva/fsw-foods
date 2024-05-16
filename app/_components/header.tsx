import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { HomeIcon, MenuIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import HeaderCategoryList from "./_header/_components/category-list";
import {
  LogInSection,
  LoggedUserOptions,
  SignOutSection,
} from "./_header/_helpers/auth";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-white p-5 lg:px-[15rem]">
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
        <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          <LogInSection />

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Link>
            </Button>

            <LoggedUserOptions />
          </div>

          <div className="py-6">
            <Separator />
          </div>

          <HeaderCategoryList />

          <SignOutSection />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
