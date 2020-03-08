const bcrypt = require('bcryptjs'); // 加密

const bcryptObj = {
    encrypt(query) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(query, salt);
        return hash;
    },
    decrypt(query, hash) {
        return bcrypt.compareSync(query, hash);
    }
};

module.exports = bcryptObj;
