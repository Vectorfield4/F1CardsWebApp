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

export type GameCardRarity = 'common' | 'rare' | 'epic' | 'legendary';

// Новый тип для объединенных данных
export type DetailedPlayerCard = {
  id: number; // Уникальный ID карты игрока (PlayerCard.id)
  cardId: number; // ID шаблона карты (Card.id)
  name: string;
  imageUrl: string;
  description?: string;
  cardTypeId: number;
  rarity: GameCardRarity;
  tags?: Tag[];
  playerId: string;
  level: number;
  quantity: number;
  obtainedAt: string;
};

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
  chances: { [key: number]: number };
  rewardCount: number;
  oneTimeDropCardId?: number;
  garanteeDropOn: number;
  garanteeDropCardId?: number;
}

export interface Showcase {
    id: number;
    cardSetId: number;
    position: number;
    showUntil?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface ShowcaseViewDto {
  cardSetId: number;
  count: number;
  name: string;
  imageUrl?: string;
  goldPrice: number;
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
  private baseUrl: string = import.meta.env.BACKEND_API || 'http://localhost:8080';
  private collection: PlayerCard[] = [];
  private availableShowcase: ShowcaseViewDto | null = null;
  private listeners: Set<() => void> = new Set();

  private async _request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      ...authService.getAuthHeaders(),
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (options.body && typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { title: response.statusText };
      }
      // eslint-disable-next-line no-throw-literal
      throw { status: response.status, ...errorData };
    }

    // Handle no content
    if (response.status === 204) {
      return undefined as T;
    }
    
    return response.json();
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

  // Загрузка доступных паков (витрины)
  async loadAvailableShowcase(): Promise<ShowcaseViewDto[]> {
    const showcase = await this._request<ShowcaseViewDto[]>('/api/Showcases/available', {
      method: 'GET',
    });
    this.notifyListeners();
    return showcase;
  }

  // Открытие пака
  async openPack(cardSetId: number): Promise<PackOpeningResult> {
    return this._request<PackOpeningResult>('/api/Opening', {
      method: 'POST',
      body: JSON.stringify({ cardSetId })
    });
  }

  // Получение стоимости улучшения карты
  async getUpgradeCost(playerCardId: number): Promise<number> {
    return this._request<number>(`/api/Collection/upgrade?playerCardId=${playerCardId}`, {
        method: 'GET',
    });
  }

  // Улучшение карты
  async upgradeCard(playerCardId: number): Promise<boolean> {
    return this._request<boolean>(`/api/Collection/upgrade?playerCardId=${playerCardId}`, {
        method: 'POST',
    });
  }

  // Получение стоимости разборки карты
  async getDisassembleCost(playerCardId: number): Promise<number> {
     return this._request<number>(`/api/Collection/disassemble?playerCardId=${playerCardId}`, {
        method: 'GET',
    });
  }

  // Разборка карты
  async disassembleCard(playerCardId: number): Promise<boolean> {
     return this._request<boolean>(`/api/Collection/disassemble?playerCardId=${playerCardId}`, {
        method: 'DELETE',
    });
  }

  // Загрузка всех карт
  async loadAllCards(start?: number, end?: number): Promise<Card[]> {
    const params = new URLSearchParams();
    if (start) params.append('start', start.toString());
    if (end) params.append('end', end.toString());
    return this._request<Card[]>(`/api/Cards?${params.toString()}`);
  }

  // Загрузка редкостей
  async loadRarities(): Promise<Rarity[]> {
    return this._request<Rarity[]>('/api/Rarities');
  }

  // Загрузка наборов карт
  async loadCardSets(): Promise<CardSet[]> {
    return this._request<CardSet[]>('/api/CardSets');
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
  async getCurrencies() {
    return this._request<any>('/api/Players/current');
  }

  // Получение статистики игрока
  async getPlayerStats() {
    return this._request<any>('/api/Players/current');
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
    const uniqueCardsMap = new Map<number, PlayerCard>();
    
    this.collection.forEach(card => {
      if (!uniqueCardsMap.has(card.cardId)) {
        uniqueCardsMap.set(card.cardId, card);
      }
    });
    
    return Array.from(uniqueCardsMap.values());
  }

  // Генерация карт через AI
  async generateCards(): Promise<boolean> {
    return this._request<boolean>('/api/Cards/generate', { method: 'POST' });
  }

  // Синхронизация карт
  async syncCards(): Promise<boolean> {
    return this._request<boolean>('/api/Cards/sync', { method: 'POST' });
  }

  // Создание новой карты
  async createCard(card: Omit<Card, 'id'>): Promise<Card> {
    return this._request<Card>('/api/Cards', {
      method: 'POST',
      body: JSON.stringify(card),
    });
  }

  // Создание нового набора карт
  async createCardSet(cardSet: Omit<CardSet, 'id'>): Promise<CardSet> {
     return this._request<CardSet>('/api/CardSets', {
      method: 'POST',
      body: JSON.stringify(cardSet),
    });
  }

  // Загрузка типов карт
  async loadCardTypes(): Promise<any[]> {
    return this._request<any[]>('/api/CardTypes');
  }

  // Тестовая функция для проверки аутентификации и API
  async testAuthentication(): Promise<void> {
    try {
      const response = await this._request('/api/Auth/me', { method: 'GET' });
      console.log('Authentication test successful:', response);
    } catch (error) {
      console.error('Authentication test failed:', error);
    }
  }

  async getMyCards() {
    const cards = await this._request<PlayerCard[]>('/api/Collection/my');
    this.collection = cards;
    this.notifyListeners();
    return cards;
  }

  async getDetailedPlayerCards(): Promise<DetailedPlayerCard[]> {
    const [playerCards, allCards, rarities] = await Promise.all([
      this.getMyCards(),
      this.loadAllCards(),
      this.loadRarities()
    ]);

    const cardsMap = new Map(allCards.map(c => [c.id, c]));
    const raritiesMap = new Map(rarities.map(r => [r.id, r]));

    return playerCards.map((playerCard): DetailedPlayerCard | null => {
      const cardInfo = cardsMap.get(playerCard.cardId);
      if (!cardInfo) {
        console.warn(`Card info not found for cardId: ${playerCard.cardId}`);
        return null;
      }
      const rarityInfo = raritiesMap.get(cardInfo.rarityId);
      const imageUrl = cardInfo.imageUrl || 'https://placehold.jp/16/3d4070/ffffff/175x233.jpg?text=NO%20IMAGE';

      return {
        id: playerCard.id,
        cardId: cardInfo.id,
        name: cardInfo.name,
        imageUrl,
        description: cardInfo.description,
        cardTypeId: cardInfo.cardTypeId,
        rarity: (rarityInfo?.name.toLowerCase() as GameCardRarity) || 'common',
        tags: cardInfo.tags,
        playerId: playerCard.playerId,
        level: playerCard.level,
        quantity: playerCard.quantity,
        obtainedAt: playerCard.obtainedAt,
      };
    }).filter((card): card is DetailedPlayerCard => card !== null);
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