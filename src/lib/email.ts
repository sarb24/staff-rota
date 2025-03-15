import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

// Send verification email
export const sendVerificationEmail = async (email: string) => {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "verification", email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to send verification email")
    }

    return data
  } catch (error) {
    console.error("Verification email error:", error)
    throw error
  }
}

// Send password reset email
export const sendPasswordResetEmail = async (email: string) => {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "reset", email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to send reset email")
    }

    return data
  } catch (error) {
    console.error("Reset email error:", error)
    throw error
  }
}

// Verify email token
export const verifyEmailToken = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    })

    if (!user) throw new Error("Invalid verification token")

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      },
    })

    return user
  } catch (error) {
    console.error("Verify token error:", error)
    throw error
  }
}

// Verify password reset token
export const verifyResetToken = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() },
      },
    })

    if (!user) throw new Error("Invalid or expired reset token")

    return user
  } catch (error) {
    console.error("Verify reset token error:", error)
    throw error
  }
}

// Reset password
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const user = await verifyResetToken(token)

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    })

    return user
  } catch (error) {
    console.error("Reset password error:", error)
    throw error
  }
} 