/*
  Warnings:

  - You are about to drop the column `decription` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - Added the required column `content` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Note` DROP COLUMN `decription`,
    DROP COLUMN `title`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;
