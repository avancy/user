export default class EvaluationUtil {
    static filterUserAnswers (applicant_evaluation) {
        console.log("===================================")
        console.log(applicant_evaluation)
        console.log("===================================")
        const { answers = null, evaluation } = applicant_evaluation;
        const questions = evaluation.questions;

        let filteredAnswers = null;
        if (answers != null) {
            filteredAnswers = Object.entries(answers).reduce((acc, [question_id, questionAnswers]) => {
               acc[question_id] = Object.entries(questionAnswers).reduce((innerAcc, [option_id, optionAnswer]) => {
                   innerAcc[option_id] = optionAnswer.is_correct
                       ? { ...optionAnswer, is_correct: undefined }
                       : { ...optionAnswer };
                   return innerAcc;
               }, {});
               return acc;
           }, {});
        }

        return { ...applicant_evaluation, evaluation: { ...evaluation, questions }, answers: filteredAnswers };
    };
}
