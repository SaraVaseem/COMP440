const hashingConfig = {
    parallelism: 1,
    memoryCost: 64000, // 64 MB
    timeCost: 3 // number of iterations
}

export default async function hashPassword(password) {
    let salt = crypto.randomBytes(16);
    return await argon2.hash(password, {
        ...hashingConfig,
        salt,
    });
}

async function verifyPassword(password, hash) {
    return await argon2.verify(hash, password);
}