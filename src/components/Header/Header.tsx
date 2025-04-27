import { Button, Title } from '@telegram-apps/telegram-ui';

export const Header = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px'
  }}>
    {/* Левая часть */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button 
        mode="outline" 
        before={"👤"}
        style={{ minWidth: 40 }}
      >
        1
      </Button>
      <Title level="3" style={{ margin: 0 }}>Username</Title>
    </div>

    {/* Правая часть */}
    <div style={{ display: 'flex', gap: 8 }}>
      <Button 
        mode="outline"
        after={"🪙" }
      >
        150
      </Button>
      <Button 
        mode="outline"
        after={"🪙"}
      >
        1000
      </Button>
    </div>
  </div>
);