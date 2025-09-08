// create token and save it in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    //options for cookies
    const options = {
        maxAge: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie('token', token, options)

    res.status(statusCode).json({ success: true, user, token });
}

// create token and save it in cookies
const sendShopToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    //options for cookies
    const options = {
        maxAge: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie('seller_token', token, options)

    res.status(statusCode).json({ success: true, shop: user, token });
}

module.exports = { sendToken, sendShopToken };
