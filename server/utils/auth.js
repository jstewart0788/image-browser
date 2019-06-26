const bcrypt = require("bcrypt");

const encrypt = async password => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

const checkUser = async (plainPassword, hash) => {
  const match = await bcrypt.compare(plainPassword, hash);
  return match;
};

module.exports = { encrypt, checkUser };
