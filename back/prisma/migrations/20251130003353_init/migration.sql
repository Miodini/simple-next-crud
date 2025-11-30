-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('M', 'F', 'O');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "gender" "UserGender" NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "uid" VARCHAR(36) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "account_id" ON "User"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_UNIQUE" ON "Account"("uid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Account_FK" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
