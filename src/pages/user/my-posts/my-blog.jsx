import { Fragment, useCallback, useEffect, useState } from "react";


import "./style.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {  Form, Input, Modal } from "antd";
import request from "../../../server";
import { IMG } from "../../../const";
import LoadingPage from "../../../components/loading/Loading";

import edit from "../../../assets/header/edit.png";
import deleted from "../../../assets/header/delete.png";


const MyPostsPage = () => {
  const [loading, setLoading] = useState(false);
  const [photoId, setPhotoId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  

  useEffect(() => {
   setIsModalOpen(false)
    setLoading(true);
    let timerId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [setLoading]);

  const [form] = Form.useForm();

  const getUserPost = useCallback(async () => {
    try {
      setIsModalOpen(false)
      let { data } = await request.get(`post/user?search=${search}`);
      setUserPost(data?.data);
    } catch (err) {
      toast.error(err);
    }
  }, [search]);

  const getCategories = useCallback(async () => {
    try {
      let { data } = await request.get("category");
      setCategories(data?.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }, []);

  useEffect(() => {
    let options;
    options = categories?.map((category) => {
      return {
        value: category?._id,
        label: category?.name,
      };
    });
    setSortedCategories(options);

    getCategories();
    getUserPost();
  }, [categories, getUserPost, getCategories]);

  const uploadPhoto = useCallback(
    async (e) => {
      let formData = new FormData();
      console.log(e.target);
      formData.append("file", e.target.files[0]);
      let { data } = await request.post("upload", formData);
      setPhotoId(data?.data?._id);
      setImagePreviewUrl(photoId);
    },
    [photoId]
  );

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await request.post("post", {
          ...values,
          photo: photoId,
        });
        console.log(values);
      } else {
        await request.put(`post/${selected}`, { ...values, photo: photoId });
      }
      setIsModalOpen(false);
    } finally {
      setIsModalOpen(false);
    }
  };

  const showModal = useCallback(() => {
    form.resetFields();
    setIsModalOpen(true);
  }, [form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const deletePost = useCallback(async (id) => {
   await request.delete(`post/${id}`);
   confirm("Do you want to delete this post?");
   toast.info("Deleted post");
 }, []);

 useEffect(() => {
   deletePost();
 }, [deletePost]);

  const editPost = useCallback( async (id) => {
    try {
      setIsModalOpen(true)
      showModal(true);
      setSelected(id);
      let { data } = await request.put(`post/${id}`);
      form.setFieldsValue(data.value);
    } catch (err) {
      console.log(err);
    }
    finally{
      setIsModalOpen(false);
    }
  }, [form, showModal]);

  useEffect(()=>{
   editPost()
  },[editPost])
  return (
    <Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <section id="my-posts">
          <div className="container my-posts">
            <div className="my-posts__header">
              <h1 className="my-posts__title">My posts</h1>
              <button onClick={showModal} className="add-post-btn">
                Add post
              </button>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Searching..."
              className="search-input"
              type="text"
            />
            <div className="line"></div>
            <div className="posts-row">
              {userPost?.map((post) => (
                <div key={post?._id} className="post-card">
                  <Link
                    title="Click the image to read more"
                    to={`/post/${post?._id}`}
                    className="post-image"
                  >
                    <img
                      src={
                        post?.photo
                          ? `${IMG}${post?.photo._id}.${
                              post?.photo.name.split(".")[1]
                            }`
                          : "https://loremflickr.com/320/240"
                      }
                      alt=""
                    />
                  </Link>
                  <div className="post-info">
                    <div>
                      <p className="post-subtitle">{post?.category.name}</p>
                      <h3 className="post-title">{post?.title}</h3>
                      <p className="post-desc">{post?.description}</p>
                    </div>
                    <div className="post-btn"><button
                      onClick={() => editPost(post?._id)}
                      className="edit-btn"
                    >
                      <img src={edit} alt="" />
                    </button>
                    <button
                      onClick={() => deletePost(post?._id)}
                      className="delete-btn"
                    >
                      <img src={deleted} alt="" />
                    </button></div>
                  </div>
                </div>
              ))}
            </div>

            <Modal
              title={selected === null ? "Create post" : "Edit post"}
              open={isModalOpen}
              onOk={handleOk}
              okText={selected === null ? `Add post` : "Save post"}
              onCancel={handleCancel}
            >
              <Form
                id="post-form"
                name="Post"
                form={form}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 700,
                }}
                autoComplete="off"
              >
                <Form.Item
                  label="Post title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <select
                    className="modal-diva"
                    placeholder="Select a category"
                  >
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Form.Item>

                <Form.Item label="Image" name="photo">
                  <input
                    className="modal-img"
                    type="file"
                    onChange={uploadPhoto}
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
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MyPostsPage;
