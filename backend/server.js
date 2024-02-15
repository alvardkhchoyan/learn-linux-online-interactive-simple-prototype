// const express = require('express')
// const cors = require('cors')

// const app = express()
// const port = 3007

// app.use(cors())

// const questions = [
//   {
//     id: 1,
//     text: 'What is the command to list files in a directory in Linux?',
//     correctAnswer: 'ls',
//   },
//   {
//     id: 2,
//     text: 'Which command is used to navigate to the home directory in Linux?',
//     correctAnswer: 'cd',
//   },
//   {
//     id: 3,
//     text: 'What does the command "chmod +x script.sh" do in Linux?',
//     correctAnswer: 'Make the script executable',
//   },
//   {
//     id: 4,
//     text: 'In Linux, what is the purpose of the sudo command?',
//     correctAnswer: 'Execute a command as a superuser',
//   },
// ]

// app.get('/api/questions', (req, res) => {
//   res.json(questions)
// })

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3007;

app.use(cors());

const questions = [
  {
    id: 1,
    text: 'What is the command to list files in a directory in Linux?',
    correctAnswer: 'ls',
  },
  {
    id: 2,
    text: 'Which command is used to navigate to the home directory in Linux?',
    correctAnswer: 'cd',
  },
  {
    id: 3,
    text: 'What does the command "chmod +x script.sh" do in Linux?',
    correctAnswer: 'Make the script executable',
  },
  {
    id: 4,
    text: 'In Linux, what is the purpose of the sudo command?',
    correctAnswer: 'Execute a command as a superuser',
  },
];

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
