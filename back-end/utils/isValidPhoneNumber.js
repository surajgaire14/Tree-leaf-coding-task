const isPhoneNumberValidFn = (number) => {
    const phoneNumberRegex = new RegExp("^\\+{0,2}([\\-\\.])?(\\(?\\d{0,3}\\))?([\\-\\. ])?\\(?\\d{0,3}\\)?([\\-\\. ])?\\d{3}([\\-\\. ])?\\d{4}")
    const isPhoneNumberValid = phoneNumberRegex.test(number)

    return isPhoneNumberValid
}

module.exports = { isPhoneNumberValidFn }