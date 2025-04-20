-- CreateTable
CREATE TABLE "Mobil" (
    "id" SERIAL NOT NULL,
    "nama_mobil" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "bahan_bakar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mobil_pkey" PRIMARY KEY ("id")
);
