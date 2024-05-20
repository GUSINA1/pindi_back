// Создаём роут для запросов пользователей 
const usersRouter = require('express').Router();

// Импортируем вспомогательные функции
const {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkIsUserExists, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, hashPassword} = require('../middlewares/users');
const {sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe} = require('../controllers/users');
const  { checkAuth }  = require("../middlewares/auth");

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get('/users', findAllUsers, sendAllUsers);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
); 

usersRouter.get("/users/:id", findUserById, sendUserById);

usersRouter.put(
  "/users/:id", // Слушаем запросы по эндпоинту
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser, // Обновляем запись в MongoDB
  sendUserUpdated // Возвращаем ответ на клиент
); 

usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);


usersRouter.get("/me", checkAuth, sendMe);


// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;