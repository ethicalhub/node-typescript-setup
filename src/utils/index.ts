export const genUserName = (): string => {
    const randomChars = Math.random().toString(36).substring(2, 10)
    return `user-${randomChars}`
}
