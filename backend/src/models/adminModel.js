const db = require('../config/db');

const createDepartment = async (name) => {
    const [result] = await db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        [name]
    );
    return result;
};

const getAllDepartments = async () => {
    const [rows] = await db.query(`SELECT * FROM departments ORDER BY name`);
    return rows;
};

const getAllUsers = async (role = null) => {
    let query = `SELECT u.id, u.name, u.email, u.role, u.created_at, d.name AS department
                 FROM users u
                 LEFT JOIN departments d ON u.department_id = d.id`;
    const params = [];

    if (role) {
        query += ` WHERE u.role = ?`;
        params.push(role);
    }

    query += ` ORDER BY u.name`;

    const [rows] = await db.query(query, params);
    return rows;
};

const searchUsers = async (searchTerm) => {
    const [rows] = await db.query(
        `SELECT u.id, u.name, u.email, u.role, d.name AS department
         FROM users u
         LEFT JOIN departments d ON u.department_id = d.id
         WHERE u.name LIKE ? OR u.email LIKE ?
         ORDER BY u.name`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    return rows;
};

const updateUserRole = async (userId, role, departmentId) => {
    const [result] = await db.query(
        `UPDATE users SET role = ?, department_id = ? WHERE id = ?`,
        [role, departmentId, userId]
    );
    return result;
};

const deleteUser = async (userId) => {
    const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [userId]);
    return result;
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getAllUsers,
    searchUsers,
    updateUserRole,
    deleteUser,
};