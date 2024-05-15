/*
  Warnings:

  - The primary key for the `UserFavoritesRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavoritesRestaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFavoritesRestaurant" DROP CONSTRAINT "UserFavoritesRestaurant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserFavoritesRestaurant_pkey" PRIMARY KEY ("userId", "restaurantId");
