/**
 * Database Schema for United Holidays
 * Travel packages and visa services management
 */

import { mysqlTable, int, varchar, text, timestamp, decimal, json } from 'drizzle-orm/mysql-core';

// Travel Packages Table
export const packages = mysqlTable('packages', {
  id: int('id').primaryKey().autoincrement(),
  packageId: varchar('package_id', { length: 50 }).notNull().unique(), // e.g., 'maldives', 'switzerland'
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  price: int('price').notNull(),
  rating: decimal('rating', { precision: 2, scale: 1 }).notNull(),
  duration: varchar('duration', { length: 100 }).notNull(),
  groupSize: varchar('group_size', { length: 100 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  highlights: json('highlights').$type<string[]>(), // Array of highlight strings
  itinerary: json('itinerary').$type<Array<{ day: number; title: string; description: string }>>(), // Day-by-day itinerary
  included: json('included').$type<string[]>(), // What's included
  notIncluded: json('not_included').$type<string[]>(), // What's not included
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Visa Services Table
export const visas = mysqlTable('visas', {
  id: int('id').primaryKey().autoincrement(),
  visaId: varchar('visa_id', { length: 50 }).notNull().unique(), // e.g., 'schengen', 'uk'
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  countries: text('countries').notNull(),
  processingTime: varchar('processing_time', { length: 100 }).notNull(),
  validity: varchar('validity', { length: 100 }).notNull(),
  stayDuration: varchar('stay_duration', { length: 100 }).notNull(),
  price: varchar('price', { length: 50 }).notNull(),
  image: varchar('image', { length: 500 }).notNull(),
  requiredDocuments: json('required_documents').$type<string[]>(), // Array of required documents
  applicationProcess: json('application_process').$type<Array<{ step: number; title: string; description: string }>>(), // Application steps
  faqs: json('faqs').$type<Array<{ question: string; answer: string }>>(), // FAQs
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Homepage Content Table
export const homepageContent = mysqlTable('homepage_content', {
  id: int('id').primaryKey().autoincrement(),
  sectionId: varchar('section_id', { length: 50 }).notNull().unique(), // e.g., 'hero', 'testimonials'
  content: json('content').notNull(), // Flexible JSON content for each section
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Site Settings Table
export const siteSettings = mysqlTable('site_settings', {
  id: int('id').primaryKey().autoincrement(),
  settingKey: varchar('setting_key', { length: 100 }).notNull().unique(), // e.g., 'contact_phone', 'company_name'
  settingValue: text('setting_value').notNull(),
  settingType: varchar('setting_type', { length: 50 }).notNull(), // 'text', 'json', 'number'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Admin Users Table (for authentication)
export const adminUsers = mysqlTable('admin_users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
