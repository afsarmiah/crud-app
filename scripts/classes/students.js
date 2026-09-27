import { nanoid } from 'https://esm.sh/nanoid';

export default class Student {
  constructor({ name, age, gender, year, course, _id = nanoid() } = {}) {
    if (typeof name !== 'string') {
      throw new Error(`The name must be a string and not ${typeof name}`);
    }

    if (!name.length) {
      throw new Error(`You must not leave the name input field empty`);
    }

    if (typeof age !== 'number') {
      throw new Error(`The age must be a number and not ${typeof age}`);
    }

    if (!age) {
      throw new Error(`You must not leave the age input field empty`);
    }

    if (typeof gender !== 'string') {
      throw new Error(`The gender must be a string and not ${typeof gender}`);
    }

    if (!gender.length) {
      throw new Error(`You must not leave the gender input field empty `);
    }

    if (!year) {
      throw new Error(`You must not leave the year input field empty`);
    }

    if (typeof course !== 'string') {
      throw new Error(`The course must be a string and not ${typeof course}`);
    }

    if (!course.length) {
      throw new Error(`You must not leave the course input field empty`);
    }

    this.name = name;
    this.age = age;
    this.gender = gender;
    this.year = year;
    this.course = course;
    this._id = _id;

    Object.freeze(this);
  }
}

// Here is our Class responsible for purely creating our students data object. Everytime we add a student, we'll use this class, as seen in App.js.
