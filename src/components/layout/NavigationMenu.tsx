import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For potential search
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react'; // Icons

interface NavLink {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  navLinks?: NavLink[];
  showSearch?: boolean;
  onCartClick?: () => void;
  cartItemCount?: number;
}

const defaultNavLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/orders', label: 'My Orders' },
  // Add more links as needed
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  navLinks = defaultNavLinks,
  showSearch = false,
  onCartClick,
  cartItemCount = 0,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu. Mobile menu open:", isMobileMenuOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Toggled mobile menu. New state:", !isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-2xl font-bold text-orange-600">
              <Utensils className="h-8 w-8 mr-2" />
              FoodDash
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {showSearch && (
              <div className="ml-4">
                <Input type="search" placeholder="Search restaurants..." className="w-64" />
              </div>
            )}
          </div>

          {/* Right side icons (Cart, User) */}
          <div className="hidden md:flex items-center space-x-3">
            {onCartClick && (
              <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-600" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            )}
            {/* Placeholder for User/Account button */}
            {/* <Button variant="ghost" size="icon"><User className="h-6 w-6" /></Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {onCartClick && (
                <Button variant="ghost" size="icon" onClick={onCartClick} className="relative mr-2">
                    <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-600" />
                    {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {cartItemCount}
                    </span>
                    )}
                </Button>
            )}
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-40 bg-white shadow-lg p-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.href}`}
                to={link.href}
                onClick={toggleMobileMenu}
                className="block text-gray-700 hover:text-orange-600 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {showSearch && (
              <div className="mt-2">
                <Input type="search" placeholder="Search restaurants..." className="w-full" />
              </div>
            )}
             {/* Placeholder for mobile User/Account button */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;