import bcrypt from "bcryptjs";

async function validPassword(enteredPass, storedPass) {
  const match = await bcrypt.compare(enteredPass, storedPass);
  return match
};

export { validPassword }