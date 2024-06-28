-- CreateTable
CREATE TABLE "User" (
    "IdUser" BIGSERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(15) NOT NULL,
    "ItHasIntegration" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser")
);

-- CreateTable
CREATE TABLE "All" (
    "idAll" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "title" VARCHAR(80) NOT NULL,

    CONSTRAINT "All_pkey" PRIMARY KEY ("idAll")
);

-- CreateTable
CREATE TABLE "Habits" (
    "idHabits" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "recentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habits_pkey" PRIMARY KEY ("idHabits")
);

-- CreateTable
CREATE TABLE "Notes" (
    "idNotes" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "IsFavorite" BOOLEAN NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "body" VARCHAR(250) NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("idNotes")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" BIGSERIAL NOT NULL,
    "IsFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" BIGSERIAL NOT NULL,
    "phrase" VARCHAR(50) NOT NULL,
    "author" VARCHAR(25) NOT NULL,
    "IdFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_IsFavorite_key" ON "Notes"("IsFavorite");

-- AddForeignKey
ALTER TABLE "All" ADD CONSTRAINT "All_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habits" ADD CONSTRAINT "Habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_IsFavorite_fkey" FOREIGN KEY ("IsFavorite") REFERENCES "Notes"("IsFavorite") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_IdFavorite_fkey" FOREIGN KEY ("IdFavorite") REFERENCES "Notes"("IsFavorite") ON DELETE RESTRICT ON UPDATE CASCADE;
