export const testSchema = `
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// --------------------------------------

model User {
  id                Int                      @id @default(autoincrement())
  createdAt         DateTime                 @default(now())
  updatedAt         DateTime                 @updatedAt
  email             String                   @unique
  username          String                   @unique
  hashedPassword    String?
  isEmailVerified   Boolean                  @default(false)
  isVerified        Boolean                  @default(false)
  avatarUrl         String?
  bio               String?
  role              UserRole                 @default(USER)
  tokens            Token[]
  sessions          Session[]
  projectMember     ProjectMember[]
  feedback          ProjectFeedback[]        @relation("ProjectFeedbackAuthor")
  changelogFeedback ChangelogFeedback[]
  upvoted           ProjectFeedback[]
  messages          ProjectFeedbackMessage[]
  project           Project[]
  notifications     Notification[]
}

model Notification {
  id                       Int                       @id @default(autoincrement())
  createdAt                DateTime                  @default(now())
  isRead                   Boolean                   @default(false)
  isSaved                  Boolean                   @default(false)
  user                     User                      @relation(fields: [userId], references: [id])
  userId                   Int
  feedbackNotification     FeedbackNotification?
  newChangelogNotification NewChangelogNotification?
  projectInvite            ProjectInvite?
}

model FeedbackNotification {
  id             Int                      @id @default(autoincrement())
  createdAt      DateTime                 @default(now())
  type           FeedbackNotificationType
  projectSlug    String
  feedbackTitle  String
  newStatus      FeedbackStatus?
  feedbackId     Int
  notification   Notification             @relation(fields: [notificationId], references: [id])
  notificationId Int                      @unique
}

model NewChangelogNotification {
  id              Int          @id @default(autoincrement())
  createdAt       DateTime     @default(now())
  title           String
  projectSlug     String
  projectName     String
  previewImageUrl String?
  changelogSlug   String
  notification    Notification @relation(fields: [notificationId], references: [id])
  notificationId  Int          @unique
}

model Session {
  id                 Int       @id @default(autoincrement())
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  expiresAt          DateTime?
  handle             String    @unique
  hashedSessionToken String?
  antiCSRFToken      String?
  publicData         String?
  privateData        String?
  user               User?     @relation(fields: [userId], references: [id])
  userId             Int?
}

model Token {
  id          Int       @id @default(autoincrement())
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  hashedToken String
  type        TokenType
  expiresAt   DateTime
  sentTo      String
  user        User      @relation(fields: [userId], references: [id])
  userId      Int

  @@unique([hashedToken, type])
}

model Project {
  id          Int                @id @default(autoincrement())
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt
  name        String
  color       String
  isPrivate   Boolean
  slug        String             @unique
  description String?
  websiteUrl  String?
  logoUrl     String?
  feedback    ProjectFeedback[]
  members     ProjectMember[]
  followers   User[]
  landing     ProjectLanding?
  changelogs  ProjectChangelog[]
  roadmaps    ProjectRoadmap[]
  settings    ProjectSettings?
  invites     ProjectInvite[]
}

model ProjectMember {
  id        Int               @id @default(autoincrement())
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt
  user      User              @relation(fields: [userId], references: [id])
  role      ProjectMemberRole @default(MEMBER)
  project   Project           @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId Int
  userId    Int
  assigned  ProjectFeedback[]

  @@unique([projectId, userId])
}

model ProjectInvite {
  id             Int          @id @default(autoincrement())
  createdAt      DateTime     @default(now())
  project        Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId      Int
  notification   Notification @relation(fields: [notificationId], references: [id], onDelete: Cascade)
  notificationId Int          @unique
}

model ProjectLanding {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  content   String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId Int      @unique
}

model ProjectChangelog {
  id              Int                 @id @default(autoincrement())
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt
  title           String
  previewImageUrl String?
  slug            String
  content         String
  project         Project             @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId       Int
  feedback        ChangelogFeedback[]

  @@unique([projectId, slug])
}

model ChangelogFeedback {
  id          Int              @id @default(autoincrement())
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  rating      Int
  description String?
  changelog   ProjectChangelog @relation(fields: [changelogId], references: [id], onDelete: Cascade)
  changelogId Int
  user        User?            @relation(fields: [userId], references: [id])
  userId      Int?

  @@unique([userId, changelogId])
}

model ProjectRoadmap {
  id          Int               @id @default(autoincrement())
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  slug        String
  name        String
  dueTo       DateTime?
  description String?
  isArchived  Boolean           @default(false)
  project     Project           @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId   Int
  feedback    ProjectFeedback[]

  @@unique([projectId, slug])
}

model ProjectFeedback {
  id           Int                      @id @default(autoincrement())
  createdAt    DateTime                 @default(now())
  updatedAt    DateTime                 @updatedAt
  participants ProjectMember[]
  roadmaps     ProjectRoadmap[]
  labels       ProjectFeedbackLabel[]
  project      Project                  @relation(fields: [projectSlug], references: [slug], onDelete: Cascade)
  projectSlug  String
  author       User                     @relation("ProjectFeedbackAuthor", fields: [authorId], references: [id])
  authorId     Int
  upvotedBy    User[]
  messages     ProjectFeedbackMessage[]
  content      ProjectFeedbackContent?  @relation("Feedback_migration")
}

model ProjectFeedbackMessage {
  id         Int                     @id @default(autoincrement())
  createdAt  DateTime                @default(now())
  updatedAt  DateTime                @updatedAt
  category   FeedbackMessageCategory @default(PUBLIC)
  content    String
  author     User                    @relation(fields: [userId], references: [id])
  userId     Int
  feedback   ProjectFeedback         @relation(fields: [feedbackId], references: [id], onDelete: Cascade)
  feedbackId Int
}

model ProjectFeedbackContent {
  id                Int
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  title             String
  category          FeedbackCategory
  status            FeedbackStatus   @default(PENDING)
  content           String
  projectSlug       String
  projectFeedback   ProjectFeedback  @relation("Feedback_migration", fields: [projectFeedbackId], references: [id], onDelete: Cascade)
  projectFeedbackId Int              @unique

  @@id([id, projectSlug])
}

model ProjectSettings {
  id        Int                    @id @default(autoincrement())
  createdAt DateTime               @default(now())
  updatedAt DateTime               @updatedAt
  project   Project                @relation(fields: [projectId], references: [id], onDelete: Cascade)
  labels    ProjectFeedbackLabel[]
  projectId Int                    @unique
}

model ProjectFeedbackLabel {
  id          String            @id @default(cuid())
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  name        String
  description String?
  color       String
  settings    ProjectSettings   @relation(fields: [settingsId], references: [id], onDelete: Cascade)
  settingsId  Int
  feedback    ProjectFeedback[]
}

enum FeedbackCategory {
  BUG
  FEATURE
  IMPROVEMENT
}

enum TokenType {
  RESET_PASSWORD
}

enum UserRole {
  ADMIN
  MODERATOR
  USER
}

enum FeedbackStatus {
  ON_REVIEW
  PLANNED
  IN_PROGRESS
  BLOCKED
  CANCELED
  COMPLETED
  PENDING
  DUPLICATE
}

enum FeedbackMessageCategory {
  PUBLIC
  PRIVATE
  INTERNAL
}

enum ProjectMemberRole {
  FOUNDER
  ADMIN
  MODERATOR
  MEMBER
}

enum FeedbackNotificationType {
  ASSIGNED
  STATUS_CHANGED
  ADDED_TO_ROADMAP
  NEW_PUBLIC_MESSAGE
  NEW_PRIVATE_MESSAGE
  NEW_INTERNAL_MESSAGE
}

`
