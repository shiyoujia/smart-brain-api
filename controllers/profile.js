const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    console.log('db is what???????', req.params);
    db.select('*').from('login').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}