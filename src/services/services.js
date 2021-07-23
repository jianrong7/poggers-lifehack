const axios = require('axios');

const getAll = async (difficulty, subject) => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${subject}&difficulty=${difficulty}`)
    return response.data
}

export default { getAll }