-- CreateEnum
CREATE TYPE "DonationScheme" AS ENUM ('STUDENT_ENGLISH', 'STUDENT_ENGLISH_SOFTSKILLS', 'STUDENT_ENGLISH_SOFTSKILLS_IT_BFSI', 'RURAL_ENTREPRENEURS', 'GENERAL');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('CREATED', 'PAID', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "scheme" "DonationScheme" NOT NULL,
    "schemeLabel" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "donorName" TEXT NOT NULL,
    "donorEmail" TEXT NOT NULL,
    "donorPan" TEXT NOT NULL,
    "donorMobile" TEXT NOT NULL,
    "donorPhone" TEXT,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "paymentMethod" TEXT,
    "vpa" TEXT,
    "razorpayCreatedAt" TIMESTAMP(3),
    "status" "DonationStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_reference_key" ON "Donation"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_razorpayOrderId_key" ON "Donation"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_razorpayPaymentId_key" ON "Donation"("razorpayPaymentId");

-- CreateIndex
CREATE INDEX "Donation_status_idx" ON "Donation"("status");

-- CreateIndex
CREATE INDEX "Donation_donorEmail_idx" ON "Donation"("donorEmail");

-- CreateIndex
CREATE INDEX "Donation_createdAt_idx" ON "Donation"("createdAt");
