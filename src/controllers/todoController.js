const { findById } = require("../models/todoModel");
const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
  try {
    const _todo = await todo.findOne({ name: req.body.name });
    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "Bu isimde Kayit Mevcut",
      });
    }
    const todoAdd = new todo(req.body);
    await todoAdd
      .save()
      .then(() => {
        return res.status(201).json(todoAdd);
      })
      .catch((err) => {
        return res.status(404).json({
          success: false,
          message: "Kayit olusturulurken Hata cikti :" + err,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayit olusturulamadi !",
    });
  }
};

const todoGetAll = async (req, res) => {
  const { page } = req.query;
  const limit = 3;
  const skip = Number(page - 1) * limit;
  try {
    const todoGetAll = await todo.find({}).limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      data: todoGetAll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayit getirlemedi",
    });
  }
};
const todoUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
    if (todoUpdate) {
      return res.status(200).json({
        success: true,
        message: "Guncelleme basarili",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Kayit Guncellenemedi !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayit Guncellenemedi",
    });
  }
};
const todoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const todoDelte = await todo.findByIdAndDelete(id);
    if (todoDelete) {
      return res.status(200).json({
        success: true,
        message: "Silme islemi basarili",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Silme islemi basarisiz !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Silme islemi Basarisiz !",
    });
  }
};
const todoGet = async (req, res) => {
  const { id } = req.params;
  try {
    const todoGet = await todo.findById(id);
    if (todoGet) {
      return res.status(200).json(todoGet);
    } else {
      return res.status(404).json({
        success: false,
        message: "Kayit bulunamadi",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayit Cekilirken bir Hata Olustu",
    });
  }
};
module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGet,
};
