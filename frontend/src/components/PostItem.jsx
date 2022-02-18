import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

const PostItem = ({ post, isPublic }) => {
  return (
    <>
      <Card sx={{ maxWidth: 200 }} className="post">
        <CardMedia
          component="img"
          height={140}
          image={post.imageSrc}
          alt={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="subtitle2">{post.publishedAt}</Typography>
          <Typography variant="subtitle2" gutterBottom>
            By: {post.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {post.content.substr(0, 50) + "..."}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Link
            to={
              isPublic
                ? `/posts/${post._id}/pub`
                : `/posts/${post.user.toString()}/${post._id}`
            }
          >
            <Button size="small">Read More</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default PostItem;
