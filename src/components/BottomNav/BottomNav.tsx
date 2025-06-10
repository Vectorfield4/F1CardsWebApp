import { Tabbar } from "@telegram-apps/telegram-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Library, Users, ShoppingCart } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { 
      id: 'home', 
      path: '/', 
      icon: <Home size={20} style={{ height: '20px' }} />, 
      label: 'Главная' 
    },
    { 
      id: 'collection', 
      path: '/collection', 
      icon: <Library size={20}  style={{ height: '24px' }} />, 
      label: 'Коллекция' 
    },
    { 
      id: 'team', 
      path: '/team', 
      icon: <Users size={20}  />, 
      label: 'Команда' 
    },
    { 
      id: 'shop', 
      path: '/shop', 
      icon: <ShoppingCart size={20}  />, 
      label: 'Магазин' 
    },
  ];

  return (
    <Tabbar style={{ backgroundColor: '#16171B' }}>
      {navItems.map((item) => (
        <Tabbar.Item
          key={item.id}
          text={item.label}
          selected={location.pathname === item.path}
          onClick={() => navigate(item.path)}
          style={{ width: '25%', color: 'white' }}
        >
          {item.icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}