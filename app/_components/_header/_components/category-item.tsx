import { Category } from "@prisma/client";
import Link from "next/link";
import { Button } from "../../ui/button";
import Image from "next/image";

interface HeaderCategoryItemProps {
  category: Category;
}

const HeaderCategoryItem = ({ category }: HeaderCategoryItemProps) => {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
      asChild
    >
      <Link href={`/categories/${category.id}/products`}>
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={16}
          width={16}
        />

        <span className="block">{category.name}</span>
      </Link>
    </Button>
  );
};

export default HeaderCategoryItem;
