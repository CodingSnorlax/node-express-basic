const bcrypt = require("bcrypt");

async function hashPassword() {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log("salt(鹽值):", salt);

    const dbPassword = await bcrypt.hash("16888", salt); //密碼加入鹽值(加密)
    console.log("hashed pwd:", dbPassword);

    // 比對 登入密碼 & db 密碼
    const keyinPwd = "16888";
    const isMatch = await bcrypt.compare(keyinPwd, dbPassword); //密碼與db密碼比對(解密)
    console.log("isMatch", isMatch);
  } catch (error) {
    console.error("處理密碼加密發生錯誤:", error);
  }
}

hashPassword();