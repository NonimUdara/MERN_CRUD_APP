import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    postCategory: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/post/${id}`);
        if (res.data.success) {
          setFormData({
            topic: res.data.post.topic,
            description: res.data.post.description,
            postCategory: res.data.post.postCategory,
          });
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        toast.error("Failed to load post", { position: "top-right" });
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/post/update/${id}`, formData);
      if (res.data.success) {
        toast.success("Post updated successfully!", { position: "top-right" });
        setTimeout(() => {
          navigate("/"); // redirect after short delay to let toast show
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card shadow-lg p-4 w-100"
        style={{ maxWidth: "600px", borderRadius: "16px" }}
      >
        {/* Back Button */}
        <button
          className="btn btn-outline-primary mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h2 className="text-center mb-4 fw-bold text-primary">✏️ Edit Post</h2>

        <form onSubmit={handleSubmit}>
          {/* Topic */}
          <div className="mb-3">
            <label htmlFor="topic" className="form-label fw-semibold">
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              id="topic"
              name="topic"
              placeholder="Enter topic..."
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Write a short description..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Post Category */}
          <div className="mb-3">
            <label htmlFor="postCategory" className="form-label fw-semibold">
              Post Category
            </label>
            <input
              type="text"
              className="form-control"
              id="postCategory"
              name="postCategory"
              placeholder="e.g. Technology, Lifestyle..."
              value={formData.postCategory}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-2"
            style={{ borderRadius: "10px" }}
          >
            <Send size={18} /> Update Post
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
