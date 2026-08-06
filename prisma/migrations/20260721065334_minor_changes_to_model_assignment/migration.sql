/*
  Warnings:

  - You are about to drop the column `deadline` on the `assignments` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `assignments` table. All the data in the column will be lost.
  - Added the required column `submissionDate` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignments" DROP COLUMN "deadline",
DROP COLUMN "score",
ADD COLUMN     "submissionDate" TIMESTAMP(3) NOT NULL;
