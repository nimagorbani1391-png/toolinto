ALTER TABLE "Link" ADD COLUMN "userId" TEXT;
CREATE INDEX "Link_userId_createdAt_idx" ON "Link"("userId", "createdAt");
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
