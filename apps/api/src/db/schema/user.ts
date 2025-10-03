import {
    boolean,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHERS"]);

export const users = pgTable("users", {
    id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    photo: text("photo"),
    gender: genderEnum("gender"),
    dob: varchar("dob", { length: 10 }), // YYYY-MM-DD
    state: varchar("state", { length: 100 }), // lowercase
    city: varchar("city", { length: 100 }), // lowercase
    college: varchar("college", { length: 255 }), // References institute.id
    idCard: text("id_card"), // photo url id uploaded from frontend via cloudinary uploader
    mobile: varchar("mobile", { length: 20 }).notNull().unique(),
    festID: text("fest_id"),
    rollNumber: varchar("roll_number", { length: 50 }),
    firebaseId: varchar("firebase_id", { length: 255 }).notNull().unique(), // Firebase auth ID
    hasPaid: boolean("has_paid").default(false),
    receipt: text("receipt"),
    transactionID: varchar("transaction_id", { length: 255 }),
    hall: varchar("hall", { length: 100 }), // hall of residence alloted
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
