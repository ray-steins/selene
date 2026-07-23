/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `assignments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignments" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "assignments_slug_key" ON "assignments"("slug");
