const leaveModel = require('../models/leaveModel');

const submitLeave = async (req, res) => {
    const { reason, fromDate, toDate } = req.body;

    if (!reason || !fromDate || !toDate) {
        return res.status(400).json({ error: 'reason, fromDate, and toDate are required' });
    }

    if (new Date(fromDate) > new Date(toDate)) {
        return res.status(400).json({ error: 'fromDate cannot be after toDate' });
    }

    try {
        const result = await leaveModel.submitLeaveRequest(req.user.id, reason, fromDate, toDate);
        res.status(201).json({ id: result.insertId, message: 'Leave request submitted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit leave request', details: err.message });
    }
};

const getMyLeaveRequests = async (req, res) => {
    try {
        const requests = await leaveModel.getStudentLeaveRequests(req.user.id);
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leave requests', details: err.message });
    }
};

const getPendingRequests = async (req, res) => {
    try {
        const requests = await leaveModel.getPendingLeaveRequests();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pending requests', details: err.message });
    }
};

const reviewLeave = async (req, res) => {
    const { id } = req.params;
    const { decision } = req.body;

    if (!['approved', 'rejected'].includes(decision)) {
        return res.status(400).json({ error: 'decision must be approved or rejected' });
    }

    try {
        const leaveRequest = await leaveModel.getLeaveRequestById(id);

        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        if (leaveRequest.status !== 'pending') {
            return res.status(409).json({ error: `Leave request already ${leaveRequest.status}` });
        }

        await leaveModel.updateLeaveStatus(id, decision, req.user.id);
        res.json({ message: `Leave request ${decision}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to review leave request', details: err.message });
    }
};

module.exports = {
    submitLeave,
    getMyLeaveRequests,
    getPendingRequests,
    reviewLeave,
};