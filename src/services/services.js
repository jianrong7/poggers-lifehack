const axios = require('axios');

const getAll = async () => {
    const response = await axios.get('https://opentdb.com/api.php?amount=50&category=19')
    return response.data
}

export default { getAll }