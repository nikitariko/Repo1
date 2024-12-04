export class Validation {
  // Перевірити, чи поле не пусте
  public static isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  // Перевірка формату email
  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Перевірка року (тільки для років від 1000 до 2999)
  public static isValidYear(year: number): boolean {
    return year >= 1000 && year <= new Date().getFullYear();
  }

  // Валідація створення книги
  public static validateCreateBookRequest(
    bookName: string,
    author: string,
    year: number
  ): boolean {
    return (
      isNotEmpty(bookName) &&
      this.isNotEmpty(author) &&
      this.isValidYear(year)
    );
  }

  // Валідація створення користувача
  public static validateCreateUserRequest(
    username: string,
    email: string
  ): boolean {
    return this.isNotEmpty(username) && this.isValidEmail(email);
  }
}
