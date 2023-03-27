import axios from 'axios';

const QuizInfo = {
  getQuiz(id) {
    return axios.get(`http://34.200.215.19:5000/api/quiz/get_quiz?quiz_id=${id}`)
  },

  getAllQuizzes() {
    return axios.get('http://34.200.215.19:5000/api/quiz/get_all_quizzes')
  }
}

export default QuizInfo;
