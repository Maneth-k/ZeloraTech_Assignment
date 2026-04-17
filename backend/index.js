const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let candidates = [
  {
    id: "1",
    name: "Cody Fisher",
    avatar: "https://ui-avatars.com/api/?name=Cody+Fisher&background=random",
    stage: "Applying Period",
    applicationDate: "2026-04-01",
    overallScore: "8.5",
    referral: "LinkedIn",
    assessmentStatus: "Pending",
  },
  {
    id: "2",
    name: "Esther Howard",
    avatar: "https://ui-avatars.com/api/?name=Esther+Howard&background=random",
    stage: "Screening",
    applicationDate: "2026-04-02",
    overallScore: "9.2",
    referral: "Internal",
    assessmentStatus: "Passed",
  },
  {
    id: "3",
    name: "Jenny Wilson",
    avatar: "https://ui-avatars.com/api/?name=Jenny+Wilson&background=random",
    stage: "Interview",
    applicationDate: "2026-04-03",
    overallScore: "7.8",
    referral: "Indeed",
    assessmentStatus: "Passed",
  },
  {
    id: "4",
    name: "Kristin Watson",
    avatar: "https://ui-avatars.com/api/?name=Kristin+Watson&background=random",
    stage: "Test",
    applicationDate: "2026-04-04",
    overallScore: "8.8",
    referral: "Referral",
    assessmentStatus: "Pending",
  },
];

// Read all candidates
app.get("/api/candidates", (req, res) => {
  let filtered = candidates;
  if (req.query.stage) {
    filtered = candidates.filter((c) => c.stage === req.query.stage);
  }

  if (req.query.sortBy) {
    const sortBy = req.query.sortBy;
    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }
  res.json(filtered);
});

// Read single candidate
app.get("/api/candidates/:id", (req, res) => {
  const candidate = candidates.find((c) => c.id === req.params.id);
  if (candidate) {
    res.json(candidate);
  } else {
    res.status(404).json({ message: "Candidate not found" });
  }
});

// Create candidate
app.post("/api/candidates", (req, res) => {
  const newCandidate = {
    id: Date.now().toString(),
    ...req.body,
    applicationDate:
      req.body.applicationDate || new Date().toISOString().split("T")[0],
  };
  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

// Update candidate
app.put("/api/candidates/:id", (req, res) => {
  const index = candidates.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    candidates[index] = { ...candidates[index], ...req.body };
    res.json(candidates[index]);
  } else {
    res.status(404).json({ message: "Candidate not found" });
  }
});

// Delete candidate
app.delete("/api/candidates/:id", (req, res) => {
  const index = candidates.findIndex((c) => c.id === req.params.id);
  if (index !== -1) {
    const deleted = candidates.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Candidate not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
