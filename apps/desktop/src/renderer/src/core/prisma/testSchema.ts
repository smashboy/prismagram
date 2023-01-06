export const testSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String      @id @default(cuid())
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  authId    String      @unique
  username  String      @unique
  firstName String
  lastName  String?
  avatarId  String?
  orders    UserOrder[]
}

model BusinessUser {
  id        String        @id @default(cuid())
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  authId    String        @unique
  firstName String
  lastName  String
  companies Company[]
  positions StaffMember[]
}

model Company {
  id             String          @id @default(cuid())
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  name           String
  isVerified     Boolean         @default(false)
  description    String?
  logoId         String?
  staff          StaffMember[]
  dishes         Dish[]
  dishCategories DishCategory[]
  establishments Establishment[]
  owner          BusinessUser    @relation(fields: [ownerId], references: [id])
  ownerId        String
  menus          Menu[]
}

model Establishment {
  id          String                    @id @default(cuid())
  createdAt   DateTime                  @default(now())
  updatedAt   DateTime                  @updatedAt
  name        String
  isVerified  Boolean                   @default(false)
  description String?
  logoId      String?
  staff       StaffMember[]
  orders      Order[]
  qrCodes     EstablishmentMenuQrCode[]
  dishes      MenuDish[]
  categories  MenuDishCategory[]
  menu        Menu?
  company     Company                   @relation(fields: [companyId], references: [id])
  companyId   String
}

model EstablishmentMenuQrCode {
  id              String        @id @default(cuid())
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  name            String
  establishment   Establishment @relation(fields: [establishmentId], references: [id])
  establishmentId String
}

model Menu {
  id              String             @id @default(cuid())
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt
  categories      MenuDishCategory[]
  dishes          MenuDish[]
  dishes_         Dish[]
  company         Company            @relation(fields: [companyId], references: [id])
  establishment   Establishment      @relation(fields: [establishmentId], references: [id])
  establishmentId String             @unique
  companyId       String
}

model Dish {
  id          String       @id @default(cuid())
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  name        String
  isAlcohol   Boolean
  isArchived  Boolean      @default(false)
  description String?
  thumbnailId String?
  orders      DishOrder[]
  menuDishes  MenuDish[]
  menus       Menu[]
  company     Company      @relation(fields: [companyId], references: [id])
  category    DishCategory @relation(fields: [categoryId], references: [id])
  companyId   String
  categoryId  String
}

model MenuDishCategory {
  id              String        @id @default(cuid())
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  order           Int
  dishes          MenuDish[]
  menu            Menu          @relation(fields: [menuId], references: [id], onDelete: Cascade)
  category        DishCategory  @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  establishment   Establishment @relation(fields: [establishmentId], references: [id], onDelete: Cascade)
  establishmentId String
  categoryId      String
  menuId          String

  @@unique([categoryId, menuId, establishmentId])
}

model MenuDish {
  id              String           @id @default(cuid())
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  order           Int
  isAvailable     Boolean          @default(true)
  isPromoting     Boolean          @default(false)
  menu            Menu             @relation(fields: [menuId], references: [id], onDelete: Cascade)
  dish            Dish             @relation(fields: [dishId], references: [id], onDelete: Cascade)
  category        MenuDishCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  establishment   Establishment    @relation(fields: [establishmentId], references: [id], onDelete: Cascade)
  establishmentId String
  categoryId      String
  dishId          String
  menuId          String

  @@unique([dishId, categoryId, menuId, establishmentId])
}

model DishCategory {
  id             String             @id @default(uuid())
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt
  name           String
  dishes         Dish[]
  menuCategories MenuDishCategory[]
  company        Company            @relation(fields: [companyId], references: [id])
  companyId      String
}

model StaffMember {
  id             String          @id @default(uuid())
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  role           StaffRole       @default(MEMBER)
  establishments Establishment[]
  user           BusinessUser    @relation(fields: [userId], references: [id])
  company        Company         @relation(fields: [companyId], references: [id])
  companyId      String
  userId         String

  @@unique([companyId, userId])
}

model Order {
  id              Int           @id @default(autoincrement())
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  status          OrderStatus   @default(PENDING)
  userOrders      UserOrder[]
  establishment   Establishment @relation(fields: [establishmentId], references: [id])
  establishmentId String
}

model UserOrder {
  id      Int         @id @default(autoincrement())
  dishes  DishOrder[]
  order   Order       @relation(fields: [orderId], references: [id])
  user    User        @relation(fields: [userId], references: [id])
  orderId Int
  userId  String

  @@unique([orderId, userId])
}

model DishOrder {
  id          String          @id @default(uuid())
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  status      DishOrderStatus @default(PENDING)
  amount      Int
  dishes      Dish            @relation(fields: [dishId], references: [id])
  userOrder   UserOrder       @relation(fields: [userOrderId], references: [id])
  dishId      String
  userOrderId Int

  @@unique([dishId, userOrderId])
}

enum OrderStatus {
  PENDING
  IN_PROGRESS
  CANCELED
  COMPLETED
}

enum StaffRole {
  MEMBER
  ADMINISTRATOR
  ESTABLISHMENT_ADMINISTRATOR
  ATTENDANT
}

// enum MenuStatus {
//   DRAFT
//   PUBLISHED
//   ARCHIVED
// }

enum DishOrderStatus {
  PENDING
  ACCEPTED
  IN_PROGRESS
  CANCELED
  COMPLETED
}


`
