'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface DatePickerProps {
  value?: string // format: "2023-01" or ""
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  label?: string
}

export default function DatePicker({ value, onChange, placeholder, disabled, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(() => {
    if (value) {
      return parseInt(value.split('-')[0])
    }
    return new Date().getFullYear()
  })
  const [selectedMonth, setSelectedMonth] = useState(() => {
    if (value) {
      return parseInt(value.split('-')[1]) - 1
    }
    return new Date().getMonth()
  })

  const months = [
    'Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
    'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  const formatDisplayValue = (dateStr: string) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    return `${months[parseInt(month) - 1]} ${year}`
  }

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex)
    const formattedValue = `${selectedYear}-${(monthIndex + 1).toString().padStart(2, '0')}`
    onChange(formattedValue)
    setIsOpen(false)
  }

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white bg-white text-left flex items-center justify-between disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
          {value ? formatDisplayValue(value) : placeholder}
        </span>
        <Calendar className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
          {/* Year Selector */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={() => handleYearChange(selectedYear - 1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="font-medium text-gray-900 dark:text-white bg-transparent border-none outline-none"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <button
              type="button"
              onClick={() => handleYearChange(selectedYear + 1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-3 gap-2 p-3">
            {months.map((month, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleMonthSelect(index)}
                className={`
                  p-2 text-sm rounded-md transition-colors
                  ${selectedMonth === index 
                    ? 'bg-indigo-600 text-white' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {month}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 p-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-1"
            >
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  )
}