/*
  Warnings:

  - You are about to drop the `Mobil` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jurusan" TEXT,
ADD COLUMN     "nama" TEXT;

-- DropTable
DROP TABLE "Mobil";
