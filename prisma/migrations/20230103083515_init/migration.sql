-- CreateEnum
CREATE TYPE "ScenarioType" AS ENUM ('FIXED', 'TEMPORARY');

-- CreateTable
CREATE TABLE "Scenarios" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "ScenarioType" NOT NULL DEFAULT 'FIXED',

    CONSTRAINT "Scenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mocks" (
    "id" SERIAL NOT NULL,
    "body" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "scenario" TEXT NOT NULL,

    CONSTRAINT "Mocks_pkey" PRIMARY KEY ("id")
);
