import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; 

// Password hash (REGISTER)
export async function hashPassword( password: string) {
    return await bcrypt.hash( password, SALT_ROUNDS ); 
}

// Compare Password (LOGIN)
export async function comparePassword ( password: string, hashedPassword: string ) {
    return await bcrypt.compare( password, hashedPassword);
}