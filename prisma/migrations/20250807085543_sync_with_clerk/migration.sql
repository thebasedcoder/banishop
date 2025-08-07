/*
  Warnings:

  - You are about to drop the column `lastVerifyRequestAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationTokenExpiresAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "lastVerifyRequestAt",
DROP COLUMN "password",
DROP COLUMN "status",
DROP COLUMN "verificationToken",
DROP COLUMN "verificationTokenExpiresAt",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."UserStatus";

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");
