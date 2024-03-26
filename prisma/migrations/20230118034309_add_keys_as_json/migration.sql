/*
  Warnings:

  - You are about to drop the column `key` on the `Scenarios` table. All the data in the column will be lost.
  - Added the required column `attributes` to the `Scenarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variables` to the `Scenarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Scenarios_name_key_key";

-- AlterTable
ALTER TABLE "Scenarios" DROP COLUMN "key",
ADD COLUMN     "attributes" JSONB NOT NULL,
ADD COLUMN     "variables" JSONB NOT NULL;
