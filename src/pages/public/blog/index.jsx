import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { IMG, LIMIT } from "../../../const";
import request from "../../../server";
import "./style.scss";

const PostsPage = () => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        let { data } = await request.get(
          `/post?limit=${LIMIT}&page=${activePage}&search=${search}`
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
  return (
    <section id="posts">
      <div className="container">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Searching..."
        />
        <h1>All posts</h1>
        <hr className="hr" />
        <div className="posts-row">
          {posts.map((posts) => (
            <NavLink to={`/post/${posts._id}`} key={posts?._id} className="post-card">
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