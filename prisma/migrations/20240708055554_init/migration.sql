/*
  Warnings:

  - The primary key for the `All` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `idAll` on the `All` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `All` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Favorites` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Habits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `idHabits` on the `Habits` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `Habits` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `idNotes` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Quotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Quotes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `IdUser` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "All" DROP CONSTRAINT "All_userId_fkey";

-- DropForeignKey
ALTER TABLE "Habits" DROP CONSTRAINT "Habits_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_userId_fkey";

-- AlterTable
ALTER TABLE "All" DROP CONSTRAINT "All_pkey",
ALTER COLUMN "idAll" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "All_pkey" PRIMARY KEY ("idAll");

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Habits" DROP CONSTRAINT "Habits_pkey",
ALTER COLUMN "idHabits" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Habits_pkey" PRIMARY KEY ("idHabits");

-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "idNotes" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("idNotes");

-- AlterTable
ALTER TABLE "Quotes" DROP CONSTRAINT "Quotes_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "IdUser" SET DATA TYPE SERIAL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser");

-- AddForeignKey
ALTER TABLE "All" ADD CONSTRAINT "All_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habits" ADD CONSTRAINT "Habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;
