-- CreateEnum
CREATE TYPE "RouteMethod" AS ENUM ('POST', 'GET', 'PUT', 'PATCH', 'DELETE');

-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL,
    "method" "RouteMethod" NOT NULL,
    "configuration" JSONB NOT NULL,
    "proxy_domain_id" INTEGER NOT NULL,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProxyDomains" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProxyDomains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Routes_path_idx" ON "Routes"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Routes_path_method_key" ON "Routes"("path", "method");

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_proxy_domain_id_fkey" FOREIGN KEY ("proxy_domain_id") REFERENCES "ProxyDomains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
