import { CreateExpenseDto } from '../../expenses/dto/create-expense.dto';

type ValidationRule<T> = {
  key: keyof T;
  validate: (value: any) => boolean;
  errorMessage: string;
};

type ValidationResult<T> = {
  valid: boolean;
  errors: Partial<Record<keyof T, string>>;
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
      validate: (v) => typeof v === 'number',
      errorMessage: 'Amount should be a number',
    },
    {
      key: 'category',
      validate: (v) => typeof v === 'string',
      errorMessage: 'Category is required',
    },
    {
      key: 'date',
      validate: (v) => typeof v === 'string',
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
