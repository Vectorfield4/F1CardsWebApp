import { authService } from './authService';

// Типы на основе API схемы
export interface Card {
  id: number;
  name: string;
  imageUrl?: string;
  description?: string;
  cardTypeId: number;
  rarityId: number;
  tags?: Tag[];
}

export interface PlayerCard {
  id: number;
  playerId: string;
  cardId: number;
  level: number;
  quantity: number;
  obtainedAt: string;
  tags?: Tag[];
}

export interface CardSet {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  goldPrice: number;
  rewardCount: number;
}

export interface ShowcaseViewDto {
  cardSetId: number;
  count: number;
}

export interface PackOpeningResult {
  cards: Card[];
  totalOpens: number;
}

export interface Tag {
  id: number;
  tagName: string;
  lastUpdate: string;
}

export interface Rarity {
  id: number;
  name: string;
  color?: string;
  dropChance: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class GameStateService {
  private baseUrl: string = import.meta.env.BACKEND_API || 'http://localhost:3001';
  private collection: PlayerCard[] = [];
  private availableShowcase: ShowcaseViewDto | null = null;
  private listeners: Set<() => void> = new Set();

  // Вспомогательная функция для логирования HTTP запросов
  private async makeRequest(
    endpoint: string, 
    options: RequestInit,
    description: string
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = authService.getAuthHeaders();
    
    console.log(`🌐 ${description}:`);
    console.log(`- URL: ${url}`);
    console.log(`- Method: ${options.method || 'GET'}`);
    console.log(`- Headers:`, headers);
    if (options.body) {
      console.log(`- Body:`, options.body);
    }

    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers }
    });

    console.log(`📡 Ответ от ${description}:`);
    console.log(`- Status: ${response.status} ${response.statusText}`);
    console.log(`- OK: ${response.ok}`);

    return response;
  }

  // Подписка на изменения
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Уведомление подписчиков об изменениях
  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  // Загрузка коллекции игрока
  async loadCollection(): Promise<ApiResponse<PlayerCard[]>> {
    try {
      const response = await this.makeRequest(
        '/api/Collection',
        { method: 'GET' },
        'Загрузка коллекции игрока'
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка загрузки коллекции:', errorText);
        return {
          success: false,
          error: `Ошибка загрузки коллекции (${response.status})`
        };
      }

      const collection: PlayerCard[] = await response.json();
      this.collection = collection;
      this.notifyListeners();

      console.log(`✅ Коллекция загружена: ${collection.length} карт`);
      return { success: true, data: collection };
    } catch (error) {
      console.error('❌ Load collection error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Загрузка доступных паков (витрины)
  async loadAvailableShowcase(): Promise<ApiResponse<ShowcaseViewDto>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Showcases/available`, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка загрузки витрины'
        };
      }

      const showcase: ShowcaseViewDto = await response.json();
      this.availableShowcase = showcase;
      this.notifyListeners();

      return { success: true, data: showcase };
    } catch (error) {
      console.error('Load showcase error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Открытие пака
  async openPack(cardSetId: number): Promise<ApiResponse<PackOpeningResult>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Opening`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({ cardSetId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.title || 'Ошибка открытия пака'
        };
      }

      const result: PackOpeningResult = await response.json();
      
      // Обновляем коллекцию после открытия пака
      await this.loadCollection();
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Open pack error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Получение стоимости улучшения карты
  async getUpgradeCost(playerCardId: number): Promise<ApiResponse<number>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Collection/upgrade?playerCardId=${playerCardId}`, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка получения стоимости улучшения'
        };
      }

      const cost: number = await response.json();
      return { success: true, data: cost };
    } catch (error) {
      console.error('Get upgrade cost error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Улучшение карты
  async upgradeCard(playerCardId: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Collection/upgrade?playerCardId=${playerCardId}`, {
        method: 'POST',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка улучшения карты'
        };
      }

      const result: boolean = await response.json();
      
      if (result) {
        // Обновляем коллекцию после улучшения
        await this.loadCollection();
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Upgrade card error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Получение стоимости разборки карты
  async getDisassembleCost(playerCardId: number): Promise<ApiResponse<number>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Collection/disassemble?playerCardId=${playerCardId}`, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка получения стоимости разборки'
        };
      }

      const cost: number = await response.json();
      return { success: true, data: cost };
    } catch (error) {
      console.error('Get disassemble cost error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Разборка карты
  async disassembleCard(playerCardId: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Collection/disassemble?playerCardId=${playerCardId}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка разборки карты'
        };
      }

      const result: boolean = await response.json();
      
      if (result) {
        // Обновляем коллекцию после разборки
        await this.loadCollection();
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Disassemble card error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Загрузка всех карт
  async loadAllCards(start?: number, end?: number): Promise<ApiResponse<Card[]>> {
    try {
      let url = `${this.baseUrl}/api/Cards`;
      const params = new URLSearchParams();
      
      if (start !== undefined) params.append('_start', start.toString());
      if (end !== undefined) params.append('_end', end.toString());
      
      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка загрузки карт'
        };
      }

      const cards: Card[] = await response.json();
      return { success: true, data: cards };
    } catch (error) {
      console.error('Load cards error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Загрузка редкостей
  async loadRarities(): Promise<ApiResponse<Rarity[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Rarities`, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка загрузки редкостей'
        };
      }

      const rarities: Rarity[] = await response.json();
      return { success: true, data: rarities };
    } catch (error) {
      console.error('Load rarities error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Загрузка наборов карт
  async loadCardSets(): Promise<ApiResponse<CardSet[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/CardSets`, {
        method: 'GET',
        headers: authService.getAuthHeaders()
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка загрузки наборов карт'
        };
      }

      const cardSets: CardSet[] = await response.json();
      return { success: true, data: cardSets };
    } catch (error) {
      console.error('Load card sets error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Получение текущей коллекции
  getCollection(): PlayerCard[] {
    return this.collection;
  }

  // Получение доступной витрины
  getAvailableShowcase(): ShowcaseViewDto | null {
    return this.availableShowcase;
  }

  // Получение игровых валют из профиля игрока
  getCurrencies() {
    const playerDetails = authService.getPlayerDetails();
    return {
      gold: playerDetails?.gold || 0,
      dust: playerDetails?.dust || 0
    };
  }

  // Получение статистики игрока
  getPlayerStats() {
    const playerDetails = authService.getPlayerDetails();
    if (!playerDetails) return null;

    return {
      daysInGame: playerDetails.daysInGame,
      cardsCount: playerDetails.cardsCount,
      cardSetsCount: playerDetails.cardSetsCount,
      rating: playerDetails.rating,
      registrationDate: playerDetails.registrationDate,
      lastLoginDate: playerDetails.lastLoginDate
    };
  }

  // Поиск карты в коллекции по ID
  findPlayerCard(playerCardId: number): PlayerCard | undefined {
    return this.collection.find(card => card.id === playerCardId);
  }

  // Фильтрация карт по уровню
  getCardsByLevel(level: number): PlayerCard[] {
    return this.collection.filter(card => card.level === level);
  }

  // Получение уникальных карт (по cardId)
  getUniqueCards(): PlayerCard[] {
    const uniqueCards = new Map<number, PlayerCard>();
    
    this.collection.forEach(card => {
      if (!uniqueCards.has(card.cardId)) {
        uniqueCards.set(card.cardId, card);
      }
    });
    
    return Array.from(uniqueCards.values());
  }

  // Генерация карт через AI
  async generateCards(): Promise<ApiResponse<boolean>> {
    try {
      const response = await this.makeRequest(
        '/api/Images/generate-cards',
        { method: 'POST' },
        'Генерация карт через AI'
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка генерации карт:', errorText);
        return {
          success: false,
          error: `Ошибка генерации карт (${response.status}): ${errorText}`
        };
      }

      console.log('✅ Генерация карт запущена успешно');
      return { success: true, data: true };
    } catch (error) {
      console.error('❌ Generate cards error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Синхронизация карт
  async syncCards(): Promise<ApiResponse<boolean>> {
    try {
      const response = await this.makeRequest(
        '/api/Images/sync-cards',
        { method: 'POST' },
        'Синхронизация карт'
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка синхронизации карт:', errorText);
        return {
          success: false,
          error: `Ошибка синхронизации карт (${response.status}): ${errorText}`
        };
      }

      console.log('✅ Синхронизация карт завершена успешно');
      return { success: true, data: true };
    } catch (error) {
      console.error('❌ Sync cards error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Создание новой карты
  async createCard(card: Omit<Card, 'id'>): Promise<ApiResponse<Card>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Cards`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(card)
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка создания карты'
        };
      }

      const newCard: Card = await response.json();
      return { success: true, data: newCard };
    } catch (error) {
      console.error('Create card error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Создание нового набора карт
  async createCardSet(cardSet: Omit<CardSet, 'id'>): Promise<ApiResponse<CardSet>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/CardSets`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(cardSet)
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Ошибка создания набора карт'
        };
      }

      const newCardSet: CardSet = await response.json();
      return { success: true, data: newCardSet };
    } catch (error) {
      console.error('Create card set error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Загрузка типов карт
  async loadCardTypes(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.makeRequest(
        '/api/CardTypes',
        { method: 'GET' },
        'Загрузка типов карт'
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Ошибка загрузки типов карт:', errorText);
        return {
          success: false,
          error: `Ошибка загрузки типов карт (${response.status})`
        };
      }

      const cardTypes: any[] = await response.json();
      console.log(`✅ Загружено типов карт: ${cardTypes.length}`);
      return { success: true, data: cardTypes };
    } catch (error) {
      console.error('❌ Load card types error:', error);
      return {
        success: false,
        error: 'Ошибка подключения к серверу'
      };
    }
  }

  // Тестовая функция для проверки аутентификации и API
  async testAuthentication(): Promise<void> {
    console.log('🧪 === ТЕСТ АУТЕНТИФИКАЦИИ И API ===');
    
    // Проверяем статус аутентификации
    const isAuth = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();
    const initData = authService.getInitData();
    
    console.log('👤 Статус аутентификации:');
    console.log('- Авторизован:', isAuth);
    console.log('- Пользователь:', currentUser?.firstName || 'Не найден');
    console.log('- InitData длина:', initData?.length || 0);
    
    if (!isAuth) {
      console.error('❌ Пользователь не авторизован! Выполните логин сначала.');
      return;
    }

    // Тестируем основные API эндпоинты
    const tests = [
      { name: 'Коллекция', fn: () => this.loadCollection() },
      { name: 'Витрина', fn: () => this.loadAvailableShowcase() },
      { name: 'Наборы карт', fn: () => this.loadCardSets() },
      { name: 'Редкости', fn: () => this.loadRarities() },
      { name: 'Типы карт', fn: () => this.loadCardTypes() }
    ];

    for (const test of tests) {
      try {
        console.log(`\n🔄 Тестируем: ${test.name}`);
        const result = await test.fn();
        if (result.success) {
          console.log(`✅ ${test.name}: успех`);
        } else {
          console.error(`❌ ${test.name}: ${result.error}`);
        }
      } catch (error) {
        console.error(`💥 ${test.name}: критическая ошибка`, error);
      }
    }

    console.log('\n🏁 Тестирование завершено');
  }
}

export const gameStateService = new GameStateService();

// Добавляем в глобальную область для отладки
if (typeof window !== 'undefined') {
  (window as any).gameStateService = gameStateService;
  (window as any).authService = authService;
  
  console.log('🔧 Сервисы доступны в консоли:');
  console.log('- window.gameStateService.testAuthentication() - тест API');
  console.log('- window.authService.getCurrentUser() - текущий пользователь');
  console.log('- window.gameStateService.generateCards() - генерация карт');
} 