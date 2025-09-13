/*
  Warnings:

  - The values [BOLOCKED] on the enum `UserSTATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `nededPasswordChange` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserSTATUS_new" AS ENUM ('ACTIVE', 'BLOCKED');
ALTER TABLE "public"."users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."users" ALTER COLUMN "status" TYPE "public"."UserSTATUS_new" USING ("status"::text::"public"."UserSTATUS_new");
ALTER TYPE "public"."UserSTATUS" RENAME TO "UserSTATUS_old";
ALTER TYPE "public"."UserSTATUS_new" RENAME TO "UserSTATUS";
DROP TYPE "public"."UserSTATUS_old";
ALTER TABLE "public"."users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "nededPasswordChange",
ADD COLUMN     "needsPasswordChange" BOOLEAN NOT NULL DEFAULT true;
