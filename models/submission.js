const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    test_id: {
        type: String,
        required: true
    },
    solution: {
        ques: [
          {
            quesId: {
              type: Schema.Types.ObjectId,
              ref: 'Ques',
              required: true
            },
            ans: { type: String, required: true }
          }
        ]
      }
});

submissionSchema.methods.addToSolution = function(question, ans) {
    const updatedSolvedQues = [...this.solution.ques];
    updatedSolvedQues.push({
        quesId: question._id,
        ans: ans
    });
    const updatedSolution = {
        ques: updatedSolvedQues
    }
    this.solution = updatedSolution;
    return this.save();
  };

module.exports = mongoose.model('Submission',submissionSchema);