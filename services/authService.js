import bcrypt from 'bcrypt';
import { users, logins, getNextId } from './dataStore.js';
import { User, Login } from './objects.js';

export class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}

export async function registerUser({ name, email, password }) {
    name = String(name ?? '').trim();
    email = String(email ?? '').trim().toLowerCase();

    // if any field is empty, throw error
    if (!name || !email || !password) {
        throw new ValidationError('Please fill in all fields!');
    }

    // checks the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError('Please enter a valid email address.');
    }

    // password has to be at least 8 chars
    if (password.length < 8) {
        throw new ValidationError('Password must be at least 8 characters.');
    }

    // if user with the same email already exists, throw error
    if (users.some(user => user.email === email)) {
        throw new ValidationError('An account with this email already exists.');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // creates new user and adds it to the users array
    const user = new User(getNextId('user'), name, email, hashedPassword, 'customer');
    users.push(user);
    return user;
}

export async function loginUser({ email, password }) {
    email = String(email ?? '').trim().toLowerCase();
    password = String(password ?? '');
    
    const user = users.find(user => user.email === email);

    // only compare if the user exists 
    const passwordCorrect = user ? await bcrypt.compare(password, user.password) : false;
    const success = Boolean(user) && passwordCorrect;

    // record every login attempt
    logins.push(new Login(
        getNextId('login'),
        user ? user.id : null,
        new Date().toISOString(),
        success ? 'successful' : 'failed'
    ));
    
    if (!success) {
        throw new ValidationError('Incorrect email or password.', 401);
    }

    return user;
}
