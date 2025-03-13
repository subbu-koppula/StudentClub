'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { auth } from "../../app/firebase/config";
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black text-white border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Student Club</h1>
        
        {/* Mobile hamburger menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:block ml-2">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/clubs" className="hover:text-gray-300 transition-colors">
                Clubs
              </Link>
            </li>
            <li>
              <Link href="/Forum" className="hover:text-gray-300 transition-colors">
                Forum
              </Link>
              <Link href="/chat" className="hover:text-gray-300 transition-colors">
                Forum
              </Link>
            </li>
            {/* Replace login link with sign out button if user is logged in */}
            {user ? (
              <li>
                <Button className="text-white bg-black" variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="hover:text-gray-300 transition-colors">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
      {/* Mobile navigation overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-50 transition-opacity duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end">
              <button 
                className="text-white focus:outline-none"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-8">
              <ul className="space-y-6 text-center">
                <li>
                  <Link 
                    href="/" 
                    className="text-xl hover:text-gray-300 transition-colors"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/clubs" 
                    className="text-xl hover:text-gray-300 transition-colors"
                    onClick={closeMenu}
                  >
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/Forum" 
                    className="text-xl hover:text-gray-300 transition-colors"
                    onClick={closeMenu}
                  >
                    Forum
                  </Link>
                </li>
                {/* Replace login link with sign out button if user is logged in */}
                {user ? (
                  <li className="flex justify-center">
                    <Button 
                      className="text-white bg-black mt-4" 
                      variant="outline" 
                      onClick={() => {
                        handleSignOut();
                        closeMenu();
                      }}
                    >
                      Sign Out
                    </Button>
                  </li>
                ) : (
                  <li>
                    <Link 
                      href="/login" 
                      className="text-xl hover:text-gray-300 transition-colors"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;