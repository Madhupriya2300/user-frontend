
export const AlphabetsValidation = (e) => {
  let value = e.target.value.replace(/[^a-zA-Z\s]/gi, '');
  if (value[0] === ' ') {
    value = value.slice(1);
  }
  e.target.value = value;
  return value;
};

export const MobileNumberValidation = (e) => {
  if (e.target.value.length < 10) {
    const cleanedValue = e.target.value.replace(/\D/g, '');
    const formattedValue = cleanedValue.slice(0, 10);

    e.target.value = formattedValue;
  }
};

export const MobileNumberFirstNumberValidation = (number) => {
  if (number?.length > 0) {
    let value = number;
    if (parseInt(value?.slice(0, 1)) < 6) {
      return 'Enter valid mobile number';
    }
  }
};

export const handleEmailValidation = email => {
  // eslint-disable-next-line no-useless-escape
  const isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
  let error;

  if (!isValid) {
    error = 'Enter valid Email id';
  }

  return error;
};

export const passwordValidation = (password) => {

  const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
    password
  );
  let error;
  if (!isValid) {
    error = 'Password must contain at least one uppercase letter, one number, and one special character';
  }

  return error;

};

export const InputTrimFunction = (e) => {
  if (e.target.value?.length > 0) {
    return e.target.value = e.target.value?.trim();
  }
};