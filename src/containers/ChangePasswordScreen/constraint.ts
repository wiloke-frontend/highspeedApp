import i18n from 'utils/functions/i18n';

const getConstraints = () => ({
  oldpassword: {
    presence: {
      message: i18n.t('fieldIsRequired', { field: i18n.t('currentPassword') }),
    },
  },
  newpassword: {
    presence: {
      message: i18n.t('fieldIsRequired', { field: i18n.t('newPassword') }),
    },
    // special: {
    //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    //   message: 'Special password.....',
    // },
    length: {
      minimum: 8,
      message: i18n.t('fieldMinimum', { field: i18n.t('password'), number: 8 }),
    },
  },
  // confirmpassword: {
  //   presence: {
  //     message: i18n.t('fieldIsRequired', { field: i18n.t('confirmPassword') }),
  //   },
  //   // special: {
  //   //   pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  //   //   message: 'Special password.....',
  //   // },
  //   length: {
  //     minimum: 8,
  //     message: i18n.t('fieldMinimum', { field: i18n.t('password'), number: 8 }),
  //   },
  // },
});

export default getConstraints;
