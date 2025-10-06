import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = async () => {
    try {
      const res = await axios.get("/posts");
      if (res.data.success) {
        setPosts(res.data.existingPosts);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const onDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/post/delete/${id}`);
      toast.success("Deleted successfully!", { position: "top-right" });
      retrievePosts();
    } catch (err) {
      toast.error("Failed to delete!", { position: "top-right" });
      console.error("Error deleting post:", err);
    }
  };

  const filterData = (posts, searchKey) => {
    const result = posts.filter(
      (post) =>
        post.topic.toLowerCase().includes(searchKey.toLowerCase()) ||
        post.description.toLowerCase().includes(searchKey.toLowerCase()) ||
        post.postCategory.toLowerCase().includes(searchKey.toLowerCase())
    );
    setPosts(result);
  };

  const handleSearchArea = async (e) => {
    const searchKey = e.target.value;
    setSearchQuery(searchKey);
    try {
      const res = await axios.get("/posts");
      if (res.data.success) {
        filterData(res.data.existingPosts, searchKey);
      }
    } catch (err) {
      console.error("Error searching posts:", err);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* Header & Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">All Posts</h2>
        <div className="input-group w-25">
          <span className="input-group-text bg-white border-end-0">🔍</span>
          <input
            className="form-control border-start-0 rounded-end"
            type="search"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchArea}
          />
        </div>
      </div>

      {/* Posts Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="table-responsive"
      >
        <table className="table table-hover shadow-sm rounded-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Topic</th>
              <th>Description</th>
              <th>Post Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <motion.tr
                key={post._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <th>{index + 1}</th>
                <td>
                  <Link
                    to={`/post/${post._id}`}
                    style={{ textDecoration: "none", color: "#0d6efd" }}
                  >
                    {post.topic}
                  </Link>
                </td>
                <td>{post.description}</td>
                <td>
                  <span className="badge bg-info text-dark">
                    {post.postCategory}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <Link
                    to={`/edit/${post._id}`}
                    className="btn btn-warning d-flex align-items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </Link>
                  <button
                    className="btn btn-danger d-flex align-items-center gap-1"
                    onClick={() => onDelete(post._id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Floating Create Button */}
      <Link
        to="/add"
        className="btn btn-success d-flex align-items-center gap-2 position-fixed"
        style={{
          bottom: "30px",
          right: "30px",
          borderRadius: "50px",
          padding: "12px 20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <Plus size={20} />
        Create Post
      </Link>
    </div>
  );
}
