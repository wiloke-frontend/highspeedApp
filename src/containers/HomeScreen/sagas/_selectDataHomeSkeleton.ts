import { select } from 'redux-saga/effects';

export default function selectDataHomeSkeleton() {
  return select((state: AppState) =>
    // lọc xoá section nào là quảng cáo
    state.homeSkeleton.data.filter(section => !section.moduleType.includes('appAds')),
  );
}
