import React, { memo, FC } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { View, FlatList, Container, tachyons } from 'shared';
import i18n from 'utils/functions/i18n';
import SelectCard from 'components/SelectCard/SelectCard';
import HeaderTertiary, { HeaderTertiaryProps } from 'components/HeaderTertiary/HeaderTertiary';
import { isEmpty } from 'ramda';
import BarHeightSpacer from 'components/BarHeightSpacer/BarHeightSpacer';
import { NavigationSuspense } from 'navigation';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { useGetCategoriesRequest } from 'store/storeCategories/actions/actionCategories';
import { categoriesSelector } from 'store/selectors';
import { Category } from 'api/Categories';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

export interface ModalSelectCatProps {
  isVisible: boolean;
  onCancel: HeaderTertiaryProps['onCancel'];
  onDone: HeaderTertiaryProps['onDone'];
  onSelect: (item: Category) => void;
  isSelected: (item: Category) => boolean;
}

const ModalSelectCat: FC<ModalSelectCatProps> = ({ onCancel, onDone, onSelect, isSelected, isVisible }) => {
  const getCategoriesRequest = useGetCategoriesRequest();
  const categories = useSelector(categoriesSelector);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onCancel}>
      <ScreenContainer
        onMount={() => {
          getCategoriesRequest({ endpoint: 'category', params: { number: 0 } });
        }}
        Header={
          <Container>
            <HeaderTertiary onCancel={onCancel} onDone={onDone} centerText={i18n.t('chooseText', { text: i18n.t('categories') })} />
          </Container>
        }
        safeAreaView
      >
        <NavigationSuspense fallback={<ActivityIndicator size="small" style={tachyons.pv4} />}>
          <AsyncComponent
            useOldData
            status={categories.status}
            isDataEmpty={isEmpty(categories.data.data)}
            Success={
              <FlatList
                useContainer
                numColumns={2}
                data={categories.data.data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => {
                  return (
                    <View tachyons="pb3">
                      <SelectCard
                        imageUri={item.featuredImage.medium}
                        imagePreview={item.featuredImage.preview}
                        text={item.name}
                        onPress={() => {
                          onSelect(item);
                        }}
                        isActive={isSelected(item)}
                      />
                    </View>
                  );
                }}
                ListFooterComponent={<BarHeightSpacer />}
                contentContainerStyle={[tachyons.pv2, tachyons.ph1]}
              />
            }
          />
        </NavigationSuspense>
      </ScreenContainer>
    </Modal>
  );
};

export default memo(ModalSelectCat);
