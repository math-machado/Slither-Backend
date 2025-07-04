/*
  Warnings:

  - You are about to drop the column `max_user` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `max_users` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_users` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "max_user",
ADD COLUMN     "max_users" INTEGER NOT NULL,
ADD COLUMN     "number_users" INTEGER NOT NULL;
