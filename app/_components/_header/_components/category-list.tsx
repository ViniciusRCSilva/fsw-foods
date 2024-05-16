import { db } from "@/app/_lib/prisma";
import HeaderCategoryItem from "./category-item";

const HeaderCategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <HeaderCategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default HeaderCategoryList;
