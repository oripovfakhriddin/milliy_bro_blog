import { memo, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import CategoryCard from "../../../components/card/categoryCard";
import PopularCard from "../../../components/card/PopularCard";
import { IMG } from "../../../const";
import request from "../../../server";
import { trueDate } from "../../../utils/data";
import "./style.scss";
const HomePage = () => {
  const [lastone, setLastone] = useState({});

  const getLatest = async () => {
    const { data } = await request.get("post/lastone");
    setLastone(data);
  };
  const getPostId = (id) => {
    Navigate(`post/${id}`);
  };
  useEffect(() => {
    getLatest();
  },[]);
  let homeImage = lastone.photo
    ? IMG + lastone?.photo?._id + "." + lastone?.photo?.name.split(".")[1]
    : "https://loremflickr.com/320/240";

  return (
    <main>
      <section
        id="latest"
        style={{
          background: `url(${homeImage}) no-repeat center`,
        }}
      >
        <div className="container">
          <div className="latest-text">
            <h5>
              Posted on <span>{lastone?.category?.name}</span>{" "}
            </h5>
            <h1>{lastone.title}</h1>
            <div>
              <h6>
                By{" "}
                <span>
                  {lastone?.user?.first_name} {lastone.user?.last_name}
                </span>{" "}
                | {trueDate(lastone.createdAt)}
              </h6>
              <p>{lastone.description}</p>
              <NavLink
                onClick={() => getPostId(`${lastone._id}`)}
                className="lastone-btn"
                to={`/post/${lastone._id}`}
              >
                Read More{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <section id="popular">
        <div className="container">
          <h2>Popular blogs</h2>
          <PopularCard />
          <hr />
        </div>
      </section>
      <section id="category">
        <div className="container">
          <h2>Choose A Catagory</h2>
          <CategoryCard />
        </div>
      </section>
    </main>
  );
};

const MemoHomePage = memo(HomePage);

export default MemoHomePage;
