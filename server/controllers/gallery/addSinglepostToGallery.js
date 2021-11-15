const db = require("../../db");
require("dotenv").config();

module.exports = async (req, res) => {
	const { singlepost_id } = req.body;
	const { gallerypost_id } = req.params;

	try {
		if (!singlepost_id) {
			return res.status(400).json({ message: "request-error" });
		}

		const singlepostData = await db.getSinglePostById(singlepost_id);
		if (!singlepostData) {
			return res.status(404).json({ message: "singleposts-not-found" });
		}

		const galleryData = await db.getGalleryById(gallerypost_id);
		const { title, content } = galleryData;

		delete singlepostData.createdAt;
		delete singlepostData.updatedAt;

		const existentSinglepost = await db.getJunctionTableData(singlepost_id, gallerypost_id);
		if (existentSinglepost.length !== 0) {
			return res.status(200).json({ singlepost_id, message: "singlepost-already-exists" });
		}

		await db.addSinglepostToGallery({ singlepost_id, gallerypost_id });
		return res.status(201).json({ title, content, singlepostData, message: "add-singlepost-to-gallery-successfully" });
	} catch (err) {
		res.status(500).json({ message: "server-error" });
	}
};
