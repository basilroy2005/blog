const express = require("express");
const cors = require("cors");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

require("./connection");
const BlogModel = require("./model");



app.post("/post", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(201).send({ message: "Blog created", blog: newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to create blog" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url } = req.body;
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, img_url },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.send({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update blog" });
  }
});


app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.send({ message: "Blog deleted", blog: deletedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete blog" });
  }
});

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
