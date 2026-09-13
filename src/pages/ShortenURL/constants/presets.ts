import type { EveryQRCodeSceneConfig } from '@every-qrcode/react'
import config from '@/constants/config.const'
export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter' | 'night'

export type Preset = {
  key: SeasonKey
  i18nKey: string
  scene: EveryQRCodeSceneConfig
}

// Keep the QR surface close to ICQR's light canvas and reserve [2] for a
// saturated module color so the finder patterns remain readable.
export const PRESETS: Preset[] = [
  {
    // Spring: warm canvas + cherry blossom pink
    key: 'spring',
    i18nKey: 'season_spring',
    scene: {
      palette: [
        [0.965, 0.945, 0.906],
        [0.18, 0.32, 0.12],
        [0.18, 0.66, 0.08],
        [0.95, 0.42, 0.58],
        [0.35, 0.22, 0.12]
      ]
    }
  },
  {
    // Summer: ICQR-like green canopy
    key: 'summer',
    i18nKey: 'season_summer',
    scene: {
      palette: [
        [0.965, 0.945, 0.906],
        [0.15, 0.32, 0.1],
        [0.2, 0.7, 0.08],
        [0.48, 0.82, 0.18],
        [0.22, 0.38, 0.12]
      ]
    }
  },
  {
    // Autumn: warm green modules with orange accents
    key: 'autumn',
    i18nKey: 'season_autumn',
    scene: {
      palette: [
        [0.965, 0.945, 0.906],
        [0.28, 0.2, 0.08],
        [0.14, 0.58, 0.08],
        [0.92, 0.48, 0.08],
        [0.38, 0.25, 0.1]
      ]
    }
  },
  {
    // Winter: light canvas + cool green modules
    key: 'winter',
    i18nKey: 'season_winter',
    scene: {
      effect: 'snow',
      palette: [
        [0.965, 0.945, 0.906],
        [0.18, 0.36, 0.48],
        [0.1, 0.56, 0.28],
        [0.38, 0.72, 0.82],
        [0.12, 0.24, 0.3]
      ]
    }
  },
  {
    // Night: light canvas + electric green modules
    key: 'night',
    i18nKey: 'season_night',
    scene: {
      palette: [
        [0.965, 0.945, 0.906],
        [0.08, 0.22, 0.14],
        [0.04, 0.62, 0.42],
        [0.12, 0.92, 0.68],
        [0.06, 0.16, 0.12]
      ]
    }
  }
]

export const DEFAULT_URL = config.serverAliasUrl || 'http://localhost:8000'
