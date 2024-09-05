import React, { useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Box,
  Typography,
  Grid,
  Stack,
} from "@mui/material";

const questions = [
  {
    id: 1,
    question: "Figured means...",
    options: {
      A: "To Decide",
      B: "To React",
      C: "To Sleep",
      D: "To Reject",
    },
    correctAnswer: "A",
  },
  {
    id: 2,
    question:
      "Our population has badly hampered the ________ growth in the country.",
    options: {
      A: "Social",
      B: "Political",
      C: "Economic",
      D: "Mental",
    },
    correctAnswer: "C",
  },
  {
    id: 3,
    question: "Massive means...",
    options: {
      A: "Poor",
      B: "Difficult",
      C: "Heavy",
      D: "Small",
    },
    correctAnswer: "C",
  },

  {
    id: 4,
    question: "Figured means...",
    options: {
      A: "To Decide",
      B: "To React",
      C: "To Sleep",
      D: "To Reject",
    },
    correctAnswer: "A",
  },
  {
    id: 5,
    question:
      "Our population has badly hampered the ________ growth in the country.",
    options: {
      A: "Social",
      B: "Political",
      C: "Economic",
      D: "Mental",
    },
    correctAnswer: "C",
  },
  {
    id: 6,
    question: "Massive means...",
    options: {
      A: "Poor",
      B: "Difficult",
      C: "Heavy",
      D: "Small",
    },
    correctAnswer: "C",
  },



  {
    id: 7,
    question: "Figured means...",
    options: {
      A: "To Decide",
      B: "To React",
      C: "To Sleep",
      D: "To Reject",
    },
    correctAnswer: "A",
  },
  {
    id: 8,
    question:
      "Our population has badly hampered the ________ growth in the country.",
    options: {
      A: "Social",
      B: "Political",
      C: "Economic",
      D: "Mental",
    },
    correctAnswer: "C",
  },
  {
    id: 9,
    question: "Massive means...",
    options: {
      A: "Poor",
      B: "Difficult",
      C: "Heavy",
      D: "Small",
    },
    correctAnswer: "C",
  },

  {
    id: 10,
    question: "Massive means...",
    options: {
      A: "Poor",
      B: "Difficult",
      C: "Heavy",
      D: "Small",
    },
    correctAnswer: "C",
  },
  // Add more questions here in the same format (total 10 questions)
];

const MCQExam = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({
    attended: 0,
    skipped: 0,
    incorrect: 0,
    marks: 0,
    percentage: 0,
  });

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let attended = 0;
    let incorrect = 0;
    let marks = 0;

    answers.forEach((answer, index) => {
      if (answer) {
        attended++;
        if (answer === questions[index].correctAnswer) {
          marks++;
        } else {
          incorrect++;
        }
      }
    });

    const skipped = questions.length - attended;
    const percentage = (marks / questions.length) * 100;

    setResult({ attended, skipped, incorrect, marks, percentage });
    setSubmitted(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      {!submitted ? (
        <>
          {questions.map((q, index) => (
            <Stack key={q.id} sx={{display: "flex", flexDirection: "cloumn", justifyContent: "left", marginBottom: "20px"}}>
              <FormControl
                component="fieldset"
                
                sx={{ mb: 3, border: "1px solid red" }}
              >
                <FormLabel component="legend">
                  {index + 1}. {q.question}
                </FormLabel>
                <RadioGroup
                  name={`question-${q.id}`}
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                >
                  <Grid container spacing={2}>
                    {Object.entries(q.options).map(([key, value]) => (
                      <Grid item xs={6} sm={3} key={key}>
                        <FormControlLabel
                          value={key}
                          control={<Radio />}
                          label={value}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Stack>
          ))}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      ) : (
        <Box>
          <Typography variant="h6">Result Summary</Typography>
          <Typography>Questions Attended: {result.attended}</Typography>
          <Typography>Questions Skipped: {result.skipped}</Typography>
          <Typography>Incorrect Answers: {result.incorrect}</Typography>
          <Typography>
            Marks Obtained: {result.marks} / {questions.length}
          </Typography>
          <Typography>Percentage: {result.percentage}%</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MCQExam;
