const user = {
    

    _id: "1",
    name: "ezequiel",
    email: "ezeedge@gmail.com",
    picture: 'https://cloudinary.com/asdf'

}

module.exports = {
    Query : {
        me: () => user
    }
}