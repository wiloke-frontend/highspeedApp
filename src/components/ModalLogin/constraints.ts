import i18n from 'utils/functions/i18n';

const getConstraintsLogin = () => {
  return {
    username: {
      presence: {
        message: i18n.t('fieldIsRequired', { field: i18n.t('username') }),
      },
      length: {
        minimum: 6,
        message: i18n.t('fieldMinimum', { field: i18n.t('username'), number: 6 }),
      },
    },
    password: {
      presence: {
        message: i18n.t('fieldIsRequired', { field: i18n.t('password') }),
      },
      // special: {
      //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      //   message: 'Special password.....',
      // },
      length: {
        minimum: 6,
        message: i18n.t('fieldMinimum', { field: i18n.t('password'), number: 6 }),
      },
    },
  };
};

export default getConstraintsLogin;

export const getConstraintsRegister = () => {
  return {
    user_register: {
      presence: {
        message: i18n.t('fieldIsRequired', { field: i18n.t('username') }),
      },
      length: {
        minimum: 6,
        message: i18n.t('fieldMinimum', { field: i18n.t('username'), number: 6 }),
      },
    },
    password_register: {
      presence: {
        message: i18n.t('fieldIsRequired', { field: i18n.t('password') }),
      },
      length: {
        minimum: 6,
        message: i18n.t('fieldMinimum', { field: i18n.t('password'), number: 6 }),
      },
    },
    user_email: {
      presence: {
        message: i18n.t('fieldIsRequired', { field: i18n.t('email') }),
      },
      special: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: i18n.t('fieldInvalid', { field: i18n.t('email') }),
      },
    },
  };
};
