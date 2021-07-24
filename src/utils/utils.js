function shuffle(array) {
    var currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function computedScoreForAlgorithm(userData, selectedSubject) {
    let computedScoreObj = {
        easy: {
            totalScore: 0,
            totalTests: 0,
            averageScore: 0
        },
        medium: {
            totalScore: 0,
            totalTests: 0,
            averageScore: 0
        },
        hard: {
            totalScore: 0,
            totalTests: 0,
            averageScore: 0
        }
    }
    userData.scores.forEach(score => {
        if (score.subject === selectedSubject) {
            if (score.difficulty === 'easy') {
                computedScoreObj.easy.totalScore += score.score / 10
                computedScoreObj.easy.totalTests += 1
            } else if (score.difficulty === 'medium') {
                computedScoreObj.medium.totalScore += (score.score / 10) * 2
                computedScoreObj.medium.totalTests += 1
            } else {
                computedScoreObj.hard.totalScore += (score.score / 10) * 3
                computedScoreObj.hard.totalTests += 1
            }
        }
    })
    computedScoreObj.easy.averageScore = (computedScoreObj.easy.totalScore / computedScoreObj.easy.totalTests) || 0
    computedScoreObj.medium.averageScore = (computedScoreObj.medium.totalScore / computedScoreObj.medium.totalTests) || 0
    computedScoreObj.hard.averageScore = (computedScoreObj.hard.totalScore / computedScoreObj.hard.totalTests) || 0

    return computedScoreObj
}
function setProgressBarStatusAlgorithm(computedScoreObj) {
    return {
        easy: Math.round(((computedScoreObj.easy.averageScore * 33) + Number.EPSILON) * 100) / 100,
        medium: Math.round(((computedScoreObj.medium.averageScore * 33) + Number.EPSILON) * 100) / 100,
        hard: Math.round(((computedScoreObj.hard.averageScore * 33) + Number.EPSILON) * 100) / 100,
    }
}
function collateOptions(questions) {
    let temp = []
    questions.map(question => {
        let options = []
        if (question.incorrect_answers.length === 1) {
            options = [
                { option: question.correct_answer, isCorrect: true },
                { option: question.incorrect_answers[0], isCorrect: false }
            ]
        } else {
            options = [
                { option: question.correct_answer, isCorrect: true },
                { option: question.incorrect_answers[0], isCorrect: false },
                { option: question.incorrect_answers[1], isCorrect: false },
                { option: question.incorrect_answers[2], isCorrect: false }
            ]
        }
        temp.push(options)
    })
    return temp
}

export { shuffle, computedScoreForAlgorithm, setProgressBarStatusAlgorithm, collateOptions }