
const list = async () => {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok) {
        return [];
    }

    var result = await response.json();
    return result.data;
};

const findById = async (/** @type {number} */ id) => {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok) {
        return null;
    }

    var result = await response.json();
    return result.data[0] ?? null;
};

export default {
    list,
    findById
}