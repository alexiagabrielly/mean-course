const express = require("express");
const multer = require("multer");
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//Configurar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
          error = null;
        }
        //Definir para que pasta o multer deve enviar as imagens
        cb(error, "backend/images");
      },
    filename: (req, file, cb) => {
        const name = file.originalname
          .toLowerCase()
          .split(" ")
          .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
      }
});

router.post(
  "",
  //checkAuth vai executar a função que verifica se o usuário pode ou não fazer essa requisição
  checkAuth,
  multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                ...createdPost,
                id: createdPost._id
            }
        });
    });
});

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"), (req, res, next) => {
      let imagePath = req.body.imagePath;
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
      }
      const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
      });
      console.log(post);
      Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Update successful!" });
      });
    }
  );

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.get("", (req, res, next) => {
    //O sinal + converte o resultado para numero
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fechedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery.then(documents => {
        fechedPosts = documents;
        return Post.countDocuments();
    })
    .then(count => {
        res.status(200).json({
            message: "Posts feched successfully!",
            posts: fechedPosts,
            maxPosts: count
        });
    });
});

router.delete(
  "/:id",
  checkAuth,
  (req, res, next) => {
    //Com o método deleteOne(), será definido especificamente qual id deverá ser excluído
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Post deleted!"});
    });
});

module.exports = router;
