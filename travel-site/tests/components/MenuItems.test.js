import { render, screen, fireEvent } from '@testing-library/react';
import MenuItems from '../../src/app/components/MenuItems';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MenuItems Component', () => {
  test('باید منوی موبایل را نمایش دهد و آن را باز و بسته کند', () => {
    render(<MenuItems />);

    const menuIcon = screen.getByTestId('button');
    fireEvent.click(menuIcon); // باز کردن منو
    const menu = screen.getByTestId('menu');
    expect(menu).toHaveClass('translate-x-0'); // منو باید باز شده باشد

    fireEvent.click(menuIcon); // بستن منو
    expect(menu).toHaveClass('translate-x-[-100%]'); // منو باید بسته شود
  });

  test('باید لینک‌ها به درستی نمایش داده شوند', () => {
    render(<MenuItems />);

    const homeLink = screen.getByText(/صفحه اصلی/i);
    expect(homeLink).toBeInTheDocument();
    
    const aboutUsLink = screen.getByText(/درباره ما/i);
    expect(aboutUsLink).toBeInTheDocument();
  });

  test('باید مسیر فعال به درستی مشخص شود پس از کلیک روی لینک', () => {
    // شبیه‌سازی مسیر صفحه فعال
    usePathname.mockReturnValue('/'); // صفحه اصلی فعال است

    render(<MenuItems />);

    // انتخاب عنصر <a> مربوط به "صفحه اصلی"
    const homeLink = screen.getByText(/صفحه اصلی/i);
    // برای بررسی کلاس فعال، به عنصر والد <li> برویم:
    const homeListItem = homeLink.closest('li');
    expect(homeListItem).toHaveClass('text-black');
    expect(homeListItem).toHaveClass('font-bold');

    // بررسی می‌کنیم که لینک‌های دیگر فعال نباشند
    const aboutUsLink = screen.getByText(/درباره ما/i);
    const aboutUsListItem = aboutUsLink.closest('li');
    expect(aboutUsListItem).not.toHaveClass('text-black');
    expect(aboutUsListItem).not.toHaveClass('font-bold');
  });
});
