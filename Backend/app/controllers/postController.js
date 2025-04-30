import postModel from "../models/postModel.js";
import cloudinary from "../utility/cloudinaryUtility.js";

export const uploadDataToCloud = async (req, res) => {
  try {
    const { file } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(file);
    return res.status(200).json({
      status: "success",
      message: "File uploaded successfully.",
      data: uploadResponse.secure_url,
    });
  } catch (error) {
    console.log("Error in uploadDataToCloud Controller: " + error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { image, title, link1,link2,link3,link4 } = req.body;

    if (!image) {
      return res.status(400).json({
        status: "failed",
        message: "Image is required.",
        error: "Missing Image.",
      });
    }
    if (!title) {
      return res.status(400).json({
        status: "failed",
        message: "Title is required.",
        error: "Missing Title.",
      });
    }


    // Create New Message
    const createdMessage = await postModel.create({
      image,
      title,
      link1,
      link2,
      link3,
      link4
    });

    return res.status(201).json({
      status: "success",
      message: "Post created successfully.",
      data: createdMessage,
    });
  } catch (error) {
    console.log("Error in createMessageForGroup Controller : ", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // posts per page
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      postModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      postModel.countDocuments(),
    ]);

    return res.status(200).json({
      status: "success",
      message: "Posts fetched successfully.",
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
      data: posts,
    });
  } catch (error) {
    console.log("Error in getPost Controller:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error.",
      error: error.message,
    });
  }
};


export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "Post ID is required.",
        error: "Missing Post ID.",
      });
    }

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found.",
        error: "No post with the given ID.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Post fetched successfully.",
      data: post,
    });
  } catch (error) {
    console.log("Error in getPostById Controller:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error.",
      error: error.message,
    });
  }
};


export const getRandomPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const posts = await postModel.aggregate([
      { $sample: { size: limit } },
    ]);

    return res.status(200).json({
      status: "success",
      message: "Random posts fetched successfully.",
      data: posts,
    });
  } catch (error) {
    console.log("Error in getRandomPosts Controller:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error.",
      error: error.message,
    });
  }
};
