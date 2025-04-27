import { Tabbar } from "@telegram-apps/telegram-ui";
import { useNavigate, useLocation } from "react-router-dom";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 'home', path: '/', icon: '🃏', label: 'Наборы' },
    { id: 'collection', path: '/collection', icon: '🤝', label: 'Коллекция' },
    { id: 'team', path: '/team', icon: '👥', label: 'Моя команда' },
    { id: 'shop', path: '/shop', icon: '🛒', label: 'Магазин' },
  ];

  return (
    <Tabbar>
      {navItems.map((item) => (
        <Tabbar.Item
          key={item.id}
          text={item.label}
          selected={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}