// ============================================================
// themes.ts — 8개 FOOD 테마 공통 설정 (경로 ↔ 색상 ↔ CSS 클래스)
// index.css 의 THEME 01~08 색상과 맞춰 두세요.
// ============================================================

export type ThemeId =
  | 'vega'
  | 'exot'
  | 'chef'
  | 'mich'
  | 'kids'
  | 'ani'
  | 'stran'
  | 'liqu'

export interface FoodTheme {
  id: ThemeId
  /** 사이드바·링크에 표시할 이름 */
  label: string
  /** react-router 경로 (선행 슬래시 포함) */
  path: string
  /** 메뉴/탐색 링크 강조색 — index.css --theme-primary 과 동일하게 */
  color: string
  /** 페이지 루트 className: theme-vega, theme-chef … */
  themeClass: string
}

/** FOOD 카테고리 8개 (순서 = Home 슬라이드·사이드바 FOOD 메뉴 권장 순서) */
export const FOOD_THEMES: FoodTheme[] = [
  { id: 'vega',  label: '채식주의',     path: '/VegaPage',  color: '#C45C26', themeClass: 'theme-vega'  },
  { id: 'exot',  label: '이국요리',     path: '/ExotPage',  color: '#C05621', themeClass: 'theme-exot'  },
  { id: 'chef',  label: '유명쉐프식당', path: '/ChefPage',  color: '#D4AF37', themeClass: 'theme-chef'  },
  { id: 'mich',  label: '미슐랭',       path: '/MichPage',  color: '#C6A46C', themeClass: 'theme-mich'  },
  { id: 'kids',  label: '키즈존식당',   path: '/KidsPage',  color: '#E8272A', themeClass: 'theme-kids'  },
  { id: 'ani',   label: '애견동반식당', path: '/AniPage',   color: '#FF8E2B', themeClass: 'theme-ani'   },
  { id: 'stran', label: '특이한괴식',   path: '/StranPage', color: '#D4FF00', themeClass: 'theme-stran' },
  { id: 'liqu',  label: '세계주류판매', path: '/LiquPage',  color: '#5C1A1B', themeClass: 'theme-liqu'  },
]

const PATH_TO_THEME = new Map(
  FOOD_THEMES.map((t) => [t.path.toLowerCase(), t])
)

/** 현재 URL이 FOOD 테마 페이지면 해당 테마 반환 */
export function getFoodThemeByPath(pathname: string): FoodTheme | null {
  const key = pathname.replace(/\/$/, '').toLowerCase() || '/'
  return PATH_TO_THEME.get(key) ?? null
}

export function getFoodThemeById(id: ThemeId): FoodTheme | undefined {
  return FOOD_THEMES.find((t) => t.id === id)
}
