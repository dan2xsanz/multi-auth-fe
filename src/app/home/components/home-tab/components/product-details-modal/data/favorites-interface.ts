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
