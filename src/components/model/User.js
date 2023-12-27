export default class User {
  constructor(id, name, lastname, email, role, billingAddress) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.billingAddress = billingAddress;
  }
}
