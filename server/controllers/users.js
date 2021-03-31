const mongoose = require('mongoose');
const userModel = require('../models/userModel');

//properties
const availableProperties = ['userName', 'userAge', 'userEmail', 'userPassword'];
const restrictedProperties = ['_id', 'createdAt', 'updatedAt', '__v'];

const createPropertiesTable = (props) => {
    let propsToChange = {};
    for (const propName in props) {
        if (propName !== undefined && availableProperties.includes(propName))
        propsToChange[propName] = props[propName];
    }
    return propsToChange;
}

const formUserResponseModel = (userDoc) => ({
    id: userDoc._id,
    name: userDoc.name,
    age: userDoc.age,
    email: userDoc.email,
    password: userDoc.password
  });

//actions

const getUsers = async (req, res) => {
    try {
      const userDocs = await userModel.find();
      res.status(200).json({ users: userDocs.map(formUserResponseModel) });
    }
    catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

const postUser = async (req, res) => {
    const { name, age, email, password } = req.body;
    try {
        const newUser = await userModel.create({ name, age, email, password});
        res.status(200).json({ user: formUserResponseModel(newUser) });
    }
    catch (error) {
        res.status(404).json({ message: error.message});
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new Error(`Invalid '${id}' format`);
      const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedUser === null)
        throw new Error(`Cant find and update user with ID '${id}'`);
      res.status(200).json({ user: formUserResponseModel(updatedUser) });
    }
    catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new Error(`Invalid ID '${id}' format`);
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (deletedUser === null)
        throw new Error(`cant find user with id '${id}'`);
      res.status(200).json({ user: formUserResponseModel(deletedUser) });
    }
    catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
}