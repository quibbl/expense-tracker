import { CreateExpenseDto } from '../../expenses/dto/create-expense.dto';
import { AuthSignInDto, AuthSignUpDto } from '../../auth/dto/auth.dto';

type ValidationRule<T> = {
  key: keyof T;
  validate: (value: any) => boolean;
  errorMessage: string;
};

type ValidationResult<T> = {
  valid: boolean;
  errors: Partial<Record<keyof T, string>>;
};

const validateEmail = (value: unknown): value is string => {
  if (typeof value !== 'string') {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const validatePassword = (value: unknown): value is string => {
  if (typeof value !== 'string') {
    return false;
  }

  return value.length >= 8;
};

const validateNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const validateCreateExpense = (
  data: CreateExpenseDto,
): ValidationResult<CreateExpenseDto> => {
  const rules: ValidationRule<CreateExpenseDto>[] = [
    {
      key: 'name',
      validate: (v) => typeof v === 'string',
      errorMessage: 'Name is required',
    },
    {
      key: 'amount',
      validate: (v) => typeof v === 'number',
      errorMessage: 'Amount should be a number',
    },
    {
      key: 'currency',
      validate: (v) => typeof v === 'string',
      errorMessage: 'Currency is required',
    },
    {
      key: 'category',
      validate: (v) => typeof v === 'string',
      errorMessage: 'Category is required',
    },
    {
      key: 'date',
      validate: (v) => v instanceof Date && !Number.isNaN(v.getTime()),
      errorMessage: 'Date is required',
    },
  ];

  const errors: Partial<Record<keyof CreateExpenseDto, string>> = {};

  for (const rule of rules) {
    const value = data[rule.key];

    if (!rule.validate(value)) {
      errors[rule.key] = rule.errorMessage;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignUpInput = (data: unknown): ValidationResult<AuthSignUpDto> => {
  const payload = (data as Partial<AuthSignUpDto>) ?? {};

  const rules: ValidationRule<AuthSignUpDto>[] = [
    {
      key: 'email',
      validate: validateEmail,
      errorMessage: 'Email is invalid',
    },
    {
      key: 'name',
      validate: validateNonEmptyString,
      errorMessage: 'Name is required',
    },
    {
      key: 'password',
      validate: validatePassword,
      errorMessage: 'Password must be at least 8 characters long',
    },
  ];

  const errors: Partial<Record<keyof AuthSignUpDto, string>> = {};

  for (const rule of rules) {
    const value = payload[rule.key];

    if (!rule.validate(value)) {
      errors[rule.key] = rule.errorMessage;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignInInput = (data: unknown): ValidationResult<AuthSignInDto> => {
  const payload = (data as Partial<AuthSignInDto>) ?? {};

  const rules: ValidationRule<AuthSignInDto>[] = [
    {
      key: 'email',
      validate: validateEmail,
      errorMessage: 'Email is invalid',
    },
    {
      key: 'password',
      validate: validatePassword,
      errorMessage: 'Password must be at least 8 characters long',
    },
  ];

  const errors: Partial<Record<keyof AuthSignInDto, string>> = {};

  for (const rule of rules) {
    const value = payload[rule.key];

    if (!rule.validate(value)) {
      errors[rule.key] = rule.errorMessage;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
