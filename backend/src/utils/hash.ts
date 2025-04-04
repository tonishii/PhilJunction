import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS!);

// self-explanatory
export const hashPassword = async (password: string): Promise<any> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch(err: unknown) {
    console.error(err);
  }
}

export const comparePassword = async (password: string, encrypted: string): Promise<boolean> => {
  return await bcrypt.compare(password, encrypted);
}
