import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("/post/" + id);
        if (res.data.success) {
          setPost(res.data.post);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const { topic, description, postCategory } = post;

  return (
    <div className="container mt-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card shadow p-4"
        style={{ borderRadius: "16px" }}
      >
        <button
          className="btn btn-outline-primary mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h2 className="text-primary mb-3">{topic}</h2>
        <hr />

        <dl className="row">
          <dt className="col-sm-3 fw-semibold">Description</dt>
          <dd className="col-sm-9">{description}</dd>

          <dt className="col-sm-3 fw-semibold">Post Category</dt>
          <dd className="col-sm-9">{postCategory}</dd>
        </dl>
      </motion.div>
    </div>
  );
}
