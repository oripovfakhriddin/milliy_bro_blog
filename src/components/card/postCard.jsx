import PropTypes from "prop-types"

const AllPostCard = ({ title, category, info, onClick, img }) => {
  return (
    <div className="card">
      <div className="postimg_container">
        <img className="img" src={img} />
      </div>
      <div onClick={onClick} className="card_info">
        <p className="name">{category}</p>
        <h2 className="title">{title}</h2>
        <p>{info}</p>
      </div>
    </div>
  );
};

AllPostCard.propTypes={
title: PropTypes.string,
category: PropTypes.string,
info: PropTypes.string,
onClick: PropTypes.func,
img: PropTypes.string,
}
export default AllPostCard;
