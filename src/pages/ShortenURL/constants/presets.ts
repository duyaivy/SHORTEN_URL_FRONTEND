import type { EveryQRCodeSceneConfig } from '@every-qrcode/react'
import config from '@/constants/config.const'
export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter' | 'night'

export type Preset = {
  key: SeasonKey
  i18nKey: string
  scene: EveryQRCodeSceneConfig
}

// EveryQRCode palette mapping in WebGPU shader:
// [0] themePrimary:   Canopy / Tree Foliage / Blossom / Main QR module
// [1] themeSecondary: Grass blades / Flower secondary / Highlight
// [2] themeThird:     Dirt / Soil ground base / Fallen petals
// [3] themeFourth:    Trunk bark / Branch / Deep leaf shadow
// [4] themeFifth:     Ground canvas / QR paper surface / Snow tint
export const PRESETS: Preset[] = [
  {
    // Spring: Sakura cherry blossom pink canopy + fresh green grass + gentle wind
    key: 'spring',
    i18nKey: 'season_spring',
    scene: {
      effect: 'wind',
      palette: [
        [0.95, 0.44, 0.62], // [0] Sakura blossom pink canopy
        [0.35, 0.75, 0.3], // [1] Fresh spring grass green
        [0.82, 0.76, 0.68], // [2] Warm garden soil
        [0.38, 0.24, 0.14], // [3] Cherry tree bark
        [0.965, 0.945, 0.906] // [4] Light canvas paper
      ]
    }
  },
  {
    // Summer: Lush vibrant green canopy + sunlit grass
    key: 'summer',
    i18nKey: 'season_summer',
    scene: {
      effect: 'calm',
      palette: [
        [0.16, 0.68, 0.18], // [0] Lush emerald green canopy
        [0.38, 0.82, 0.22], // [1] Sunlit grass green
        [0.76, 0.68, 0.48], // [2] Sun-warmed earth
        [0.34, 0.22, 0.12], // [3] Oak trunk bark
        [0.965, 0.945, 0.906] // [4] Light canvas paper
      ]
    }
  },
  {
    // Autumn: Fiery amber maple canopy + golden grass + autumn wind
    key: 'autumn',
    i18nKey: 'season_autumn',
    scene: {
      effect: 'wind',
      palette: [
        [0.92, 0.42, 0.08], // [0] Fiery amber/orange maple canopy
        [0.72, 0.62, 0.18], // [1] Golden autumn grass
        [0.68, 0.48, 0.28], // [2] Russet autumn earth
        [0.32, 0.18, 0.1], // [3] Weathered walnut bark
        [0.965, 0.935, 0.885] // [4] Warm autumn parchment
      ]
    }
  },
  {
    // Winter: Deep evergreen pine canopy dusted with snow + icy blue grass + falling snow
    key: 'winter',
    i18nKey: 'season_winter',
    scene: {
      effect: 'snow',
      palette: [
        [0.18, 0.45, 0.42], // [0] Deep evergreen pine canopy (snow lands on top!)
        [0.42, 0.68, 0.8], // [1] Frosted ice-blue grass
        [0.65, 0.75, 0.82], // [2] Frozen tundra ground
        [0.24, 0.28, 0.34], // [3] Slate birch bark
        [0.92, 0.96, 0.99] // [4] Pure snow canvas
      ]
    }
  },
  {
    // Night: Glowing bioluminescent neon cyan/emerald canopy + midnight grass
    key: 'night',
    i18nKey: 'season_night',
    scene: {
      effect: 'calm',
      palette: [
        [0.08, 0.88, 0.68], // [0] Bioluminescent neon cyan canopy
        [0.08, 0.4, 0.35], // [1] Deep midnight teal grass
        [0.32, 0.38, 0.5], // [2] Moonlit slate earth
        [0.12, 0.14, 0.22], // [3] Midnight ebony trunk
        [0.92, 0.94, 0.96] // [4] Moonlit canvas paper
      ]
    }
  }
]

export const DEFAULT_URL = config.serverAliasUrl || 'http://localhost:8000'
