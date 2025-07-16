import { initDataState, initDataRaw } from '@telegram-apps/sdk-react';

export interface TelegramUserInfo {
  userId: string;
  username: string;
  firstName: string;
  photoUrl: string;
  isPlayer: boolean;
}

export interface PlayerDetailsDto {
  id: string;
  displayName: string;
  email?: string;
  userName: string;
  registrationDate: string;
  rating: number;
  gold: number;
  dust: number;
  daysInGame: number;
  lastLoginDate: string;
  cardsCount: number;
  cardSetsCount: number;
  isBanned: boolean;
}

class AuthService {
  private baseUrl: string;
  private currentUser: TelegramUserInfo | null = null;
  private playerDetails: PlayerDetailsDto | null = null;
  private initData: string | null = null;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BACKEND_API || 'https://vectorfield4-f1cardsbot-d047.twc1.net';
    console.log('AuthService инициализирован с URL:', this.baseUrl);
    if (!import.meta.env.VITE_BACKEND_API) {
      console.log('Для изменения URL создайте .env файл с VITE_BACKEND_API=ваш_url');
    }
  }

  // Получение Telegram данных пользователя
  getTelegramUserData() {
    let initDataObj = initDataState();
    let rawData = initDataRaw();

    console.log('📱 Получаем данные Telegram:');
    console.log('- initDataObj из SDK:', !!initDataObj);
    console.log('- rawData из SDK:', !!rawData);

    const useEnvRawData = !rawData && import.meta.env.VITE_TELEGRAM_INIT_DATA_RAW;

    // Если нет rawData из SDK, пробуем из .env
    if (useEnvRawData) {
      console.log('⚠️ rawData из SDK не найден. Используем VITE_TELEGRAM_INIT_DATA_RAW.');
      rawData = import.meta.env.VITE_TELEGRAM_INIT_DATA_RAW;
    }

    // Если нет initDataObj, но есть rawData, парсим его.
    // Также принудительно парсим, если rawData взят из .env для консистентности.
    if ((!initDataObj || useEnvRawData) && rawData) {
      try {
        console.log('ℹ️ Парсим rawData...');
        const params = new URLSearchParams(rawData);
        const userStr = params.get('user');
        if (userStr) {
          // создаем объект, похожий на то что возвращает initDataState()
          initDataObj = {
            user: JSON.parse(decodeURIComponent(userStr)),
          } as any; // any, т.к. мы не знаем полной структуры
          console.log('✅ Пользователь из rawData:', initDataObj?.user);
        }
      } catch (error) {
        console.error('❌ Ошибка парсинга rawData:', error);
      }
    }
    
    if (!initDataObj?.user) {
      console.error('❌ Telegram user data недоступна');
      throw new Error('Telegram user data not available');
    }

    if (!rawData) {
      console.error('❌ Telegram rawInitData недоступна');
      throw new Error('Telegram rawInitData not available');
    }

    console.log('✅ Telegram данные получены успешно');
    console.log('- Пользователь:', initDataObj.user.first_name, initDataObj.user.username);
    console.log('- rawInitData preview:', rawData.substring(0, 100) + '...');

    return {
      telegramId: initDataObj.user.id,
      username: initDataObj.user.username,
      firstName: initDataObj.user.first_name,
      lastName: initDataObj.user.last_name,
      photoUrl: initDataObj.user.photo_url,
      rawInitData: rawData,
    };
  }


  // Выход из игры
  logout() {
    this.currentUser = null;
    this.playerDetails = null;
    this.initData = null;
    localStorage.removeItem('gameInitData');
    localStorage.removeItem('gameUser');
    localStorage.removeItem('playerDetails');
  }

  // Удаление аккаунта
  async forgetMe(): Promise<{ success: boolean; error?: string }> {
    if (!this.initData) {
      return { success: false, error: 'Пользователь не авторизован' };
    }

    try {
      console.log('🗑️ Удаляем аккаунт пользователя...');
      const response = await fetch(`${this.baseUrl}/api/Players/forget`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        return { success: false, error: 'Ошибка при удалении аккаунта' };
      }

      this.logout();
      return { success: true };
    } catch (error) {
      console.error('Forget me error:', error);
      return { success: false, error: 'Ошибка подключения к серверу' };
    }
  }

  // Получение текущего пользователя
  getCurrentUser(): TelegramUserInfo | null {
    return this.currentUser;
  }

  // Получение данных игрока
  getPlayerDetails(): PlayerDetailsDto | null {
    return this.playerDetails;
  }

  // Получение init data для авторизации
  getInitData(): string | null {
    return this.initData;
  }

  // Проверка авторизации
  isAuthenticated(): boolean {
    return !!this.initData && !!this.currentUser;
  }

  // Проверка, является ли пользователь игроком
  isPlayer(): boolean {
    return this.currentUser?.isPlayer ?? false;
  }

  // Получение заголовков для API запросов
  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.initData) {
      headers['Authorization'] = `tma ${this.initData}`;
      console.log('🔐 Добавляем заголовок авторизации, длина initData:', this.initData.length);
    } else {
      console.warn('⚠️ InitData не найден, запрос без авторизации');
      
      // Попытка получить initData заново
      try {
        const telegramData = this.getTelegramUserData();
        if (telegramData.rawInitData) {
          this.initData = telegramData.rawInitData;
          headers['Authorization'] = `tma ${this.initData}`;
          console.log('✅ InitData восстановлен из Telegram SDK');
        }
      } catch (error) {
        console.error('❌ Не удалось восстановить initData:', error);
      }
    }

    return headers;
  }
}

export const authService = new AuthService(); 