/*
  Warnings:

  - Added the required column `account_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `account_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `uid` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Account_UNIQUE`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `account_id` ON `User`(`account_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Account_FK` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
