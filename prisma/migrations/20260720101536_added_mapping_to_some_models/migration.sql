/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AssignmentToClass" DROP CONSTRAINT "_AssignmentToClass_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssignmentToClass" DROP CONSTRAINT "_AssignmentToClass_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToUser" DROP CONSTRAINT "_ClassToUser_A_fkey";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "Class";

-- CreateTable
CREATE TABLE "class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "score" INTEGER,
    "totalScore" INTEGER,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_slug_key" ON "class"("slug");

-- AddForeignKey
ALTER TABLE "_ClassToUser" ADD CONSTRAINT "_ClassToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToClass" ADD CONSTRAINT "_AssignmentToClass_A_fkey" FOREIGN KEY ("A") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToClass" ADD CONSTRAINT "_AssignmentToClass_B_fkey" FOREIGN KEY ("B") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
