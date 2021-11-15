const { isAuthorized } = require("../../lib/jwt");
const { Comment } = require("../../models");

module.exports = async (req, res) => {
  const userinfo = isAuthorized(req);

  const commentId = await Comment.findOne({
    where: { id: req.params.commentid, user_id: userinfo.id },
  });
  if (commentId) {
    await Comment.destroy({
      where: { id: req.params.commentid },
    });
    res.status(200).json({ message: "delete-comment-successfully" });
  } else {
    res.status(404).json({ message: "data-not-found" });
  }
};
