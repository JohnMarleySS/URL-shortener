-- CreateTable
CREATE TABLE "public"."Url" (
    "id" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "public"."Url"("shortUrl");

-- CreateIndex
CREATE INDEX "Url_shortUrl_idx" ON "public"."Url"("shortUrl");
