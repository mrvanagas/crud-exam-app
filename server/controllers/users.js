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

//actions

const getUsers = async (req, res) => {
    try {
        const userDB = await userModel.find();
        res.status(200).json({ users: userDB})
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}