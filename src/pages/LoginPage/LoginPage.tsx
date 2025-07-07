import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Placeholder, Spinner, Text, Title } from '@telegram-apps/telegram-ui';
import { useSignal } from '@telegram-apps/sdk-react';
import { initDataState } from '@telegram-apps/sdk-react';

import { authService } from '@/services/authService';
import { gameStateService } from '@/services/gameStateService';
import { Page } from '@/components/Page';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [requestInfo, setRequestInfo] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const initData = useSignal(initDataState);

  // Определяем режим разработки
  const isDev = import.meta.env.DEV;

  // Проверяем существующую сессию при загрузке
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    setIsCheckingSession(true);
    try {
      const result = await authService.restoreSession();
      if (result.success && result.user) {
        // Загружаем игровые данные и переходим в игру
        await loadGameData();
        navigate('/');
        return;
      }

      // Если сессия не восстановилась, но есть Telegram данные - пытаемся логин
      if (initData?.user) {
        console.log('Сессия не найдена, пытаемся выполнить автоматический логин...');
        await performLogin();
      } else {
        // Если нет Telegram данных, показываем информацию о том, что нужно
        setRequestInfo(`❌ Telegram данные недоступны
📱 Убедитесь, что приложение запущено из Telegram
🔗 URL должен начинаться с: https://t.me/your_bot/app`);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsCheckingSession(false);
    }
  };

  const performLogin = async () => {
    try {
      // Получаем информацию о запросе
      const baseUrl = 'https://vectorfield4-f1cardsbot-d047.twc1.net';
      const telegramData = authService.getTelegramUserData();
      const requestDetails = `🌐 Запрос отправлен на: ${baseUrl}/api/Players/login\n📋 Метод: GET\n🔐 Заголовки:\n  Authorization: tma ${telegramData.rawInitData.substring(0, 50)}...\n  Content-Type: application/json\n📱 Telegram данные: ${telegramData.firstName} (@${telegramData.username})`;
      setRequestInfo(requestDetails);
      console.log('📤 Отправляем запрос на логин:', requestDetails);
      // Попытка логина через Telegram
      const loginResult = await authService.loginToGame();
      if (!loginResult.success) {
        setError(loginResult.error || 'Ошибка входа в игру');
        setSuccess(false);
        return;
      }
      if (!loginResult.user) {
        setError('Не удалось получить данные пользователя');
        setSuccess(false);
        return;
      }
      if (!loginResult.user.isPlayer) {
        setError('Аккаунт игрока не найден. Обратитесь к администратору для регистрации.');
        setSuccess(false);
        return;
      }
      // Загружаем игровые данные
      await loadGameData();
      setSuccess(true);
      setError(null);
      navigate('/'); // Переход на IndexPage после успешного логина
    } catch (error) {
      console.error('Login error:', error);
      setError('Произошла неожиданная ошибка при входе');
      setSuccess(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    await performLogin();

    setIsLoading(false);
  };

  const loadGameData = async () => {
    try {
      // Загружаем коллекцию и витрину параллельно
      await Promise.all([
        gameStateService.loadCollection(),
        gameStateService.loadAvailableShowcase()
      ]);
    } catch (error) {
      console.error('Failed to load game data:', error);
      // Не блокируем вход, если игровые данные не загружаются
    }
  };

  const handleTryAgain = async () => {
    setIsLoading(true);
    setError(null);
    setRequestInfo(null);
    await performLogin();
    setIsLoading(false);
  };

  const handleForgetMe = async () => {
    if (!confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.')) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.forgetMe();
      if (result.success) {
        alert('Ваш аккаунт был успешно удален.');
        // Обновляем страницу для сброса состояния
        window.location.reload();
      } else {
        setError(result.error || 'Ошибка при удалении аккаунта');
      }
    } catch (error) {
      console.error('Forget me error:', error);
      setError('Произошла ошибка при удалении аккаунта');
    } finally {
      setIsLoading(false);
    }
  };

  // Показываем spinner во время проверки сессии
  if (isCheckingSession) {
    return (
      <Page>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <Spinner size="l" />
          <Text>Проверяем сессию...</Text>
        </div>
      </Page>
    );
  }

  // Основной экран логина
  return (
    <Page back={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px',
        minHeight: '60vh',
        justifyContent: 'center'
      }}>
        {/* Заголовок */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <Title level="1" style={{ marginBottom: '8px' }}>
            🔐 Вход в игру
          </Title>
          <Text style={{ color: '#999' }}>
            Авторизация через Telegram
          </Text>
        </div>

        {/* Информация о пользователе Telegram */}
        {/* Убираем визуальный инпут username */}
        {/* Сообщение об ошибке или успехе */}
        {success ? (
          <div style={{
            background: '#44C767',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Успешный вход
            </Text>
          </div>
        ) : isDev && error && (
          <div style={{
            background: '#FF4444',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {error}
            </Text>
          </div>
        )}

        {/* Информация о запросе (только в dev) */}
        {isDev && requestInfo && (
          <div style={{
            background: '#2B2D35',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            width: '100%',
            maxWidth: '400px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-line',
            lineHeight: '1.4'
          }}>
            <Text style={{ color: '#00D6FF', marginBottom: '8px' }} weight="2">
              📡 Детали запроса:
            </Text>
            <Text style={{ color: '#CCC' }}>
              {requestInfo}
            </Text>
          </div>
        )}

        {/* Кнопки действий (только в dev) */}
        {isDev && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <Button
              size="l"
              stretched
              style={{ background: '#44C767', color: 'white', border: 'none' }}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="l" /> : 'Войти'}
            </Button>

            {/* Кнопка удаления аккаунта (только если пользователь авторизован) */}
            {authService.isAuthenticated() && (
              <Button
                mode="outline"
                size="s"
                stretched
                onClick={handleForgetMe}
                disabled={isLoading}
                style={{ marginTop: '16px' }}
              >
                Удалить аккаунт
              </Button>
            )}
          </div>
        )}

        {/* Информация для разработчиков */}
        {!initData?.user && (
          <Placeholder
            style={{ marginTop: '32px' }}
            header="Недоступно"
            description="Для входа в игру необходимо запустить приложение из Telegram"
          >
            <div style={{
              width: '144px',
              height: '144px',
              background: '#333',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              🔒
            </div>
          </Placeholder>
        )}

        {/* Информация о игре */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          <Text style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
            Собирайте карты гонщиков, команд и трасс Формулы-1. 
            Улучшайте коллекцию и соревнуйтесь с другими игроками!
          </Text>
        </div>
      </div>
    </Page>
  );
}; 