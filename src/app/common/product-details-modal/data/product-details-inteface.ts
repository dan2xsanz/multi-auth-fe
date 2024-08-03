// FAVORITES REACTIONS
export interface FavoritesInterface {
  isFavorite: boolean
  productMasterId: number | undefined
  accountMasterId: number | undefined
}

export const FavoritesDefaultValue: FavoritesInterface = {
  isFavorite: false,
  productMasterId: undefined,
  accountMasterId: undefined,
}

export interface FavoritesStateInterface {
  totalFavorites: number | undefined
  isFavorite: boolean
}

export const FavoritesStateDefaultValue: FavoritesStateInterface = {
  totalFavorites: 0,
  isFavorite: false,
}

// HEART REACTIONS
export interface HeartReactInterface {
  isHearted: boolean
  productMasterId: number | undefined
  accountMasterId: number | undefined
}

export const HeartReactDefaultValue: HeartReactInterface = {
  isHearted: false,
  productMasterId: undefined,
  accountMasterId: undefined,
}

export interface HeartReactStateInterface {
  totalHeartReact: number | undefined
  isHearted: boolean
}

export const HeartReactStateDefaultValue: HeartReactStateInterface = {
  totalHeartReact: 0,
  isHearted: false,
}
