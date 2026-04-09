import { nanoid } from 'https://esm.sh/nanoid';
import Student from './students.js';
import rfdc from 'https://esm.sh/rfdc';
import deepmerge from 'https://esm.sh/deepmerge';

const clone = rfdc({ proto: true });

export default class App {
  #students = [];

  constructor({
    startingData = [],
    teacher,
    storageKey = 'students',
    hydrate = true,
  } = {}) {
    // this.createStudents(startingData);
    Object.defineProperty(this, 'teacher', {
      value: teacher,
      enumerable: true,
    });

    this.storageKey = storageKey;

    if (hydrate) {
      this.hydrateApp();
    }
  }

  createStudent(student) {
    const newStudent = new Student(student);
    console.log(newStudent);
    this.#students = this.#students.toSpliced(
      this.#students.length,
      0,
      newStudent,
    );
    this.persistData();
    return newStudent._id;
  }

  createStudents(students) {
    for (const student of students) {
      this.createStudent(student);
    }
  }

  render(fn = App.consoleRender) {
    const clonedStudents = clone(this.#students);

    return fn(clonedStudents);
  }

  static consoleRender(student) {
    if (!student.length) {
      return console.log(`No students to display`);
    }
    console.table(student);
  }

  updateStudent(id, updates) {
    console.log(`Updating student with id ${id} with`, updates);

    const idx = this.#students.findIndex((student) => {
      return student._id === id;
    });

    if (idx === -1) {
      throw new Error(`The student with id of ${id} does not exist`);
    }
    console.log(idx);

    const studentToUpdate = this.#students[idx];
    console.log(studentToUpdate);

    const updatedStudent = new Student(deepmerge(studentToUpdate, updates));
    console.log(updatedStudent);

    this.#students = this.#students.toSpliced(idx, 1, updatedStudent);

    this.persistData();

    return studentToUpdate;
  }

  deleteStudent(id) {
    console.log(`Deleting student with id of ${id}`);

    const idx = this.#students.findIndex((student) => {
      return student._id === id;
    });

    if (idx === -1) {
      throw new Error(`The student with id of ${id} does not exist`);
    }
    console.log(idx);

    const studentToDelete = this.#students[idx];
    console.log(studentToDelete);

    this.#students = this.#students.toSpliced(idx, 1);

    this.persistData();

    return studentToDelete;
  }

  getStudentByID(id) {
    const student = this.#students.find((student) => {
      return student._id === id;
    });

    console.log(student);
    return student;
  }

  persistData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.#students));
  }

  hydrateApp() {
    const studentsData =
      JSON.parse(localStorage.getItem(this.storageKey)) || [];

    this.createStudents(studentsData);
  }
}
