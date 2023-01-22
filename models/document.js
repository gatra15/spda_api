class Document {
    constructor(id, location, name, photo, created_by) {
            this.id = id;
            this.location = location;
            this.name = name;
            this.photo = photo;
            this.created_by = created_by;
    }
}

module.exports = Document;