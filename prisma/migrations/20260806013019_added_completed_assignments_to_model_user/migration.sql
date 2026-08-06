-- CreateTable
CREATE TABLE "_AssignmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AssignmentToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AssignmentToUser_B_index" ON "_AssignmentToUser"("B");

-- AddForeignKey
ALTER TABLE "_AssignmentToUser" ADD CONSTRAINT "_AssignmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToUser" ADD CONSTRAINT "_AssignmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
