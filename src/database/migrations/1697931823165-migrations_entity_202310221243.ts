import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationsEntity2023102212431697931823165
  implements MigrationInterface
{
  name = 'MigrationsEntity2023102212431697931823165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bank" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(300) NOT NULL, "name" character varying(300) NOT NULL, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "disco" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "is_available" character varying(300) NOT NULL, CONSTRAINT "PK_2373492e887ad07510d3e00693d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "data_bundle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(300) NOT NULL, "title" character varying(300) NOT NULL, "price" character varying(300) NOT NULL, "validity" character varying(300) NOT NULL, "airtimeNetworkId" uuid, CONSTRAINT "PK_730659cdd8ffc4dff80603452a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "data_code_in" ON "data_bundle" ("code") `,
    );
    await queryRunner.query(
      `CREATE TABLE "airtime_network" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "network" character varying(300) NOT NULL, "code" character varying(300) NOT NULL, "maxVend" character varying(300) DEFAULT '10000', "imageUrl" character varying(300) DEFAULT 'https://res.cloudinary.com/funbar/image/upload/v1693918356/cardex/defaultbill.png', CONSTRAINT "UQ_ee67cd010a00b836a674fb2efd0" UNIQUE ("code"), CONSTRAINT "PK_2430fa8fd6660ff2c0d8eede427" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "airtime_networks_ind" ON "airtime_network" ("code") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tv_network" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "network" character varying(300) NOT NULL, "code" character varying(300) NOT NULL, CONSTRAINT "PK_0cf675ebdb1dd97e2b0c919846a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tv_sub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "network" character varying(300) NOT NULL, "title" character varying(300) NOT NULL, "code" character varying(300) NOT NULL, "price" character varying(300) NOT NULL, "available" character varying(300), "allowance" character varying(300), "tvnetId" uuid, CONSTRAINT "PK_9cab16966b340ba251f7f23814a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying(300) NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "token" character varying(300), "pin" character varying(300), "userId" uuid, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "isemail_verify_in" ON "auth" ("isEmailVerified") `,
    );
    await queryRunner.query(`CREATE INDEX "pin_auth_ind" ON "auth" ("pin") `);
    await queryRunner.query(
      `CREATE TYPE "public"."wallet_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagpayWalletId" character varying(300) NOT NULL, "tagpayCustomerId" character varying(300) NOT NULL, "accountName" character varying(300) NOT NULL, "accountNumber" character varying(300) NOT NULL, "accountphoneNumber" character varying(300) DEFAULT 'true', "status" "public"."wallet_status_enum" NOT NULL DEFAULT 'active', "accountTier" character varying(300) NOT NULL DEFAULT 'TIER_2', "userId" uuid, CONSTRAINT "UQ_eade8556fd57a767e7905e68dac" UNIQUE ("accountNumber"), CONSTRAINT "REL_35472b1fe48b6330cd34970956" UNIQUE ("userId"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "tagpay_customer_id" ON "wallet" ("tagpayCustomerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "card_customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sudoCustomerId" character varying(300) NOT NULL, "type" character varying(300) NOT NULL, "userId" uuid, CONSTRAINT "REL_50fdbeca46cb904de34979bde1" UNIQUE ("userId"), CONSTRAINT "PK_f5aa0baf4ff1b397b3f946a443e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deviceToken" character varying(500) NOT NULL, "userId" uuid, CONSTRAINT "REL_ba0cbbc3097f061e197e71c112" UNIQUE ("userId"), CONSTRAINT "PK_592ce89b9ea1a268d6140f60422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "compliance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "DocumentType" character varying(300) NOT NULL, "DocumentUrl" text NOT NULL, "complianceStatus" character varying(300) NOT NULL DEFAULT 'PENDING', "userId" uuid, CONSTRAINT "PK_d3ba3eee2f77763eb15cb889dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inapp_notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(300) NOT NULL, "message" text NOT NULL, "imageUrl" character varying(300), "status" character varying(300) NOT NULL DEFAULT 'UNREAD', "userId" uuid, CONSTRAINT "PK_f6e0ead14fce1e45ec9456bedd4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sms_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "smsMessage" text NOT NULL, "status" character varying(300) NOT NULL, "userId" uuid, CONSTRAINT "PK_e8d3a5a95a6c5d9df9693b4f831" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHERS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_creationprogress_enum" AS ENUM('IN-PROGRESS', 'COMPLETED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(300) NOT NULL, "firstName" character varying(300), "lastName" character varying(300), "middleName" character varying(300), "state" character varying(300), "username" character varying(300), "sendsms" boolean NOT NULL DEFAULT true, "sendemail" boolean NOT NULL DEFAULT true, "status" "public"."user_status_enum" NOT NULL DEFAULT 'active', "gender" "public"."user_gender_enum", "creationProgress" "public"."user_creationprogress_enum" NOT NULL DEFAULT 'IN-PROGRESS', "dateOfBirth" character varying(300), "phoneNumber" character varying(300), "bvn" character varying(300), "unreal_bvn" character varying(300), "roles" text array NOT NULL DEFAULT '{USER}', "address" text, "city" character varying(300), "houseNumber" character varying(300), "streetName" character varying(300), "profileImage" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_c8b77c31d56c312fac0471d21f4" UNIQUE ("unreal_bvn"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "email_index_auth" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_account_status_ind" ON "user" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "phone_number_in" ON "user" ("phoneNumber") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_transtype_enum" AS ENUM('CREDIT', 'DEBIT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_transfertype_enum" AS ENUM('WALLET_TO_WALLET', 'WALLET_TO_BANK', 'BILLING_AIRTIME', 'BILLING_DATABUNDLE', 'BILLING_ELECTRICITY', 'BILLING_TV', 'CARD_FUNDING', 'CARD_WITHDRAWAL', 'CARD_DEBIT', 'CARD_CREATION')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sourceAccountNo" character varying(300), "targetAccountNo" character varying(300), "sourceAccountName" character varying(300), "targetAccountName" character varying(300), "SessionId" character varying(300), "transType" "public"."transaction_transtype_enum" NOT NULL, "serviceImageUrl" character varying(300), "tagapayTransRef" character varying(300), "lomaTransRef" character varying(300), "TransRef" character varying(300) NOT NULL, "amount" numeric, "vat" numeric, "total" numeric, "dollaramount" character varying(300), "sourceBankName" character varying(300) NOT NULL, "targetBankName" character varying(300) NOT NULL, "Transfee" numeric, "meternumber" character varying, "smartcard_number" character varying, "metertoken" character varying, "discoRef" character varying, "narration" text, "transStatus" character varying(300) NOT NULL, "transferType" "public"."transaction_transfertype_enum" NOT NULL, "reason" text, "userId" uuid, "cardId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "session_id_in" ON "transaction" ("SessionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "trans_types_in" ON "transaction" ("transType") `,
    );
    await queryRunner.query(
      `CREATE INDEX "trans_ref_in" ON "transaction" ("TransRef") `,
    );
    await queryRunner.query(
      `CREATE INDEX "trans_status_in" ON "transaction" ("transStatus") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."card_delivery_address_deliverystatus_enum" AS ENUM('REQUESTED', 'In Production', 'Shipped Out', 'In Delivery', 'Delivered')`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_delivery_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "state" character varying(300) NOT NULL, "streetName" text NOT NULL, "city" character varying(300) NOT NULL, "lga" character varying(300) NOT NULL, "landmark" character varying(300) NOT NULL, "phoneNumber" character varying(300) NOT NULL, "deliveryStatus" "public"."card_delivery_address_deliverystatus_enum" NOT NULL DEFAULT 'REQUESTED', "cardmappedId" uuid, CONSTRAINT "REL_55f941cc786ef8d7df11b4d5fc" UNIQUE ("cardmappedId"), CONSTRAINT "PK_967389b1bbb7589a6d35591b910" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."card_mapped_category_enum" AS ENUM('Visa', 'MasterCard', 'Verve')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."card_mapped_cardstatus_enum" AS ENUM('active', 'inactive', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_mapped" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sudoCardId" character varying(300), "cardAccountId" character varying(300), "type" character varying(300) NOT NULL, "category" "public"."card_mapped_category_enum" NOT NULL, "pan" character varying(300), "cardStatus" "public"."card_mapped_cardstatus_enum" NOT NULL DEFAULT 'active', "userId" uuid, CONSTRAINT "PK_d8160c079f641f39f824e5caf1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_channel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "channel" json NOT NULL, "cardmapId" uuid, CONSTRAINT "REL_f13fc2d35833fd10b0233dedac" UNIQUE ("cardmapId"), CONSTRAINT "PK_38f4fa6d05be53b8e711394f95a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "kyc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "IdentificationType" character varying(300) NOT NULL, "IdentificationNumber" character varying(300) NOT NULL, "firstName" character varying(300) NOT NULL, "lastName" character varying(300) NOT NULL, "middleName" character varying(300), "gender" character varying(300), "phoneNumber" character varying(300), "dateOfBirth" character varying(300), CONSTRAINT "PK_84ab2e81ea9700d29dda719f3be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "identificatio_type_ind" ON "kyc" ("IdentificationType") `,
    );
    await queryRunner.query(
      `CREATE INDEX "identification_number_ind" ON "kyc" ("IdentificationNumber") `,
    );
    await queryRunner.query(
      `CREATE TABLE "email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(300) NOT NULL, "verificationCode" character varying(300) NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "expiry" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fee_manage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(300) NOT NULL, "value" character varying(300) NOT NULL, CONSTRAINT "PK_139f7e7f7d502471ac6804eadd9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "charge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerIdDebited" character varying(300) NOT NULL, "walletNoDebited" character varying(300) NOT NULL, "serviceType" character varying(300) NOT NULL, "serviceFee" numeric NOT NULL, "totalAmount" numeric NOT NULL, "chargeStatus" character varying(300) NOT NULL, "TransRef" character varying(300) NOT NULL, CONSTRAINT "PK_ac0381acde3bdffe41ad57cd942" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "trans_charge_ref_in" ON "charge" ("TransRef") `,
    );
    await queryRunner.query(
      `CREATE TABLE "phone_verification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "phoneNumber" character varying(300) NOT NULL, "verificationCode" character varying(300) NOT NULL, "isPhoneVerified" boolean NOT NULL DEFAULT false, "expiry" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_028d02e37d668b794d82247591b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "webhook" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "event" character varying(300) NOT NULL, "data" text NOT NULL, CONSTRAINT "PK_e6765510c2d078db49632b59020" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."app_setting_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "app_setting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "serviceName" character varying(300) NOT NULL, "status" "public"."app_setting_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "PK_10b1e1bf64917bdb640f8eedb31" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "data_bundle" ADD CONSTRAINT "FK_2d45126c324384d06de7be68fa9" FOREIGN KEY ("airtimeNetworkId") REFERENCES "airtime_network"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tv_sub" ADD CONSTRAINT "FK_b7f477eeaeb667a3c7de972fd46" FOREIGN KEY ("tvnetId") REFERENCES "tv_network"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_customer" ADD CONSTRAINT "FK_50fdbeca46cb904de34979bde13" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "device_token" ADD CONSTRAINT "FK_ba0cbbc3097f061e197e71c112e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "compliance" ADD CONSTRAINT "FK_5a5187c661537b15db4af9dfaa2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inapp_notification" ADD CONSTRAINT "FK_6cfdfa0b380507f129c4a5f2701" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sms_users" ADD CONSTRAINT "FK_74a361a923bc153156d54a30cd4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_59c844d96a0248b1f7b0946a58b" FOREIGN KEY ("cardId") REFERENCES "card_mapped"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_delivery_address" ADD CONSTRAINT "FK_55f941cc786ef8d7df11b4d5fca" FOREIGN KEY ("cardmappedId") REFERENCES "card_mapped"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_mapped" ADD CONSTRAINT "FK_6ee4bb9b3ed28228bd75e1241f4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_channel" ADD CONSTRAINT "FK_f13fc2d35833fd10b0233dedac7" FOREIGN KEY ("cardmapId") REFERENCES "card_mapped"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card_channel" DROP CONSTRAINT "FK_f13fc2d35833fd10b0233dedac7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_mapped" DROP CONSTRAINT "FK_6ee4bb9b3ed28228bd75e1241f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_delivery_address" DROP CONSTRAINT "FK_55f941cc786ef8d7df11b4d5fca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_59c844d96a0248b1f7b0946a58b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sms_users" DROP CONSTRAINT "FK_74a361a923bc153156d54a30cd4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inapp_notification" DROP CONSTRAINT "FK_6cfdfa0b380507f129c4a5f2701"`,
    );
    await queryRunner.query(
      `ALTER TABLE "compliance" DROP CONSTRAINT "FK_5a5187c661537b15db4af9dfaa2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device_token" DROP CONSTRAINT "FK_ba0cbbc3097f061e197e71c112e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_customer" DROP CONSTRAINT "FK_50fdbeca46cb904de34979bde13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tv_sub" DROP CONSTRAINT "FK_b7f477eeaeb667a3c7de972fd46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "data_bundle" DROP CONSTRAINT "FK_2d45126c324384d06de7be68fa9"`,
    );
    await queryRunner.query(`DROP TABLE "app_setting"`);
    await queryRunner.query(`DROP TYPE "public"."app_setting_status_enum"`);
    await queryRunner.query(`DROP TABLE "webhook"`);
    await queryRunner.query(`DROP TABLE "phone_verification"`);
    await queryRunner.query(`DROP INDEX "public"."trans_charge_ref_in"`);
    await queryRunner.query(`DROP TABLE "charge"`);
    await queryRunner.query(`DROP TABLE "fee_manage"`);
    await queryRunner.query(`DROP TABLE "email"`);
    await queryRunner.query(`DROP INDEX "public"."identification_number_ind"`);
    await queryRunner.query(`DROP INDEX "public"."identificatio_type_ind"`);
    await queryRunner.query(`DROP TABLE "kyc"`);
    await queryRunner.query(`DROP TABLE "card_channel"`);
    await queryRunner.query(`DROP TABLE "card_mapped"`);
    await queryRunner.query(`DROP TYPE "public"."card_mapped_cardstatus_enum"`);
    await queryRunner.query(`DROP TYPE "public"."card_mapped_category_enum"`);
    await queryRunner.query(`DROP TABLE "card_delivery_address"`);
    await queryRunner.query(
      `DROP TYPE "public"."card_delivery_address_deliverystatus_enum"`,
    );
    await queryRunner.query(`DROP INDEX "public"."trans_status_in"`);
    await queryRunner.query(`DROP INDEX "public"."trans_ref_in"`);
    await queryRunner.query(`DROP INDEX "public"."trans_types_in"`);
    await queryRunner.query(`DROP INDEX "public"."session_id_in"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(
      `DROP TYPE "public"."transaction_transfertype_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."transaction_transtype_enum"`);
    await queryRunner.query(`DROP INDEX "public"."phone_number_in"`);
    await queryRunner.query(`DROP INDEX "public"."user_account_status_ind"`);
    await queryRunner.query(`DROP INDEX "public"."email_index_auth"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_creationprogress_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`DROP TABLE "sms_users"`);
    await queryRunner.query(`DROP TABLE "inapp_notification"`);
    await queryRunner.query(`DROP TABLE "compliance"`);
    await queryRunner.query(`DROP TABLE "device_token"`);
    await queryRunner.query(`DROP TABLE "card_customer"`);
    await queryRunner.query(`DROP INDEX "public"."tagpay_customer_id"`);
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(`DROP TYPE "public"."wallet_status_enum"`);
    await queryRunner.query(`DROP INDEX "public"."pin_auth_ind"`);
    await queryRunner.query(`DROP INDEX "public"."isemail_verify_in"`);
    await queryRunner.query(`DROP TABLE "auth"`);
    await queryRunner.query(`DROP TABLE "tv_sub"`);
    await queryRunner.query(`DROP TABLE "tv_network"`);
    await queryRunner.query(`DROP INDEX "public"."airtime_networks_ind"`);
    await queryRunner.query(`DROP TABLE "airtime_network"`);
    await queryRunner.query(`DROP INDEX "public"."data_code_in"`);
    await queryRunner.query(`DROP TABLE "data_bundle"`);
    await queryRunner.query(`DROP TABLE "disco"`);
    await queryRunner.query(`DROP TABLE "bank"`);
  }
}
