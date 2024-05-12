import Avatar from "@mui/material/Avatar";
import React from "react";

export const AvatarCaption = ({ type }) => {
  let caption, selectColor;
  switch (type) {
    case "outerwear":
      caption = "O";
      selectColor = "red";
      break;
    case "dress":
      caption = "D";
      selectColor = "blue";
      break;
    case "activewear":
      caption = "A";
      selectColor = "green";
      break;
    case "top":
      caption = "T";
      selectColor = "orange";
      break;
    case "footwear":
      caption = "F";
      selectColor = "purple";
      break;
    default:
  }
  return <Avatar sx={{ bgcolor: selectColor }}>{caption}</Avatar>;
};
