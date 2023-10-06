import crypto from 'crypto';

export const CSRFToken = (): string => {
  try {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
  } catch (error) {
    console.error('Could not generate CSRF token', error);
    throw error;
  }
};
