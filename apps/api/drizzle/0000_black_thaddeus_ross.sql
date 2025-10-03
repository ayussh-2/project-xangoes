CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHERS');--> statement-breakpoint
CREATE TYPE "public"."college_status" AS ENUM('BLACKLISTED', 'ALLOWED', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."fest_status" AS ENUM('ACTIVE', 'DRAFT', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."club_sub_type" AS ENUM('TECHNICAL', 'CULTURAL', 'SPORTS', 'HACKATHON', 'LITERARY', 'FMS');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('ACTIVE', 'DRAFT', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."repeat_day" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');--> statement-breakpoint
CREATE TYPE "public"."institute_college_status" AS ENUM('BLACKLISTED', 'ALLOWED', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('REGISTRATION', 'MERCH', 'EVENT');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"photo" text,
	"gender" "gender",
	"dob" varchar(10),
	"state" varchar(100),
	"city" varchar(100),
	"college" varchar(255),
	"id_card" text,
	"mobile" varchar(20) NOT NULL,
	"fest_id" text,
	"roll_number" varchar(50),
	"firebase_id" varchar(255) NOT NULL,
	"has_paid" boolean DEFAULT false,
	"receipt" text,
	"transaction_id" varchar(255),
	"hall" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_mobile_unique" UNIQUE("mobile"),
	CONSTRAINT "users_firebase_id_unique" UNIQUE("firebase_id")
);
--> statement-breakpoint
CREATE TABLE "fests" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"tagline" varchar(500),
	"logo" text,
	"description" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" "fest_status" DEFAULT 'ACTIVE',
	"registration_fee" integer,
	"college_status" "college_status" DEFAULT 'ALLOWED',
	"society" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clubs" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sub_type" "club_sub_type" NOT NULL,
	"description" text,
	"logo" text,
	"events" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sub_heading" varchar(500),
	"prize_money" json,
	"type" varchar(100),
	"description" text NOT NULL,
	"poster" text NOT NULL,
	"rules" text[] NOT NULL,
	"location" varchar(255),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"club_id" varchar(255),
	"contact" text[] NOT NULL,
	"poc_id" text[] NOT NULL,
	"weekly" boolean DEFAULT false,
	"repeat_day" "repeat_day",
	"priority" integer DEFAULT 1,
	"status" "event_status" DEFAULT 'DRAFT',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institutes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"address" text NOT NULL,
	"logo" text,
	"college_status" "institute_college_status",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"amount" integer,
	"user_id" varchar(255) NOT NULL,
	"transaction_id" varchar(255),
	"type" "transaction_type" NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"fest_id" varchar(255),
	"comment" text,
	"screenshot" text,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_registrations" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"event_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"team_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"members" text[],
	"fest_id" varchar(255) NOT NULL,
	"club_id" varchar(255) NOT NULL,
	"event_id" varchar(255) NOT NULL,
	"team_lead" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
