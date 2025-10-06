import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    postCategory: "",
  });

  const navigate = useNavigate();

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
      const res = await axios.post("/post/save", formData);
      if (res.data.success) {
        setFormData({ topic: "", description: "", postCategory: "" });

        // ✅ Show success toast
        toast.success("Post submitted successfully!", {
          position: "top-right",
          autoClose: 1500,
        });

        // Redirect after toast duration
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to submit post!", { position: "top-right" });
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card shadow-lg p-4 w-100"
        style={{ maxWidth: "600px", borderRadius: "16px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          📝 Create New Post
        </h2>

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
              placeholder="Enter your topic..."
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
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-2"
            style={{ borderRadius: "10px" }}
          >
            <Send size={18} />
            Publish Post
          </motion.button>
        </form>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
