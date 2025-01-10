import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    return await argon2.hash(password, {
        type: argon2.argon2id, // utilisation de l'algo argon2id pour le hashage -> le + recommandé

        // v options hardware en dessous
        memoryCost: 2 ** 16, // 2^16=65536=64MB
        timeCost: 3, // 3 passes -> cad 3 itérations pour le hashage
        parallelism: 1, // 1 thread (coeur CPU) utilisé pour le hashage 
        salt: Buffer.from("SuperSaltGentil") // "clé" ou salt de hashage pour rendre le hashage unique
    });
}

export async function verifyPassword(hashedPassword: string, inputPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, inputPassword);
}
