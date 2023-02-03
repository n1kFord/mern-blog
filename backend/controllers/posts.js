import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import path, {dirname} from "path";
import {fileURLToPath} from "url"

export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body;

        if (title.length > 25) {
            return res.json({message: 'Error: Title length is more than 25 characters...'})
        }

        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })

            return res.json({newPostWithImage, message: "Post uploaded successfully!"})
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })

        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage}
        })

        return res.json({newPostWithoutImage, message: "Post uploaded successfully!"})
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort('-views');
        if (!posts) {
            return res.json({message: "No posts yet"})
        }

        return res.json({posts, popularPosts})
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }

}

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1},
        })
        return res.json(post)
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }

}

export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id);
            }),
        )

        return res.json(list);
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.json({message: 'Error: This post does not exist'})
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: {
                posts: req.params.id,
            }
        });

        return res.json({message: 'Post was deleted successfully!'})
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}

export const updatePost = async (req, res) => {
    try {
        const {title, text, id} = req.body;


        if (title.length > 25) {
            return res.json({message: 'Error: Title length is more than 25 characters...'})
        }

        const post = await Post.findById(id);

        if (req.userId !== post.author.toString()) {
            return res.json({message: "Error: You can't update other people's posts"})
        }

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || '';
        }

        post.title = title;
        post.text = text;

        await post.save();

        return res.json({post, message: 'Post was updated successfully!'})
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}

export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            })
        )
        return res.json(list);
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}