import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { IMG, LIMIT } from "../../../const";
import request from "../../../server";
import React from "react";
import Modal from "react-modal";
import "./style.scss";
import { useForm } from "react-hook-form";
import PostSchema from "../../../schemas/post";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

const customStyles = {
  content: {
    width: "60%",
    height: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Modal.setAppElement('#yourAppElement');

const PostsPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    request.get("category").then((response) => {
      setCategories(response.data.data);
    });
  }, [setCategories]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        let { data } = await request.get(
          `post/user?limit=${LIMIT}&page=${activePage}&search=${search}`
        );
        setPosts(data.data);
        setTotal(data.pagination.total);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, [activePage, search]);
  console.log(posts);
  const handlePageClick = ({ selected }) => {
    setActivePage(selected + 1);
  };

  let pages = Math.ceil(total / LIMIT);
  let pagination =
    pages !== 1 ? (
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={5}
        pageCount={pages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
      />
    ) : null;

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(PostSchema) });

  const postData = async (data) => {
    await request.put(`auth/details`, data);
    // getUser();
    toast.success("Chotki");
  };

  const handleImageUpload = async (e) => {
    try {
      const form = new FormData();
      form.append("file", e.target.files[0]);
      let res = await request.post("upload", form);
      setUploadedImage(res?.data?._id);

      const imageUrl = `${IMG + res?.data?._id}.${
        res?.data?.name.split(".")[1]
      }`;
      setImagePreviewUrl(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = useCallback(async (id) => {
    await request.delete(`post/${id}`);
    confirm("Do you want to delete this post?");
    toast.info("Deleted post");
  }, []);

  useEffect(() => {
    deletePost();
  }, [deletePost]);

  return (
    <section id="posts">
      <div className="container">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Searching..."
        />
        <div className="blog-header">
          <h1>My posts</h1>
          <button className="modal-btn" onClick={openModal}>
            Open Modal
          </button>
        </div>
        <hr className="hr" />
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h2>Add post</h2>
            <button onClick={closeModal}>x</button>
          </div>
          <form onSubmit={handleSubmit(postData)}>
            <div className="modal-div">
              <label htmlFor="">Title</label>
              <input
                {...register("title")}
                type="text"
                name="title"
                placeholder="Title"
                className="login-input"
              />
              {errors.title ? (
                <p className="text-danger">{errors.title.message}</p>
              ) : null}
            </div>
            <div className="modal-div">
              <label htmlFor="">Description</label>
              <textarea
                {...register("description")}
                type="text"
                name="description"
                placeholder="post description"
                className="login-input"
              />
              {errors.description ? (
                <p className="text-danger">{errors.description.message}</p>
              ) : null}
            </div>
            <select className="modal-diva" placeholder="Select a category">
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              className="modal-img"
              type="file"
              onChange={handleImageUpload}
            />
            {imagePreviewUrl && (
              <div className="image-preview">
                <img
                  style={{
                    width: "150px",
                    borderRadius: "10%",
                    marginTop: "15px",
                  }}
                  src={imagePreviewUrl}
                  alt="Preview"
                />
              </div>
            )}
          </form>
        </Modal>
        <div className="posts-row">
          {posts.map((posts) => (
            <NavLink
              to={`/post/${posts._id}`}
              key={posts?._id}
              className="post-card"
            >
              <div className="post-image">
                <img
                  src={`${IMG + posts?.photo?._id}.${
                    posts?.photo?.name.split(".")[1]
                  }`}
                  alt=""
                />
              </div>
              <div className="blogcha">
                <h5>{posts?.category.name}</h5>
                <h3>{posts?.title}</h3>
                <p>{posts?.description}</p>

                <button
                  onClick={() => {
                    deletePost(posts?._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </NavLink>
          ))}
        </div>
        {pagination}
      </div>
    </section>
  );
};

export default PostsPage;
