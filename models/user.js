class User {
    constructor(id, name, email, username, password, role_id) {
            this.id = id;
            this.name = name;
            this.email = email
            this.username = username;
            this.password = password;
            this.role_id = role_id;
    }
}

module.exports = User;