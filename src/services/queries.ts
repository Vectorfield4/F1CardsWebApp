import { gql } from '@apollo/client';

export const GET_MAIN_SCREEN_DISPLAY_DATA = gql`
  query GetMainScreenDisplayData {
    getMainScreenDisplayData {
      player { id username }
      stats { type value }
      showcase { cardSet { id name } isOwned }
    }
  }
`;

export interface MainScreenPlayer {
  id: string;
  username: string;
}

export interface MainScreenStat {
  type: string;
  value: string;
}

export interface MainScreenShowcaseItem {
  cardSet: { id: string; name: string };
  isOwned: boolean;
}

export interface MainScreenDisplayData {
  player: MainScreenPlayer;
  stats: MainScreenStat[];
  showcase: MainScreenShowcaseItem[];
}

export const GET_COLLECTION_DISPLAY_DATA = gql`
  query GetCollectionDisplayData {
    getCollectionDisplayData {
      id
      cardId
      name
      previewUrls
      level
      quantity
      rarityId
      cardTypeId
    }
  }
`;

export interface CollectionCard {
  id: string;
  cardId: string;
  name: string;
  previewUrls: string[];
  level: number;
  quantity: number;
  rarityId: string;
  cardTypeId: string;
}

export const GET_CARD_DISPLAY_DATA = gql`
  query GetCardDisplayData($playerCardId: Int!) {
    getCardDisplayData(playerCardId: $playerCardId) {
      id
      cardId
      name
      level
      quantity
      previewUrls
      rarityId
      cardTypeId
      description
      stats { key value }
      facts
    }
  }
`;

export interface CardStat {
  key: string;
  value: string;
}

export interface CardDisplayData {
  id: string;
  cardId: string;
  name: string;
  level: number;
  quantity: number;
  previewUrls: string[];
  rarityId: string;
  cardTypeId: string;
  description?: string;
  stats: CardStat[];
  facts: string[];
}

export const GET_UPGRADE_COST = gql`
  query GetUpgradeDisplayData($playerCardId: Int!) {
    getUpgradeDisplayData(playerCardId: $playerCardId)
  }
`;

export const GET_DISASSEMBLE_COST = gql`
  query GetDisassembleDisplayData($playerCardId: Int!) {
    getDisassembleDisplayData(playerCardId: $playerCardId)
  }
`;

export const UPGRADE_CARD = gql`
  mutation Upgrade($playerCardId: Int!) {
    upgrade(playerCardId: $playerCardId)
  }
`;

export const DISASSEMBLE_CARD = gql`
  mutation Disassemble($playerCardId: Int!) {
    disassemble(playerCardId: $playerCardId)
  }
`;

export const GET_PACK_DISPLAY_DATA = gql`
  query GetPackDisplayData($packId: Int!) {
    getPackDisplayData(packId: $packId) {
      id
      name
      goldPrice
      rewardCount
      description
      imageUrl
    }
  }
`;

export interface PackDisplayData {
  id: string;
  name: string;
  goldPrice: number;
  rewardCount: number;
  description?: string;
  imageUrl?: string;
}

export const PURCHASE_PACK = gql`
  mutation PurchasePack($packId: Int!) {
    purchasePack(packId: $packId) {
      success
      errorMessage
    }
  }
`;

export const GET_PACK_PURCHASE_RESULT = gql`
  query GetPackPurchaseResultDisplayData($packId: Int!) {
    getPackPurchaseResultDisplayData(packId: $packId) {
      packId
      success
      errorMessage
    }
  }
`;

export interface PackPurchaseResult {
  packId: string;
  success: boolean;
  errorMessage?: string;
} 