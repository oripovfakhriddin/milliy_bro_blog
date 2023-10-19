import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import { IMG, LIMIT } from "../../../const";
import request from "../../../server";


import "./style.scss";

const CategoryPage = () => {
  const [category, setCategory] = useState();
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  let [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);


  const  categoryId = useParams();
  console.log(categoryId.id);
  useEffect(() => {
    const getCategory = async () => {
      try {
        let { data } = await request.get(`category/${categoryId.id}`);
        setCategory(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getPostsByCategory = async () => {
      try {
        let { data } = await request.get(
          `post?page=${activePage}&limit=${LIMIT}&search=${search}&category=${categoryId.id}`
        );
        setTotal(data.pagination.total);
        setPosts(data.data);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };

    getPostsByCategory();
    getCategory();
  }, [categoryId, activePage, search, posts]);

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
    <Fragment>
      <section id="category" className="home-category">
        <div className="container category-page">
          <h1>{category?.name}</h1>
          <p>{category?.description}</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <p>&#62;</p>
            <Link to={`/category/${categoryId}`}>{category?.name}</Link>
          </div>
        </div>
      </section>
      <section className="all-posts">
        <div className="container">
          <div className="container all-posts__container">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              type="text"
              placeholder="Searching..."
            />
          </div>
          <div className="posts-row">
            {posts?.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-image">
                  <img
                    src={`${IMG + post?.photo?._id}.${
                     post?.photo?.name.split(".")[1]
                   }`}
                    alt=""
                  />
                </div>
                <div className="post-info">
                  <p className="post-category">{post.category.name}</p>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-p">
                    {post?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
         {pagination}
        </div>
      </section>
    </Fragment>
  );
};


export default CategoryPage;