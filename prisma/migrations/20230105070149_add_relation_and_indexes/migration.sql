/*
  Warnings:

  - You are about to drop the column `scenario` on the `Mocks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scenario_name]` on the table `Mocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,key]` on the table `Scenarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scenario_name` to the `Mocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mocks" DROP COLUMN "scenario",
ADD COLUMN     "scenario_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Scenarios" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Mocks_scenario_name_key" ON "Mocks"("scenario_name");

-- CreateIndex
CREATE UNIQUE INDEX "Scenarios_name_key_key" ON "Scenarios"("name", "key");

-- AddForeignKey
ALTER TABLE "Scenarios" ADD CONSTRAINT "Scenarios_name_fkey" FOREIGN KEY ("name") REFERENCES "Mocks"("scenario_name") ON DELETE RESTRICT ON UPDATE CASCADE;
