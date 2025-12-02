import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import '../styles/navigation.css';

interface NavigationProps {
  onKaiaClick?: (e: React.MouseEvent) => void;
}

export function Navigation({ onKaiaClick }: NavigationProps) {
  const [location] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDropdownEnter = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="nav-logo">
              Revela<span className="nav-logo-ia">IA</span>
              <span className="nav-tagline">Hub de Inovação e Tecnologia</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button className="nav-mobile-toggle" onClick={toggleMobileMenu} aria-label="Menu">
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
            {/* Home */}
            <li>
              <Link href="/" className="nav-link">Home</Link>
            </li>

            {/* Blog */}
            <li>
              <a href="/blog" className="nav-link">Blog</a>
            </li>

            {/* Educação Tech - Dropdown */}
            <li 
              className="nav-dropdown"
              onMouseEnter={() => handleDropdownEnter('educacao')}
              onMouseLeave={handleDropdownLeave}
            >
              <span className="nav-link nav-link-dropdown">
                Educação Tech
                <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </span>
              <ul className={`nav-dropdown-menu ${openDropdown === 'educacao' ? 'show' : ''}`}>
                <li><a href="/incubadora" className="nav-dropdown-link">Incubadora</a></li>
                <li><a href="/servicos" className="nav-dropdown-link">Serviços</a></li>
                <li><a href="/mentorias" className="nav-dropdown-link nav-dropdown-sub">Mentorias</a></li>
                <li><a href="/palestras" className="nav-dropdown-link nav-dropdown-sub">Palestras</a></li>
                <li><a href="/hackathon" className="nav-dropdown-link nav-dropdown-sub">Hackathon</a></li>
              </ul>
            </li>

            {/* Soluções TEC - Dropdown */}
            <li 
              className="nav-dropdown"
              onMouseEnter={() => handleDropdownEnter('solucoes')}
              onMouseLeave={handleDropdownLeave}
            >
              <span className="nav-link nav-link-dropdown">
                Soluções TEC
                <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </span>
              <ul className={`nav-dropdown-menu ${openDropdown === 'solucoes' ? 'show' : ''}`}>
                <li><a href="/kaia" className="nav-dropdown-link">Kaia - App de IA</a></li>
                <li><a href="/produtos" className="nav-dropdown-link nav-dropdown-sub">Outros Produtos</a></li>
                <li><a href="/esteira" className="nav-dropdown-link nav-dropdown-sub">Esteira de Processos</a></li>
                <li><a href="/pitch" className="nav-dropdown-link nav-dropdown-sub">Pitch de Negócio</a></li>
              </ul>
            </li>

            {/* Sobre Nós - Dropdown */}
            <li 
              className="nav-dropdown"
              onMouseEnter={() => handleDropdownEnter('sobre')}
              onMouseLeave={handleDropdownLeave}
            >
              <span className="nav-link nav-link-dropdown">
                Sobre Nós
                <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </span>
              <ul className={`nav-dropdown-menu ${openDropdown === 'sobre' ? 'show' : ''}`}>
                <li><a href="#contato" className="nav-dropdown-link">Contato</a></li>
              </ul>
            </li>

            {/* Acesso Kaia */}
            <li>
              <Link href="/kaia" className="nav-link nav-link-accent">
                Acesso
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
