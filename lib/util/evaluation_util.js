export default class EvaluationUtil {
    static filterUserAnswers (applicant_evaluation) {
        if (!applicant_evaluation) {
            return null;
        }
        const answers = applicant_evaluation?.answers || null;
        const evaluation = applicant_evaluation.evaluation;
        const { questions, evaluation_type } = evaluation;

        let filteredAnswers = null;
        if (answers != null) {
            switch (evaluation_type) {
                case 'form': 
                filteredAnswers = Object.entries(answers).reduce((acc, [question_id, questionAnswers]) => {
                   acc[question_id] = Object.entries(questionAnswers).reduce((innerAcc, [option_id, optionAnswer]) => {
                       innerAcc[option_id] = optionAnswer.is_correct
                           ? { ...optionAnswer, is_correct: undefined }
                           : { ...optionAnswer };
                       return innerAcc;
                   }, {});
                   return acc;
               }, {});
               break;
               case 'disc': 
               filteredAnswers = Object.entries(answers).reduce((acc, [question_id, questionAnswers]) => {
                acc[question_id] = {
                    ...questionAnswers,
                    perfil: undefined,
                    behavior_count: undefined,
                    word_selecteds: questionAnswers.word_selecteds, 
                };
                return acc;
            }, {}); 
            }
        }

        const updatedQuestions = questions.map(question => {
            if (question.multiple_choices) { 
                const updatedChoices = question.multiple_choices.map(choice => {
                    const { is_correct, ...rest } = choice;
                    return rest; 
                });
                return { ...question, multiple_choices: updatedChoices };
            }
            return question;
        });

        return { 
            ...applicant_evaluation, 
            evaluation: { 
                ...evaluation, 
                questions: updatedQuestions
            }, 
            answers: filteredAnswers 
        };
    };
}

