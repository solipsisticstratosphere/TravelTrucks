import React, { useState, useEffect, useRef } from "react";
import { Field } from "formik";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Calendar.module.css";

const Calendar = ({ value, onChange, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date.toISOString().split("T")[0]);
    }
    onClose();
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyCell} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const isToday = new Date().toDateString() === date.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => handleDateSelect(date)}
        className={`${styles.dateButton} 
          ${isSelected ? styles.selectedDate : ""}
          ${isToday && !isSelected ? styles.today : ""}`}
        type="button"
      >
        {day}
      </button>
    );
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <button
          onClick={prevMonth}
          className={styles.navigationButton}
          type="button"
        >
          <ChevronLeft size={16} />
        </button>
        <div className={styles.monthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button
          onClick={nextMonth}
          className={styles.navigationButton}
          type="button"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className={styles.daysGridHeader}>
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.daysGrid}>{days}</div>
    </div>
  );
};

const FormCalendarField = ({ name, placeholder, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className={styles.inputContainer} ref={containerRef}>
          <input
            {...field}
            {...props}
            type="text"
            placeholder={placeholder}
            onClick={() => setIsOpen(true)}
            value={formatDate(field.value)}
            readOnly
            className={`${styles.dateInput} ${className || ""}`}
          />
          {isOpen && (
            <Calendar
              value={field.value}
              onChange={(date) => {
                form.setFieldValue(name, date);
              }}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </Field>
  );
};

export default FormCalendarField;
