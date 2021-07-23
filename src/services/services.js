const axios = require('axios');

const getAll = async (questionNumber) => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${questionNumber}&category=19`)
    return response.data
}

export default { getAll }