import { Item } from '../models/item';
import { ItemAttribute } from '../models/item-attribute';
import { ItemSocket } from '../models/item-socket';

export interface ItemPanel {
  item: Item;
  attributes: ItemAttribute[];
  cards: ItemSocket[];
  levelStrength: number;
  timeItem: number,
  amountStack: number
}
