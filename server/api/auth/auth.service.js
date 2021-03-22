const bcrypt = require('bcryptjs');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(username, password) {
    const user = await userService.getByUsername(username);
    console.log('🚀 ~ file: auth.service.js ~ line 10 ~ login ~ user', user);
    if (!user) return Promise.reject('Invalid username or password');
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject('Invalid username or password');

    delete user.password;
    return user;
}

async function signup(username, password, fullname, imgUrl) {
    const user = await userService.getByUsername(username);
    if (user) {
        return Promise.reject('Username not available');
    }

    logger.debug(
        `auth.service - signup with username: ${username}, fullname:${fullname}`
    );
    if (!username || !password || !fullname) {
        return Promise.reject('fullname, username and password are required!');
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, fullname, imgUrl });
}

module.exports = {
    signup,
    login,
};
