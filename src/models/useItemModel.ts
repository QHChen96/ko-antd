import { ItemEditType } from '@/services/item';
import { useState } from 'react';

export interface ItemModelType {
  item: Partial<ItemEditType>;
  isEdit: boolean;
  setItem: (item: Partial<ItemEditType>) => void;
  destroy: () => void;
  fetchItem: (itemId: number) => void;
}

export default function useItemModel(): ItemModelType {
  const [item, setItem] = useState<Partial<ItemEditType>>({});

  const fetchItem = (itemId: number) => {
    setItem({ itemId });
  };

  return {
    item,
    setItem,
    fetchItem,
    isEdit: !!(item && item.itemId),
    destroy: () => setItem({}),
  };
}
