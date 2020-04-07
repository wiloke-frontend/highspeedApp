import React, { ReactElement } from 'react';
import { FlatList, FlatListProps, ListRenderItem, ListRenderItemInfo } from 'react-native';
import { useSelectList, OnResultSelectList } from 'shared/hooks/useSelectList';

export interface SelectListRenderItemInfo<ItemT> extends ListRenderItemInfo<ItemT> {
  onSelect: (item: ItemT) => void;
  selected: boolean;
}

export type SelectListRenderItem<ItemT> = (info: SelectListRenderItemInfo<ItemT>) => ReactElement | null;

export interface SelectListProps<ItemT = any, MultipleT = boolean> extends Omit<FlatListProps<ItemT>, 'renderItem'> {
  onResult?: OnResultSelectList<ItemT>;
  renderItem: SelectListRenderItem<ItemT>;
  multiple?: MultipleT;
  defaultResult?: MultipleT extends true ? ItemT[] : [ItemT];
}

type SelectListDefaultProps = Pick<SelectListProps, 'multiple' | 'defaultResult'>;

export function SelectList<ItemT, MultipleT extends boolean>({
  renderItem,
  onResult,
  multiple,
  defaultResult,
  ...flatListProps
}: SelectListProps<ItemT, MultipleT>) {
  const { isSelected, onSelect } = useSelectList({
    inputResult: defaultResult,
    multiple,
    onResultCallback: onResult,
  });

  const _renderItem: ListRenderItem<ItemT> = ({ item, index, separators }) => {
    const selected = isSelected(item);
    return renderItem({ item, index, separators, selected, onSelect });
  };

  return <FlatList {...flatListProps} renderItem={_renderItem} />;
}

SelectList.defaultProps = {
  multiple: true,
  defaultResult: [],
} as SelectListDefaultProps;
