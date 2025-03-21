import { boolean, pgTable, timestamp, uuid, varchar, interval, text } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255}).notNull(),
  completed: boolean().notNull().default(false),
  due_on: timestamp({mode: "date"}),
  notification: boolean().notNull().default(false),
  deadline: timestamp({ mode: "date", withTimezone: true }),
  time_it_takes: interval().notNull(),
  recurrence: text(),
  recurrence_enabled: boolean().notNull().default(false),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});