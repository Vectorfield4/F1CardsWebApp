# Тесты

Эта папка содержит тесты для проекта, настроенные с Vitest.

## Структура

```
tests/
├── setup.ts                    # Настройка тестовой среды
├── store/                      # Тесты для Zustand stores
│   ├── mainScreenStore.test.ts # Тесты mainScreenStore
│   └── other-stores.test.ts    # Тесты других stores
└── README.md
```

## Запуск тестов

### Команды npm
```bash
# Запуск тестов в watch режиме
npm test

# Запуск тестов один раз
npm run test:run

# Запуск с UI интерфейсом
npm run test:ui

# Запуск с покрытием кода
npm run test:coverage
```

### Что тестируется

#### mainScreenStore.test.ts
- ✅ Реактивность состояния loading
- ✅ Обновление состояния error
- ✅ Успешная загрузка данных
- ✅ Обработка ошибок сети

#### other-stores.test.ts
- ✅ Player Store - обновление данных игрока
- ✅ Stats Store - обновление статистики
- ✅ Showcase Store - обновление витрины

## Моки

Все внешние зависимости замоканы в `setup.ts`:
- Telegram SDK (`@telegram-apps/sdk-react`)
- Apollo Client
- Fetch API
- Console методы

## Добавление новых тестов

1. Создайте файл `.test.ts` в соответствующей папке
2. Импортируйте тестируемые модули
3. Используйте `describe`, `it`, `expect` из Vitest
4. Используйте `renderHook`, `act` из `@testing-library/react` 