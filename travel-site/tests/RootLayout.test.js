import { render, screen } from "@testing-library/react";
import RootLayout from "../src/app/layout";

// شبیه‌سازی کامپوننت MenuItems
jest.mock("../src/app/components/MenuItems", () => () => (
  <nav>
    <ul>
      <li>صفحه اصلی</li>
      <li>درباره ما</li>
      <li>خدمات</li>
      <li>تماس با ما</li>
      <li>ثبت نام</li>
    </ul>
  </nav>
));

// سرکوب کامل پیام‌های خطای مربوط به رندر کردن <html> به عنوان فرزند <html>
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("<html> cannot be a child of") ||
       args[0].includes("You are mounting a new html component"))
    ) {
      return;
    }
    // برای سایر خطاها، پیام چاپ شود
    console.warn(...args);
  });
});

afterAll(() => {
  console.error.mockRestore();
});

describe("RootLayout Component", () => {
  test("هدر، فوتر و محتوای اصلی باید رندر شوند", () => {
    render(<RootLayout>صفحه اصلی</RootLayout>);
    expect(screen.getByTestId("header")).toBeInTheDocument(); // چک کردن هدر
    expect(screen.getByTestId("main")).toBeInTheDocument();   // چک کردن محتوای اصلی
    expect(screen.getByTestId("footer")).toBeInTheDocument(); // چک کردن فوتر
  });

  test("لینک 'Travel' باید به صفحه اصلی لینک شود", () => {
    render(<RootLayout>صفحه اصلی</RootLayout>);
    const travelLink = screen.getByRole("link", { name: /Travel/i });
    expect(travelLink).toHaveAttribute("href", "/"); // چک کردن لینک Travel
  });

  test("باید منوی ناوبری (`MenuItems`) نمایش داده شود", () => {
    render(<RootLayout>صفحه اصلی</RootLayout>);
    // چک کردن نمایش منوی ناوبری
    const menuItems = screen.getAllByText("صفحه اصلی");
    expect(menuItems[0]).toBeInTheDocument();
    const aboutUsMenuItem = screen.getByText("درباره ما");
    expect(aboutUsMenuItem).toBeInTheDocument();
  });

  test("نام 'محمد سعید سعیدیان' باید در فوتر نمایش داده شود", () => {
    render(<RootLayout>صفحه اصلی</RootLayout>);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveTextContent("محمد سعید سعیدیان");
  });
});
