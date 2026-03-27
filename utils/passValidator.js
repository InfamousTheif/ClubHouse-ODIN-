import bcrypt from "bcryptjs";

async function validPassword(enteredPass, storedPass) {
  const match = await bcrypt.compare(enteredPass, storedPass);
  if(!match) {
    return done(null, false, {messaage: "Invalid password"});
  };
};

export { validPassword }