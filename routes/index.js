const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/user-controller");
const AuthenticateToken = require("../middleware/auth");
const PostController = require("../controllers/post-controller");
const CommentController = require("../controllers/comment-controller");
const LikeController = require("../controllers/like-controller");
const FollowController = require("../controllers/follow-controller");

const uploadDestination = "uploads";

//Показываем, где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });
//Роуты пользователя
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", AuthenticateToken, UserController.current);
router.get("/users/:id", AuthenticateToken, UserController.getUserById);
router.put(
  "/users/:id",
  AuthenticateToken,
  uploads.single("avatar"),
  UserController.updateUser
);
//Роуты постов
router.post("/posts", AuthenticateToken, PostController.createPost);
router.get("/posts", AuthenticateToken, PostController.getAllPosts);
router.get("/posts/:id", AuthenticateToken, PostController.getPostById);
router.delete("/posts/:id", AuthenticateToken, PostController.deletePost);
//Роуты комментариев
router.post("/comments", AuthenticateToken, CommentController.createComment);
router.delete(
  "/comments/:id",
  AuthenticateToken,
  CommentController.deleteComment
);
//Роуты лайков
router.post("/likes", AuthenticateToken, LikeController.likePost);
router.delete("/likes/:id", AuthenticateToken, LikeController.unLikePost);
//Роуты подписчиков
router.post("/follow", AuthenticateToken, FollowController.followUser);
router.delete(
  "/unfollow/:id",
  AuthenticateToken,
  FollowController.unfollowUser
);

module.exports = router;
