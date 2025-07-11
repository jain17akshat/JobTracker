const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobsSchema = new mongoose.Schema({
  jobId: {
    type: String,
    unique: true,
  },
  company: {
    type: String,
    required: [true, "Please add a company name"],
  },
  position: {
    type: String,
    required: [true, "Please add job position"],
  },
  status: {
    type: String,
    enum: ['pending', 'interview', 'declined', 'offer'],
    default: 'pending',
  },
  location: {
    type: String,
    default: 'Remote',
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract'],
    default: 'full-time',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// ✅ Fix: use the correct schema variable name
JobsSchema.plugin(AutoIncrement, {
  inc_field: 'jobNumber', // used for internal counting
  start_seq: 1,
});

// ✅ Generate formatted jobId like JOB-00001
JobsSchema.pre('save', function (next) {
  if (!this.jobId && this.jobNumber !== undefined) {
    this.jobId = `JOB-${this.jobNumber.toString().padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model("Job", JobsSchema);
