import { prisma } from "./prisma"
import { TooManyRequestsError } from "./errors"

const PASSWORD_MIN_LENGTH = 8
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`)
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export async function checkLoginAttempts(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      loginAttempts: true,
      lockedUntil: true,
    },
  })

  if (!user) return

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const remainingTime = Math.ceil(
      (user.lockedUntil.getTime() - Date.now()) / 1000 / 60
    )
    throw new TooManyRequestsError(
      `Account locked. Try again in ${remainingTime} minutes`
    )
  }

  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    const lockedUntil = new Date(Date.now() + LOCKOUT_DURATION)
    await prisma.user.update({
      where: { email },
      data: {
        lockedUntil,
        loginAttempts: 0,
      },
    })
    throw new TooManyRequestsError("Too many login attempts. Account locked for 15 minutes")
  }
}

export async function incrementLoginAttempts(email: string) {
  await prisma.user.update({
    where: { email },
    data: {
      loginAttempts: {
        increment: 1,
      },
      lastLoginAttempt: new Date(),
    },
  })
}

export async function resetLoginAttempts(email: string) {
  await prisma.user.update({
    where: { email },
    data: {
      loginAttempts: 0,
      lockedUntil: null,
    },
  })
} 