import React from "react";

export default function PostCard(props) {
  const { id, title, description, feature, price } = props.contact;
  return (
    <div className="item">
      <div className="content">
          <div className="header">{id}</div>
          <div>{title}</div>
          <div>{description}</div>
          <div>{feature}</div>
          <div>{price}</div>
      </div>
    </div>
  );
};