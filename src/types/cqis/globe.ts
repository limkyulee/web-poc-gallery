import type { TagProps } from 'element-plus'

export interface IMarker{
  lat: number
  lng: number
  size: number
  color: string
  corpName: string
  corpTp: string
  image: string
  dispYn: string
}

export interface ITags {
  name: string
  type: TagProps['type']
}

export interface IGeoJsonFeature {
  type: 'Feature'
  properties: {
    message: string
    iconSize: number[]
  }
  geometry: {
    type: 'Point'
    coordinates: number[]
  }
}

export interface ISearchParam {
  keyword: string
}

export interface IFavor {
  corpName: string
  corpTp: string
  corpTpNm: string
  country: string
  countryNm: string
  lat: string
  lng: string
  dispYn: string
}