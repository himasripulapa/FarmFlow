export const formatCurrency = (amount: number, locale = 'en-IN'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString()}`;
  }
};

export const formatDate = (dateString: string, locale = 'en-IN'): string => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateString;
  }
};

export const formatNumber = (num: number, locale = 'en-IN'): string => {
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch {
    return num.toLocaleString();
  }
};
