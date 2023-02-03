import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body;
        console.log(postId, comment, req.userId);
        if (!comment) {
            return res.json({
                message: "Error: Comment can't be empty"
            })
        }

        if (comment.length > 45) {
            return res.json({
                message: "Error: Comment is too large"
            })
        }


        const newComment = new Comment({comment});
        await newComment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: {comments: newComment._id}
        })

        return res.json(newComment)


    } catch (e) {
        return res.json({
            message: "Error: Failed to get comment"
        })
    }
}