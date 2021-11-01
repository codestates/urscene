const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../db");
require("dotenv").config();

module.exports = async (req, res) => {
  const {email, password} = req.body;
  const authenticatedUser = await db.authenticateUser(email, password);
  const user = authenticatedUser[0].dataValues;
  const {id, nickname, image} = user;

  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "14d",
    issuer: "cotak",
  });

  try {
    // request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인
    // 일치하는 유저가 없을 경우:
    // 로그인 요청을 거절
    if (!authenticatedUser) {
      return res.status(400).send({email, message: "invalid-data"});
    }
    // 일치하는 유저가 있을 경우:
    // 사용자의 id와 nickname 추출

    // 필요한 데이터를 담은 두 종류의 JWT(access, refresh) 생성
    // 생성한 JWT를 적절한 방법으로 반환
    console.log(id, nickname, image, email, password);
    // DB에 refresh 토큰 삽입
    await connection.beginTransaction();
    await connection.query(
      ` INSERT INTO tokens(content, user_no) VALUE (?, ?); `,
      [refreshToken, user_no]
    );
    await connection.commit();
    // 토큰 세팅
    const accessToken = jwt.sign({userId, userName}, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: "cotak",
    });
    // 웹 브라우저(클라이언트)에 토큰 세팅
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    next();

    return res.status(200).json({message: "log-in-successfully"});
  } catch (err) {
    res.status(500).json({message: "server-error"});
  }
};
