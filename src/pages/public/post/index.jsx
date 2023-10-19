import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";
import request from "../../../server";
import { IMG } from "../../../const";
import { trueDate } from "../../../utils/data";

import user from "../../../assets/user.png"

const PostPage = () => {
  const [post, setPost] = useState();
  const postId = useParams();
  console.log(postId.id);
  useEffect(() => {
    const getPost = async () => {
      try {
        let { data } = await request.get(`post/${postId.id}`);
        setPost(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [postId]);

  return (
    <section id="blog-post">
      <div className="container blog-post">
          <div className="post-content">
            <img
              className="post-image"
              src={`${IMG + post?.photo?._id}.${
                post?.photo?.name.split(".")[1]
              }`}
              alt=""
            />
          </div>
          <div className="container-md post-text">
            <div className="user">
               <img className="user-icon" src={user} alt="" />
               <div className="user-info">
                  <h5>{post?.user.first_name} {post?.user.last_name}</h5>
                  <h6>Posted on {trueDate(post?.createdAt)}</h6>
               </div>

            </div>
            <h2>{post?.title}</h2>
                  <p>{post?.description}</p>
          </div>
      </div>
    </section>
  );
};

export default PostPage;
