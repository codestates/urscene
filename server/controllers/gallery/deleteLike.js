const { isAuthorized } = require("../../lib/jwt");
const { Like } = require("../../models");

module.exports = async (req, res) => {
  const userinfo = isAuthorized(req);
  const { gallerylikeid } = req.params;
  const data = await Like.findOne({
    where: {
      user_id: userinfo.id, //userinfo.id
      id: gallerylikeid,
    },
  });
  Like.destroy({
    where: {
      id: data.dataValues.id,
      gallerypost_id: data.dataValues.gallerypost_id,
    },
  });
  res.status(200).json({ message: "delete-gallerylike-successfully" });
};
