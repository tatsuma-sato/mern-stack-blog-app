import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Typography,
} from "@material-ui/core";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <Card sx={{ width: 20 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontSize: 14 }}>
            {comment.comment}
          </Typography>
          <Typography variant="body2">
            {comment.name}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
