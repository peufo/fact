/*
  Warnings:

  - You are about to drop the column `slug` on the `Workspace` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Workspace_slug_key` ON `Workspace`;

-- AlterTable
ALTER TABLE `Workspace` DROP COLUMN `slug`;
