import { phone } from 'phone';

export function isValidIndianPhoneNumber(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') return false;

    const result = phone(phoneNumber.trim(), {
        country: 'IN',
        validateMobilePrefix: true,
    });

    return result.isValid;
}
