export enum EquipmentType {
  FOIL = 'FOIL',
  EPEE = 'EPEE',
  SABRE = 'SABRE',
  MASK = 'MASK'
}

export interface Equipment {
  id: string;
  type: EquipmentType;
  name: string;
  shortDescription: string;
  baseStats: {
    weight: string;
    flexibility: string;
    targetArea: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
