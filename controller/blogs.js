import { Blogs, blogValidation } from "../schemas/blogsSchema.js";

class BlogsController {
    async get(req, res) {
        try {
            const blogs = await Blogs.find();
            if (!blogs.length) {
                return res.status(400).json({
                    msg: "Blog is not defined",
                    variant: "error",
                    payload: null
                });
            }
            res.status(200).json({
                msg: "All blogs",
                variant: "success",
                payload: blogs
            });
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async getById(req, res) {
        try {
            const blog = await Blogs.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({
                    msg: "Blog not found",
                    variant: "error",
                    payload: null
                });
            }
            res.status(200).json({
                msg: "Blog found",
                variant: "success",
                payload: blog
            });
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async post(req, res) {
        try {
            const { error } = blogValidation(req.body);
            if (error) {
                return res.status(400).json({
                    msg: error.details[0].message,
                    variant: "warning",
                    payload: null
                });
            }
            const blog = await Blogs.create(req.body);
            res.status(201).json({
                msg: "Blog created successfully",
                variant: "success",
                payload: blog
            });
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async put(req, res) {
        try {
            const { error } = blogValidation(req.body);
            if (error) {
                return res.status(400).json({
                    msg: error.details[0].message,
                    variant: "warning",
                    payload: null
                });
            }
            const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedBlog) {
                return res.status(404).json({
                    msg: "Blog not found",
                    variant: "error",
                    payload: null
                });
            }
            res.status(200).json({
                msg: "Blog updated successfully",
                variant: "success",
                payload: updatedBlog
            });
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async delete(req, res) {
        try {
            const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
            if (!deletedBlog) {
                return res.status(404).json({
                    msg: "Blog not found",
                    variant: "error",
                    payload: null
                });
            }
            res.status(200).json({
                msg: "Blog deleted successfully",
                variant: "success",
                payload: deletedBlog
            });
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }
}

export default new BlogsController();
