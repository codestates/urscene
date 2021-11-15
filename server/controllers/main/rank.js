const { Singlepost, Singlepost_gallerypost, Gallerypost, sequelize } = require("../../models");

module.exports = async (req, res) => {
  const data = await sequelize.query(
    "SELECT Galleryposts.id, count(Likes.id) AS count FROM Galleryposts INNER JOIN Likes ON Galleryposts.id = Likes.gallerypost_id Group by Galleryposts.id ORDER BY count desc LIMIT 9"
  );
  const likelist = data[0];
  let array = [];
  let image = [];
  for (const element of likelist) {
    const singleimage = await Singlepost_gallerypost.findAll({
      include: [
        {
          model: Singlepost,
          attributes: ["image"],
        },
      ],
      where: { Gallerypost_id: element.id },
    });
    if (singleimage.length === 0) {
      image.push([]);
    } else {
      const data = singleimage.map((el) => el.dataValues.Singlepost.dataValues);
      image.push(data);
    }
  }

  for (let i = 0; i < image.length; i++) {
    const gallery = await Gallerypost.findOne({
      where: { id: likelist[i].id },
    });
    const data = gallery.dataValues;
    array.push(data);
  }

  array.map((el, index) => {
    el.image = image[index];
  });
  res.status(200).json({ Ranking_gallery: array });
};
