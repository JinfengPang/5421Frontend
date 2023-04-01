import axios from 'axios';

export const QuizInfo = {
  getQuiz(id) {
    return axios.get(URL(`quiz/get_quiz?quiz_id=${id}`))
  },

  getAllQuizzes() {
    return axios
        .get(URL(`quiz/get_all_quiz?user_id=${localStorage.getItem("userId")}`)
    )
  }
}

export const IP = "54.237.91.85:5000";

export let URL = (model) => {
  return `http://${ IP }/api/${ model }`
};
