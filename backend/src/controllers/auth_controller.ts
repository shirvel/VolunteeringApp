
const login = async (req, res, next) => {
    console.log("Login");
    res.status(400).send({
        'status': 'fail',
        'message': 'Not implemented'
    })
}

const register = async (req, res, next) => {
    console.log("Register");
    res.status(400).send({
        'status': 'fail',
        'message': 'Not implemented'
    })
}

const logout = async (req, res, next) => {
    console.log("Logout");
    res.status(400).send({
        'status': 'fail',
        'message': 'Not implemented'
    })
}

export default { login, register, logout};