/*
  Warnings:

  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `size` BIGINT NOT NULL;