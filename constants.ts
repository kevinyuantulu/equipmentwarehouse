import { Equipment, EquipmentType } from "./types";

export const EQUIPMENT_DATA: Equipment[] = [
  {
    id: 'foil-01',
    type: EquipmentType.FOIL,
    name: 'Standard Competitive Foil',
    shortDescription: 'The lightweight weapon used for teaching fencing principles. Targets the torso only.',
    baseStats: {
      weight: '< 500g',
      flexibility: 'High',
      targetArea: 'Torso (Groin to Neck)'
    }
  },
  {
    id: 'epee-01',
    type: EquipmentType.EPEE,
    name: 'Grand Prix Epee',
    shortDescription: 'A heavier thrusting weapon based on the dueling sword. The entire body is a valid target.',
    baseStats: {
      weight: '< 770g',
      flexibility: 'Moderate (Stiff)',
      targetArea: 'Full Body'
    }
  },
  {
    id: 'sabre-01',
    type: EquipmentType.SABRE,
    name: 'Hungarian Sabre',
    shortDescription: 'A cutting and thrusting weapon derived from cavalry swords. Fast-paced and aggressive.',
    baseStats: {
      weight: '< 500g',
      flexibility: 'Variable',
      targetArea: 'Upper Body (Above Waist)'
    }
  },
  {
    id: 'mask-01',
    type: EquipmentType.MASK,
    name: 'FIE 1600N Master Mask',
    shortDescription: 'High-grade stainless steel mesh mask offering maximum protection for international competition.',
    baseStats: {
      weight: '1.2kg',
      flexibility: 'None (Rigid)',
      targetArea: 'Protective Gear'
    }
  }
];
