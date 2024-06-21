// server/index.js

const express = require("express");
const cors = require("cors");
const groupsRouter = require("./routes/groups.jsx");
const statusesRouter = require("./routes/statuses.jsx");
const studentsRouter = require("./routes/students.jsx");
const subgroupsRouter = require("./routes/subgroups.jsx");
const subjectsRouter = require("./routes/subjects.jsx");
const teachersRouter = require("./routes/teachers.jsx");
const usersRouter = require("./routes/users.jsx");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/groups", groupsRouter);
app.use("/statuses", statusesRouter);
app.use("/students", studentsRouter);
app.use("/subgroups", subgroupsRouter);
app.use("/subjects", subjectsRouter);
app.use("/teachers", teachersRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
