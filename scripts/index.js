import App from './classes/student-app.js';
import { serialize, populate, resetAllFormFields, validate } from './utils.js';

const addForm = document.forms['add-student'];
const updateForm = document.forms['update-student'];
const tableBody = document.getElementById('table_body');
const filterInput = document.getElementById('filter');

const afsarsClassroom = new App();

if (filterInput) {
  filterInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;

    const filteredStudents = afsarsClassroom.filterStudents(searchTerm);

    console.log('searchTerm:', searchTerm);
    console.log('filteredStudents:', filteredStudents);

    renderStudents(filteredStudents);
  });
}

function createStudent(student) {
  // console.log('createStudent', student);
  const { name, age, gender, year, course, _id } = student;
  // console.log(name);
  // console.log(age);
  // console.log(gender);
  // console.log(year);
  // console.log(course);
  // console.log(_id);

  const tableRow = document.createElement('tr');
  tableRow.classList.add('table__body-row');

  const fields = [name, age, gender, year, course];
  // console.log('fields', fields);

  fields.forEach((field, index) => {
    const tableData = document.createElement('td');
    tableData.classList.add('table__body-info');
    tableData.textContent = field;
    tableRow.append(tableData);
  });

  const actionsTableDiv = document.createElement('div');
  actionsTableDiv.classList.add('table__actions');
  const actionsTableData = document.createElement('td');

  const updatelink = document.createElement('a');
  updatelink.href = `/update.html?id=${_id}`;
  updatelink.classList.add('table__update-button');
  updatelink.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('table__delete-button');
  deleteButton.dataset.id = _id;
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  actionsTableData.append(actionsTableDiv);
  actionsTableDiv.append(updatelink, deleteButton);

  tableRow.append(actionsTableData);

  return tableRow;
}

function renderStudents(students) {
  // console.log('renderstudent', students);

  if (!tableBody) return;

  const fragment = document.createDocumentFragment();

  if (!students.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', '7');
    td.classList.add('no-students-message');
    td.textContent = 'You have no students to display!';
    tr.append(td);
    fragment.append(tr);
  } else {
    for (const student of students) {
      fragment.append(createStudent(student));
    }
  }

  tableBody.replaceChildren(fragment);
}

if (tableBody) {
  afsarsClassroom.render((students) => {
    return renderStudents(students);
  });

  tableBody.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.table__delete-button');
    if (!deleteButton) return;

    const { id } = deleteButton.dataset;
    console.log('id', id);
    const row = deleteButton.closest('tr');
    console.log('row', row);

    afsarsClassroom.deleteStudent(id);
    row.remove();

    if (!tableBody.children.length) {
      renderStudents([]);
    }
  });
}

if (addForm) {
  addForm.addEventListener('reset', () => {
    // console.log('Form Reset');
    resetAllFormFields(addForm);
  });

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = serialize(addForm);

    const studentData = {
      ...data,
      age: Number(data.age),
    };

    const createdStudent = afsarsClassroom.createStudent(studentData);
    // console.log('createdStudent', createdStudent);

    resetAllFormFields(addForm);
  });

  const submitButton = document.querySelector('[type = "submit"]');

  submitButton.setAttribute('disabled', 'disabled');

  const controlSubmitButton = (e) => {
    if (addForm.matches(':valid')) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  };

  addForm.addEventListener('input', controlSubmitButton);
  addForm.addEventListener('change', controlSubmitButton);

  const nameField = addForm['name'];
  const ageField = addForm['age'];
  const genderField = addForm['gender'];
  const yearField = addForm['year'];
  const courseField = addForm['course'];

  nameField.addEventListener('input', (e) => {
    validate(nameField);
  });
  nameField.addEventListener('change', (e) => {
    validate(nameField);
  });

  ageField.addEventListener('input', (e) => {
    validate(ageField);
  });
  ageField.addEventListener('change', (e) => {
    validate(ageField);
  });

  genderField.addEventListener('input', (e) => {
    validate(genderField);
  });
  genderField.addEventListener('change', (e) => {
    validate(genderField);
  });

  yearField.addEventListener('input', (e) => {
    validate(yearField);
  });
  yearField.addEventListener('change', (e) => {
    validate(yearField);
  });

  courseField.addEventListener('input', (e) => {
    validate(courseField);
  });
  courseField.addEventListener('change', (e) => {
    validate(courseField);
  });
}

if (updateForm) {
  updateForm.addEventListener('reset', () => {
    // console.log('Form Reset');
    resetAllFormFields(updateForm);
  });

  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedData = serialize(updateForm);
    updatedData.age = Number(updatedData.age);

    console.log('updatedData', updatedData);

    const { _id, ...remainingData } = updatedData;
    console.log('_id', _id);
    console.log('pre data', remainingData);

    afsarsClassroom.updateStudent(_id, remainingData);
    console.log('post data', remainingData);
  });

  const submitButton = document.querySelector('[type = "submit"]');

  submitButton.setAttribute('disabled', 'disabled');

  const controlSubmitButton = (e) => {
    if (updateForm.matches(':valid')) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  };

  updateForm.addEventListener('input', controlSubmitButton);
  updateForm.addEventListener('change', controlSubmitButton);

  const nameField = updateForm['name'];
  const ageField = updateForm['age'];
  const genderField = updateForm['gender'];
  const yearField = updateForm['year'];
  const courseField = updateForm['course'];

  nameField.addEventListener('input', (e) => {
    validate(nameField);
  });
  nameField.addEventListener('change', (e) => {
    validate(nameField);
  });

  ageField.addEventListener('input', (e) => {
    validate(ageField);
  });
  ageField.addEventListener('change', (e) => {
    validate(ageField);
  });

  genderField.addEventListener('input', (e) => {
    validate(genderField);
  });
  genderField.addEventListener('change', (e) => {
    validate(genderField);
  });

  yearField.addEventListener('input', (e) => {
    validate(yearField);
  });
  yearField.addEventListener('change', (e) => {
    validate(yearField);
  });

  courseField.addEventListener('input', (e) => {
    validate(courseField);
  });
  courseField.addEventListener('change', (e) => {
    validate(courseField);
  });

  const url = new URL(location);
  console.log('url', url);
  const params = new URLSearchParams(url.search);
  console.log('params', params);
  const id = params.get('id');
  console.log('id', id);

  if (!id) {
    console.log('Student with this id does not exist');
  } else {
    const student = afsarsClassroom.getStudentByID(id);
    console.log('student', student);
    if (!student) {
      console.log(`Error: student with ${id} does not exist`);
    } else {
      const data = {
        ...student,
      };
      console.log('data', data);
      populate(updateForm, data);
    }
  }
}
