const reportModel = require('../models/reportModel');
const { getWeekRange, getMonthRange } = require('../utils/dateHelpers');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

const dailyReport = async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date is required' });

    try {
        const data = await reportModel.getDailyReport(date);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate daily report', details: err.message });
    }
};

const weeklyReport = async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date is required (any date within the week)' });

    try {
        const { fromDate, toDate } = getWeekRange(date);
        const data = await reportModel.getRangeReport(fromDate, toDate);
        res.json({ fromDate, toDate, data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate weekly report', details: err.message });
    }
};

const monthlyReport = async (req, res) => {
    const { month, year } = req.query;
    if (!month || !year) return res.status(400).json({ error: 'month and year are required' });

    try {
        const { fromDate, toDate } = getMonthRange(parseInt(month), parseInt(year));
        const data = await reportModel.getRangeReport(fromDate, toDate);
        res.json({ fromDate, toDate, data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate monthly report', details: err.message });
    }
};

const institutionSummary = async (req, res) => {
    const { fromDate, toDate } = req.query;
    if (!fromDate || !toDate) return res.status(400).json({ error: 'fromDate and toDate are required' });

    try {
        const summary = await reportModel.getInstitutionSummary(fromDate, toDate);
        const departmentBreakdown = await reportModel.getDepartmentWiseReport(fromDate, toDate);
        res.json({ summary, departmentBreakdown });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate summary', details: err.message });
    }
};

const exportCSV = async (req, res) => {
    const { fromDate, toDate } = req.query;
    if (!fromDate || !toDate) return res.status(400).json({ error: 'fromDate and toDate are required' });

    try {
        const data = await reportModel.getRangeReport(fromDate, toDate);
        const parser = new Parser({
            fields: ['student_id', 'name', 'email', 'total_days', 'present_days', 'absent_days', 'late_days', 'percentage'],
        });
        const csv = parser.parse(data);

        res.header('Content-Type', 'text/csv');
        res.attachment(`attendance-report-${fromDate}-to-${toDate}.csv`);
        res.send(csv);
    } catch (err) {
        res.status(500).json({ error: 'Failed to export CSV', details: err.message });
    }
};

const exportPDF = async (req, res) => {
    const { fromDate, toDate } = req.query;
    if (!fromDate || !toDate) return res.status(400).json({ error: 'fromDate and toDate are required' });

    try {
        const data = await reportModel.getRangeReport(fromDate, toDate);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=attendance-report-${fromDate}-to-${toDate}.pdf`);

        const doc = new PDFDocument({ margin: 40 });
        doc.pipe(res);

        doc.fontSize(16).text('Attendance Report', { align: 'center' });
        doc.fontSize(10).text(`Period: ${fromDate} to ${toDate}`, { align: 'center' });
        doc.moveDown(2);

        data.forEach((row) => {
            doc.fontSize(11).text(
                `${row.name} (${row.email}) — Present: ${row.present_days || 0}, Absent: ${row.absent_days || 0}, Late: ${row.late_days || 0}, Percentage: ${row.percentage || 0}%`
            );
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ error: 'Failed to export PDF', details: err.message });
    }
};

module.exports = {
    dailyReport,
    weeklyReport,
    monthlyReport,
    institutionSummary,
    exportCSV,
    exportPDF,
};