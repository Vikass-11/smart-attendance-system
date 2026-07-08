const adminModel = require('../models/adminModel');

const addDepartment = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }

    try {
        const result = await adminModel.createDepartment(name);
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Department already exists' });
        }
        res.status(500).json({ error: 'Failed to create department', details: err.message });
    }
};

const listDepartments = async (req, res) => {
    try {
        const departments = await adminModel.getAllDepartments();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch departments', details: err.message });
    }
};

const listUsers = async (req, res) => {
    const { role, search } = req.query;

    try {
        const users = search
            ? await adminModel.searchUsers(search)
            : await adminModel.getAllUsers(role);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { role, departmentId } = req.body;

    if (!['student', 'faculty', 'admin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        await adminModel.updateUserRole(id, role, departmentId || null);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
};

const removeUser = async (req, res) => {
    const { id } = req.params;

    try {
        await adminModel.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
};

module.exports = {
    addDepartment,
    listDepartments,
    listUsers,
    updateUser,
    removeUser,
};