import type { EveryQRCodeSceneConfig } from '@every-qrcode/react'

export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter' | 'night'

export type Preset = {
  key: SeasonKey
  i18nKey: string
  scene: EveryQRCodeSceneConfig
}

export const PRESETS: Preset[] = [
  {
    key: 'spring',
    i18nKey: 'season_spring',
    scene: {
      palette: [
        [0.12, 0.08, 0.16],
        [0.25, 0.68, 0.35],
        [0.96, 0.2, 0.52],
        [1.0, 0.48, 0.72],
        [0.42, 0.24, 0.16]
      ]
    }
  },
  {
    key: 'summer',
    i18nKey: 'season_summer',
    scene: {
      palette: [
        [0.1, 0.12, 0.08],
        [0.2, 0.5, 0.15],
        [0.3, 0.75, 0.25],
        [0.95, 0.82, 0.15],
        [0.28, 0.18, 0.08]
      ]
    }
  },
  {
    key: 'autumn',
    i18nKey: 'season_autumn',
    scene: {
      palette: [
        [0.08, 0.06, 0.04],
        [0.55, 0.25, 0.05],
        [0.85, 0.45, 0.1],
        [0.95, 0.65, 0.1],
        [0.25, 0.12, 0.04]
      ]
    }
  },
  {
    key: 'winter',
    i18nKey: 'season_winter',
    scene: {
      effect: 'snow',
      palette: [
        [0.08, 0.1, 0.15],
        [0.55, 0.7, 0.9],
        [0.85, 0.92, 0.98],
        [0.4, 0.55, 0.75],
        [0.2, 0.25, 0.35]
      ]
    }
  },
  {
    key: 'night',
    i18nKey: 'season_night',
    scene: {
      palette: [
        [0.04, 0.04, 0.08],
        [0.08, 0.25, 0.15],
        [0.1, 0.55, 0.45],
        [0.25, 0.95, 0.72],
        [0.02, 0.1, 0.07]
      ]
    }
  }
]

export const ACCENT_COLORS: { label: string; rgb: [number, number, number] }[] = [
  { label: 'Pink', rgb: [0.98, 0.45, 0.68] },
  { label: 'Purple', rgb: [0.6, 0.35, 0.9] },
  { label: 'Red', rgb: [0.9, 0.22, 0.22] },
  { label: 'Amber', rgb: [0.95, 0.65, 0.1] },
  { label: 'Blue', rgb: [0.25, 0.55, 0.95] },
  { label: 'Cyan', rgb: [0.25, 0.9, 0.75] }
]

export const DEFAULT_URL = 'https://shortlink.app'
