function serialize(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);

  // If you have checkboxes or selects in multiple mode
  const multis = Array.from(
    form.querySelectorAll('select[multiple], [type="checkbox"]'),
  );
  const multiNames = Array.from(new Set(multis.map((input) => input.name)));
  // console.log('multis', multis);

  // Get full values for checkboxes & multi-selects
  if (multis.length) {
    for (const name of multiNames) {
      formData.set(name, formData.getAll(name));
    }
  }

  return data;
}

function populate(form, data = {}) {
  console.log('populate data', data);
  if (!form || !(form instanceof HTMLFormElement)) {
    throw new Error(
      `The populate function requires a form element. Instead received $form} of type ${form?.prototype?.Constructor?.name}`,
    );
  }

  // walk the object
  for (let [inputName, value] of Object.entries(data)) {
    // Make any bad values an empty string
    value ??= '';

    // try to find element in the form
    const element = form[inputName];

    // If we can't then bail
    if (!element || (!element) instanceof Element) {
      console.warn(`Could not find element ${inputName}: bailing...`);
      continue;
    }

    // see what type an element is to handle the process differently
    const type = element.type || element[0].type;

    switch (type) {
      case 'checkbox': {
        // Here, value is an array of values to be spread across the checkboxes that make up this input. It's the value of the input as a whole, NOT the value of one checkbox.
        const values = Array.isArray(value) ? value : [value];
        const checkboxes = Array.isArray(element) ? element : [element];
        console.log('values', values);
        for (const checkbox of checkboxes) {
          console.log(checkbox.value);
          if (values.includes(checkbox.value)) {
            checkbox.checked = true;
          }
        }
        break;
      }
      case 'select-multiple': {
        const values = Array.isArray(value) ? value : [value];

        for (const option of element) {
          if (values.includes(option.value)) {
            option.selected = true;
          }
        }
        break;
      }

      case 'select':
      case 'select-one':
        element.value = value.toString() || value;
        break;

      // case "time":
      // case "week":
      // case "datetime-local":
      case 'date':
        element.value = new Date(value).toISOString().split('T')[0];
        break;

      default:
        element.value = value;
        break;
    }
  }
}

const resetAllFormFields = (form) => {
  form.reset();

  for (const field of form.querySelectorAll('input[type = "hidden"]')) {
    field.value = '';
  }
};

function validate(input) {
  const formRow = input.closest('.form-row');
  const errorLabel = formRow.querySelector('label.error');

  console.log('errorLabel', errorLabel);

  errorLabel.textContent = '';

  const validityState = input.validity;
  console.log('validityState', validityState);

  if (validityState.valueMissing) {
    errorLabel.textContent = 'This field be must filled out!';
  }

  if (validityState.valid) {
    console.log('valid', validityState);
  }
}

export { serialize, populate, resetAllFormFields, validate };
