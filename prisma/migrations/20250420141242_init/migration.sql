/*
  Warnings:

  - Made the column `jurusan` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nama` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "jurusan" SET NOT NULL,
ALTER COLUMN "nama" SET NOT NULL;
