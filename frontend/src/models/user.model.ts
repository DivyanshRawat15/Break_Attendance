export class User {
  constructor({ id = null, name = '', email = '', createdAt = new Date(), updatedAt = new Date() } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return { id: this.id, name: this.name, email: this.email, createdAt: this.createdAt, updatedAt: this.updatedAt };
  }
}

export class AttendanceRecord {
  constructor({ id = null, userId = 0, date = '', timing = 'morning', status = 'present' } = {}) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.timing = timing;
    this.status = status;
  }

  key() {
    return `${this.userId}-${this.timing}`;
  }
}