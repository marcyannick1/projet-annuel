/*
  Warnings:

  - Added the required column `format` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `format` VARCHAR(191) NOT NULL;
