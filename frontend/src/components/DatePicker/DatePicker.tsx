import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';

import {
  CALENDAR_ICON_PATH,
  DAY_NAMES,
  formatFooterLabel,
  formatHeaderLabel,
  formatMonthLabel,
  getMonthGrid,
  parseISODate,
  toISODate,
} from './DatePicker.constants';
import styles from './DatePicker.module.css';

type NativeInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'value' | 'defaultValue' | 'onChange'
>;

export type DatePickerProps = NativeInputProps & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onApply?: (value: string) => void;
  defaultOpen?: boolean;
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      onApply,
      defaultOpen = true,
      id,
      name,
      min,
      max,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(() => {
      return toISODate(parseISODate(defaultValue) ?? new Date());
    });
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [visibleMonthDate, setVisibleMonthDate] = useState(() => {
      return parseISODate(value ?? defaultValue) ?? new Date();
    });

    const selectedValue = isControlled ? value : internalValue;
    const selectedDate = useMemo(() => {
      return parseISODate(selectedValue) ?? new Date();
    }, [selectedValue]);

    useEffect(() => {
      const dateFromValue = parseISODate(selectedValue);
      if (dateFromValue) {
        setVisibleMonthDate(dateFromValue);
      }
    }, [selectedValue]);

    const monthGrid = useMemo(() => {
      return getMonthGrid(
        visibleMonthDate.getFullYear(),
        visibleMonthDate.getMonth()
      );
    }, [visibleMonthDate]);

    const headerLabel = useMemo(() => formatHeaderLabel(selectedDate), [selectedDate]);
    const footerLabel = useMemo(() => formatFooterLabel(selectedDate), [selectedDate]);
    const monthLabel = useMemo(
      () => formatMonthLabel(visibleMonthDate),
      [visibleMonthDate]
    );

    const setNextValue = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    };

    const moveMonth = (delta: number) => {
      setVisibleMonthDate((currentMonth) => {
        return new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + delta,
          1
        );
      });
    };

    const selectDate = (date: Date) => {
      setNextValue(toISODate(date));
    };

    const handleInputChange: ComponentPropsWithoutRef<'input'>['onChange'] = (
      event
    ) => {
      const nextDate = parseISODate(event.target.value);
      if (nextDate) {
        setVisibleMonthDate(nextDate);
      }

      setNextValue(event.target.value);
    };

    const mergedClassName = className
      ? `${styles.datePicker} ${className}`
      : styles.datePicker;

    return (
      <div className={mergedClassName}>
        <input
          ref={ref}
          id={inputId}
          className={styles.nativeInput}
          type="date"
          name={name}
          min={min}
          max={max}
          required={required}
          disabled={disabled}
          value={selectedValue}
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
          {...props}
        />

        <button
          type="button"
          className={styles.summaryButton}
          aria-expanded={isOpen}
          aria-controls={`${inputId}-panel`}
          onClick={() => setIsOpen((current) => !current)}
          disabled={disabled}
        >
          <span className={styles.calendarIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d={CALENDAR_ICON_PATH} />
            </svg>
          </span>
          <span className={styles.summaryLabel}>{headerLabel}</span>
        </button>

        {isOpen ? (
          <section
            id={`${inputId}-panel`}
            className={styles.panel}
            aria-label="Date picker"
          >
            <div className={styles.monthHeader}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => moveMonth(-1)}
                aria-label="Previous month"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <strong className={styles.monthTitle}>{monthLabel}</strong>

              <button
                type="button"
                className={styles.navButton}
                onClick={() => moveMonth(1)}
                aria-label="Next month"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <table className={styles.calendarTable}>
              <thead>
                <tr>
                  {DAY_NAMES.map((dayName) => (
                    <th key={dayName} scope="col">
                      {dayName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: monthGrid.length / 7 }, (_, weekIndex) => (
                  <tr key={`week-${weekIndex}`}>
                    {monthGrid
                      .slice(weekIndex * 7, weekIndex * 7 + 7)
                      .map((date, index) => {
                        if (!date) {
                          return <td key={`empty-${weekIndex}-${index}`} />;
                        }

                        const isoDate = toISODate(date);
                        const isSelected = selectedValue === isoDate;

                        return (
                          <td key={isoDate}>
                            <button
                              type="button"
                              className={styles.dayButton}
                              aria-pressed={isSelected}
                              onClick={() => selectDate(date)}
                            >
                              <span className={isSelected ? styles.selectedDay : ''}>
                                {date.getDate()}
                              </span>
                            </button>
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.footer}>
              <output className={styles.footerDate} htmlFor={inputId}>
                {footerLabel}
              </output>
              <button
                type="button"
                className={styles.setButton}
                onClick={() => {
                  onApply?.(selectedValue);
                  setIsOpen(false);
                }}
              >
                Set Date
              </button>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
