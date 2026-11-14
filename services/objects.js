

// object User 
export class User {
  constructor(id, name, email, password, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

// object Login 
export class Login {
  constructor(id, userId, timestamp, status) {
    this.id = id;
    this.userId = userId;
    this.timestamp = timestamp;
    this.status = status;
  }
}

// object Restaurant 
export class Restaurant {
  constructor(id, name, address, openHour, closeHour) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.openHour = openHour;
    this.closeHour = closeHour;
  }
}

// object Table 
export class Table {
  constructor(id, restaurantId, tableNumber, capacity, status) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.tableNumber = tableNumber;
    this.capacity = capacity;
    this.status = status;
  }
}

// object Reservation 
export class Reservation {
  constructor(id, userId, tableId, date, time, partySize, status) {
    this.id = id;
    this.userId = userId;
    this.tableId = tableId;
    this.date = date;
    this.time = time;
    this.partySize = partySize;
    this.status = status;
  }
}

// object MenuItem 
export class MenuItem {
  constructor(id, restaurantId, name, price) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.name = name;
    this.price = price;
  }
}