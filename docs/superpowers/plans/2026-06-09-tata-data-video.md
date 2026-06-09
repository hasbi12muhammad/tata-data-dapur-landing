# Tata Data Dapur — Video Promosi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun satu Remotion project yang menghasilkan 4 komposisi video promosi Tata Data Dapur, masing-masing di-export dalam 3 format (9:16, 16:9, 1:1) = 12 video total.

**Architecture:** Project standalone di `/home/gbk/Project/tata-data-video/`. Scene components menerima prop `format: '9:16' | '16:9' | '1:1'` untuk menyesuaikan layout. Semua 12 komposisi didaftarkan di `Root.tsx`. Assets dicopy dari `tata-data-dapur-land-page/public/assets/`.

**Tech Stack:** Remotion 4.x, React 18, TypeScript, @remotion/google-fonts

---

## File Map

```
/home/gbk/Project/tata-data-video/
├── package.json
├── remotion.config.ts
├── tsconfig.json
├── src/
│   ├── index.ts                      # Entry point Remotion
│   ├── Root.tsx                      # Register 12 compositions
│   ├── tokens.ts                     # Brand colors, fonts, timing
│   ├── types.ts                      # VideoFormat type
│   ├── components/
│   │   ├── Logo.tsx                  # td-logo.png render
│   │   ├── BrandText.tsx             # Fraunces + Plus Jakarta Sans
│   │   ├── SpiceFloat.tsx            # Ilustrasi rempah melayang
│   │   ├── AppScreen.tsx             # Screenshot dengan frame HP/browser
│   │   ├── HPPCounter.tsx            # Angka HPP berubah animasi
│   │   └── BarChart.tsx              # Animated bar chart
│   ├── scenes/
│   │   ├── HookScene.tsx             # "HPP kamu masih dihitung manual?"
│   │   ├── AgitateScene.tsx          # "Harga bahan naik — kamu tahu ga?"
│   │   ├── SolutionScene.tsx         # Logo + nama app muncul
│   │   ├── PurchaseScene.tsx         # Catat pembelian → trigger HPP (CORE)
│   │   ├── HPPScene.tsx              # HPP update animasi (CORE)
│   │   ├── StockScene.tsx            # Stok terupdate (CORE)
│   │   ├── ReportScene.tsx           # Laporan profit
│   │   ├── SalesScene.tsx            # Catat penjualan
│   │   ├── PriceScene.tsx            # Rp 175.000 bayar sekali
│   │   ├── CTAScene.tsx              # CTA button
│   │   ├── TaglineScene.tsx          # "Setup 15 menit. Cocok untuk kuliner."
│   │   ├── LogoEndScene.tsx          # Logo fade out
│   │   ├── ShowcaseScene.tsx         # UI walkthrough (Video B)
│   │   └── DayScene.tsx              # Pagi/sore framing (Video C)
│   └── compositions/
│       ├── VideoA30.tsx              # Pain→Solusi 30s
│       ├── VideoA60.tsx              # Pain→Solusi 60s
│       ├── VideoB60.tsx              # Feature Showcase 60s
│       └── VideoC60.tsx              # Day-in-the-life 60s
└── public/
    ├── td-logo.png
    ├── screenshots/
    │   ├── bahan-baku.png
    │   ├── dashboard.png
    │   ├── laporan.png
    │   ├── pembelian.png
    │   ├── pengeluaran.png
    │   ├── penjualan.png
    │   └── produk.png
    ├── illustrations/
    │   └── 1.png … 25.png
    └── music/
        └── background.mp3
```

---

## Task 1: Scaffold project + install dependencies

**Files:**
- Create: `/home/gbk/Project/tata-data-video/package.json`
- Create: `/home/gbk/Project/tata-data-video/remotion.config.ts`
- Create: `/home/gbk/Project/tata-data-video/tsconfig.json`

- [ ] **Step 1: Buat folder dan init project**

```bash
mkdir -p /home/gbk/Project/tata-data-video
cd /home/gbk/Project/tata-data-video
npm init -y
```

- [ ] **Step 2: Install dependencies**

```bash
npm install remotion @remotion/cli react react-dom @remotion/google-fonts
npm install --save-dev typescript @types/react @types/react-dom
```

- [ ] **Step 3: Buat `remotion.config.ts`**

```ts
// remotion.config.ts
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
```

- [ ] **Step 4: Buat `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./build"
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Tambah script ke `package.json`**

Edit `package.json`, ganti bagian `"scripts"`:

```json
"scripts": {
  "preview": "npx remotion preview src/index.ts",
  "render:a30": "npx remotion render src/index.ts VideoA30-916 out/VideoA30-916.mp4",
  "render:all": "npx remotion render src/index.ts"
}
```

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold remotion project"
```

---

## Task 2: Types + Brand Tokens

**Files:**
- Create: `src/types.ts`
- Create: `src/tokens.ts`

- [ ] **Step 1: Buat `src/types.ts`**

```ts
// src/types.ts
export type VideoFormat = '9:16' | '16:9' | '1:1';
```

- [ ] **Step 2: Buat `src/tokens.ts`**

```ts
// src/tokens.ts
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans';

export const { fontFamily: fraunces } = loadFraunces();
export const { fontFamily: jakarta } = loadJakarta();

export const colors = {
  cream:      '#F4EDE0',
  creamLight: '#FBF6EC',
  dark:       '#1B1208',
  rust:       '#B5532A',
  gold:       '#C49A3F',
  muted:      '#5A3D25',
  white:      '#FFFFFF',
} as const;

export const fps = 30;

// Helper: frame number dari detik
export const sec = (s: number) => s * fps;
```

- [ ] **Step 3: Buat `src/index.ts`**

```ts
// src/index.ts
export { RemotionRoot as default } from './Root';
```

- [ ] **Step 4: Buat `src/Root.tsx` placeholder sementara**

```tsx
// src/Root.tsx
import { Composition } from 'remotion';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Komposisi akan ditambahkan di Task 21 */}
    </>
  );
};
```

- [ ] **Step 5: Verify preview bisa jalan**

```bash
cd /home/gbk/Project/tata-data-video
npx remotion preview src/index.ts
```

Expected: Browser terbuka di `http://localhost:3000`, panel kosong.

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "feat: add brand tokens and types"
```

---

## Task 3: Copy assets

**Files:**
- Create: `public/` tree

- [ ] **Step 1: Buat struktur folder public**

```bash
mkdir -p /home/gbk/Project/tata-data-video/public/screenshots
mkdir -p /home/gbk/Project/tata-data-video/public/illustrations
mkdir -p /home/gbk/Project/tata-data-video/public/music
```

- [ ] **Step 2: Copy logo**

```bash
cp /home/gbk/Project/tata-data-dapur-land-page/public/assets/td-logo.png \
   /home/gbk/Project/tata-data-video/public/
```

- [ ] **Step 3: Copy app screenshots**

```bash
cp /home/gbk/Project/tata-data-dapur-land-page/public/assets/app/*.png \
   /home/gbk/Project/tata-data-video/public/screenshots/
```

- [ ] **Step 4: Copy illustrations**

```bash
cp /home/gbk/Project/tata-data-dapur-land-page/public/assets/components/*.png \
   /home/gbk/Project/tata-data-video/public/illustrations/
```

- [ ] **Step 5: Download background music**

Download file royalty-free dari Pixabay (warm/upbeat, ~2 menit):
- Cari di https://pixabay.com/music/ keyword: "warm acoustic" atau "upbeat kitchen"
- Simpan ke: `public/music/background.mp3`

Atau pakai placeholder sementara (opsional skip sampai Task 22).

- [ ] **Step 6: Verify**

```bash
ls /home/gbk/Project/tata-data-video/public/screenshots/
# Expected: bahan-baku.png dashboard.png laporan.png pembelian.png pengeluaran.png penjualan.png produk.png

ls /home/gbk/Project/tata-data-video/public/illustrations/ | wc -l
# Expected: 25
```

- [ ] **Step 7: Commit**

```bash
git add public/
git commit -m "chore: copy brand assets from tata-data-dapur-land-page"
```

---

## Task 4: Component — Logo

**Files:**
- Create: `src/components/Logo.tsx`

- [ ] **Step 1: Buat `src/components/Logo.tsx`**

```tsx
// src/components/Logo.tsx
import { Img, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fraunces } from '../tokens';

interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 80, showTagline = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const opacity = Math.min(1, frame / 10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ transform: `scale(${scale})`, opacity }}>
        <Img src="/td-logo.png" style={{ width: size, height: size, objectFit: 'contain' }} />
      </div>
      {showTagline && (
        <div style={{
          fontFamily: fraunces,
          fontSize: size * 0.3,
          color: colors.dark,
          opacity: Math.min(1, Math.max(0, (frame - 8) / 10)),
          letterSpacing: '-0.5px',
        }}>
          Tata Data Dapur
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Preview manual**

Tambahkan temporary composition ke `Root.tsx` untuk test:

```tsx
<Composition
  id="TestLogo"
  component={() => (
    <AbsoluteFill style={{ background: colors.cream, alignItems: 'center', justifyContent: 'center' }}>
      <Logo size={120} showTagline />
    </AbsoluteFill>
  )}
  width={1080} height={1080} fps={30} durationInFrames={60}
/>
```

Jalankan `npm run preview`, navigasi ke TestLogo, play — logo harus spring-in dan nama app muncul.

- [ ] **Step 3: Commit**

```bash
git add src/components/Logo.tsx
git commit -m "feat: add Logo component with spring animation"
```

---

## Task 5: Component — BrandText

**Files:**
- Create: `src/components/BrandText.tsx`

- [ ] **Step 1: Buat `src/components/BrandText.tsx`**

```tsx
// src/components/BrandText.tsx
import { interpolate, useCurrentFrame } from 'remotion';
import { colors, fraunces, jakarta } from '../tokens';

interface BrandTextProps {
  text: string;
  variant: 'headline' | 'subheadline' | 'body' | 'label' | 'mono';
  color?: string;
  italic?: boolean;
  delay?: number;       // frame delay sebelum animasi mulai
  animateIn?: boolean;  // slide up + fade
  style?: React.CSSProperties;
}

const variantStyles: Record<BrandTextProps['variant'], React.CSSProperties> = {
  headline:    { fontFamily: fraunces, fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-2px' },
  subheadline: { fontFamily: fraunces, fontSize: 44, fontWeight: 400, lineHeight: 1.2, letterSpacing: '-1px' },
  body:        { fontFamily: jakarta, fontSize: 28, fontWeight: 400, lineHeight: 1.6 },
  label:       { fontFamily: jakarta, fontSize: 20, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },
  mono:        { fontFamily: '"DM Mono", monospace', fontSize: 18, letterSpacing: '0.06em' },
};

export const BrandText: React.FC<BrandTextProps> = ({
  text, variant, color, italic = false, delay = 0, animateIn = true, style,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);

  const opacity = animateIn ? interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) : 1;
  const y      = animateIn ? interpolate(localFrame, [0, 12], [30, 0], { extrapolateRight: 'clamp' }) : 0;

  return (
    <div style={{
      ...variantStyles[variant],
      color: color ?? colors.dark,
      fontStyle: italic ? 'italic' : 'normal',
      opacity,
      transform: `translateY(${y}px)`,
      ...style,
    }}>
      {text}
    </div>
  );
};
```

- [ ] **Step 2: Preview manual**

Tambah temporary composition untuk test tiap variant. Pastikan animateIn berjalan smooth.

- [ ] **Step 3: Commit**

```bash
git add src/components/BrandText.tsx
git commit -m "feat: add BrandText component"
```

---

## Task 6: Component — SpiceFloat

**Files:**
- Create: `src/components/SpiceFloat.tsx`

- [ ] **Step 1: Buat `src/components/SpiceFloat.tsx`**

```tsx
// src/components/SpiceFloat.tsx
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SpiceFloatProps {
  src: string;        // e.g. "/illustrations/1.png"
  width: number;
  height: number;
  rotation?: number;  // initial rotation deg
  delay?: number;     // frame delay masuk
  floatAmplitude?: number; // pixel naik-turun
  style?: React.CSSProperties;
}

export const SpiceFloat: React.FC<SpiceFloatProps> = ({
  src, width, height, rotation = 0, delay = 0, floatAmplitude = 12, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - delay);
  const enterScale = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 100 } });
  const enterOpacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Float loop: pakai sin wave dari frame
  const floatY = Math.sin((frame / fps) * Math.PI * 0.5) * floatAmplitude;

  return (
    <div style={{
      transform: `rotate(${rotation}deg) translateY(${floatY}px) scale(${enterScale})`,
      opacity: enterOpacity,
      ...style,
    }}>
      <Img src={src} style={{ width, height, objectFit: 'contain' }} />
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SpiceFloat.tsx
git commit -m "feat: add SpiceFloat component"
```

---

## Task 7: Component — AppScreen

**Files:**
- Create: `src/components/AppScreen.tsx`

- [ ] **Step 1: Buat `src/components/AppScreen.tsx`**

```tsx
// src/components/AppScreen.tsx
import { Img, interpolate, useCurrentFrame } from 'remotion';
import { VideoFormat } from '../types';
import { colors } from '../tokens';

interface AppScreenProps {
  src: string;          // e.g. "/screenshots/pembelian.png"
  format: VideoFormat;
  delay?: number;
  slideFrom?: 'left' | 'right' | 'bottom';
}

export const AppScreen: React.FC<AppScreenProps> = ({
  src, format, delay = 0, slideFrom = 'bottom',
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);

  const progress = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  const slideOffset = (1 - progress) * 60;
  const translateX = slideFrom === 'left' ? -slideOffset : slideFrom === 'right' ? slideOffset : 0;
  const translateY = slideFrom === 'bottom' ? slideOffset : 0;

  // Frame HP untuk 9:16 dan 1:1, frame browser untuk 16:9
  const isLandscape = format === '16:9';

  const frameStyle: React.CSSProperties = isLandscape
    ? {
        background: '#fff',
        borderRadius: 12,
        padding: '28px 12px 12px',
        boxShadow: '0 8px 40px rgba(27,18,8,0.18)',
        border: `1px solid rgba(181,83,42,0.12)`,
        position: 'relative',
      }
    : {
        background: colors.dark,
        borderRadius: 28,
        padding: '18px 10px',
        boxShadow: '0 16px 60px rgba(27,18,8,0.35)',
        position: 'relative',
      };

  const imgStyle: React.CSSProperties = {
    width: isLandscape ? 520 : 280,
    borderRadius: isLandscape ? 4 : 16,
    display: 'block',
  };

  return (
    <div style={{
      transform: `translate(${translateX}px, ${translateY}px)`,
      opacity: progress,
    }}>
      <div style={frameStyle}>
        {/* Notch untuk HP */}
        {!isLandscape && (
          <div style={{
            width: 80, height: 20, background: colors.dark,
            borderRadius: 10, margin: '0 auto 12px',
            border: `2px solid rgba(255,255,255,0.08)`,
          }} />
        )}
        {/* Browser bar untuk landscape */}
        {isLandscape && (
          <div style={{
            position: 'absolute', top: 8, left: 12,
            display: 'flex', gap: 5,
          }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
        )}
        <Img src={src} style={imgStyle} />
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AppScreen.tsx
git commit -m "feat: add AppScreen component with HP/browser frame"
```

---

## Task 8: Component — HPPCounter

**Files:**
- Create: `src/components/HPPCounter.tsx`

Ini komponen kunci — angka HPP yang berubah dari nilai lama ke baru untuk menunjukkan "HPP otomatis update".

- [ ] **Step 1: Buat `src/components/HPPCounter.tsx`**

```tsx
// src/components/HPPCounter.tsx
import { interpolate, useCurrentFrame } from 'remotion';
import { colors, fraunces, jakarta } from '../tokens';

interface HPPCounterProps {
  fromValue: number;  // HPP lama, e.g. 8500
  toValue: number;    // HPP baru, e.g. 9200
  label?: string;     // e.g. "HPP Nasi Goreng"
  delay?: number;
  animateDuration?: number; // frames untuk animasi angka
}

const formatRp = (n: number) =>
  'Rp ' + Math.round(n).toLocaleString('id-ID');

export const HPPCounter: React.FC<HPPCounterProps> = ({
  fromValue, toValue, label = 'HPP per Porsi', delay = 0, animateDuration = 20,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);

  const currentValue = interpolate(
    localFrame,
    [0, animateDuration],
    [fromValue, toValue],
    { extrapolateRight: 'clamp' }
  );

  const isUpdating = localFrame > 0 && localFrame < animateDuration + 5;
  const isDone = localFrame >= animateDuration;

  return (
    <div style={{
      background: colors.creamLight,
      border: `1.5px solid ${isUpdating ? colors.rust : 'rgba(181,83,42,0.15)'}`,
      borderRadius: 16,
      padding: '20px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      boxShadow: isUpdating ? `0 0 24px rgba(181,83,42,0.2)` : 'none',
      transition: 'box-shadow 0.3s',
      minWidth: 260,
    }}>
      <div style={{ fontFamily: jakarta, fontSize: 14, color: colors.muted, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{
        fontFamily: fraunces,
        fontSize: 40,
        fontWeight: 700,
        color: isDone ? colors.rust : colors.dark,
        letterSpacing: '-1px',
        lineHeight: 1,
      }}>
        {formatRp(currentValue)}
      </div>
      {isDone && (
        <div style={{
          fontFamily: jakarta,
          fontSize: 13,
          color: colors.rust,
          fontWeight: 700,
          opacity: interpolate(localFrame, [animateDuration, animateDuration + 8], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          ↑ Update otomatis
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Preview manual — tambah test composition**

```tsx
<Composition
  id="TestHPP"
  component={() => (
    <AbsoluteFill style={{ background: colors.cream, alignItems: 'center', justifyContent: 'center' }}>
      <HPPCounter fromValue={8500} toValue={9200} label="HPP Nasi Goreng" delay={15} />
    </AbsoluteFill>
  )}
  width={1080} height={1080} fps={30} durationInFrames={90}
/>
```

Play di preview — angka harus count up dari 8.500 ke 9.200 lalu muncul label "↑ Update otomatis".

- [ ] **Step 3: Commit**

```bash
git add src/components/HPPCounter.tsx
git commit -m "feat: add HPPCounter component — key visual for HPP auto-update"
```

---

## Task 9: Component — BarChart

**Files:**
- Create: `src/components/BarChart.tsx`

- [ ] **Step 1: Buat `src/components/BarChart.tsx`**

```tsx
// src/components/BarChart.tsx
import { interpolate, useCurrentFrame } from 'remotion';
import { colors, jakarta } from '../tokens';

const DEFAULT_DATA = [
  { day: 'Sen', value: 40 },
  { day: 'Sel', value: 60 },
  { day: 'Rab', value: 45 },
  { day: 'Kam', value: 80 },
  { day: 'Jum', value: 55 },
  { day: 'Sab', value: 90 },
  { day: 'Min', value: 70 },
];

interface BarChartProps {
  data?: { day: string; value: number }[];
  height?: number;
  delay?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data = DEFAULT_DATA, height = 120, delay = 0,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
        {data.map((d, i) => {
          const barProgress = interpolate(
            localFrame,
            [i * 4, i * 4 + 16],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          return (
            <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{
                width: '100%',
                height: `${d.value * barProgress}%`,
                background: i === 5 ? colors.rust : colors.gold,
                borderRadius: '4px 4px 0 0',
                opacity: 0.7 + i * 0.04,
              }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {data.map(d => (
          <div key={d.day} style={{
            flex: 1, textAlign: 'center',
            fontFamily: jakarta, fontSize: 11,
            color: colors.muted, opacity: 0.6,
          }}>
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BarChart.tsx
git commit -m "feat: add BarChart component"
```

---

## Task 10: Scene — HookScene + AgitateScene

**Files:**
- Create: `src/scenes/HookScene.tsx`
- Create: `src/scenes/AgitateScene.tsx`

- [ ] **Step 1: Buat `src/scenes/HookScene.tsx`**

```tsx
// src/scenes/HookScene.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BrandText } from '../components/BrandText';
import { SpiceFloat } from '../components/SpiceFloat';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface HookSceneProps {
  format: VideoFormat;
}

export const HookScene: React.FC<HookSceneProps> = ({ format }) => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: colors.cream, opacity: bgOpacity }}>
      {/* Ilustrasi rempah pojok */}
      <SpiceFloat
        src="/illustrations/1.png"
        width={140} height={140}
        rotation={-10} delay={5}
        style={{ position: 'absolute', top: 60, left: 40 }}
      />
      <SpiceFloat
        src="/illustrations/3.png"
        width={110} height={110}
        rotation={15} delay={10}
        style={{ position: 'absolute', top: 80, right: 40 }}
      />
      <SpiceFloat
        src="/illustrations/6.png"
        width={100} height={100}
        rotation={-8} delay={15}
        style={{ position: 'absolute', bottom: 80, right: 60 }}
      />

      {/* Teks utama */}
      <div style={{
        position: 'absolute',
        top: format === '16:9' ? '30%' : '35%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 16, padding: '0 80px',
      }}>
        <BrandText
          text="HPP kamu"
          variant="headline"
          animateIn delay={0}
          style={{ textAlign: 'center' }}
        />
        <BrandText
          text="masih dihitung manual?"
          variant="headline"
          italic color={colors.rust}
          animateIn delay={8}
          style={{ textAlign: 'center' }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Buat `src/scenes/AgitateScene.tsx`**

```tsx
// src/scenes/AgitateScene.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BrandText } from '../components/BrandText';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface AgitateSceneProps {
  format: VideoFormat;
}

export const AgitateScene: React.FC<AgitateSceneProps> = ({ format }) => {
  const frame = useCurrentFrame();

  // Teks pertama muncul, lalu "dicoret" (strikethrough animasi)
  const strikeWidth = interpolate(frame, [15, 28], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <div style={{
        position: 'absolute',
        top: format === '16:9' ? '28%' : '36%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20, padding: '0 80px',
      }}>
        {/* Baris yang "dicoret" */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <BrandText
            text="Harga bahan naik —"
            variant="subheadline"
            animateIn delay={0}
            style={{ textAlign: 'center' }}
          />
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <BrandText
            text="kamu tahu HPP berubah?"
            variant="subheadline"
            animateIn delay={6}
            style={{ textAlign: 'center' }}
          />
          {/* Garis coret animasi */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            height: 3,
            width: `${strikeWidth}%`,
            background: colors.rust,
            borderRadius: 2,
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/scenes/HookScene.tsx src/scenes/AgitateScene.tsx
git commit -m "feat: add HookScene and AgitateScene"
```

---

## Task 11: Scene — SolutionScene

**Files:**
- Create: `src/scenes/SolutionScene.tsx`

- [ ] **Step 1: Buat `src/scenes/SolutionScene.tsx`**

```tsx
// src/scenes/SolutionScene.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Logo } from '../components/Logo';
import { BrandText } from '../components/BrandText';
import { SpiceFloat } from '../components/SpiceFloat';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface SolutionSceneProps {
  format: VideoFormat;
}

export const SolutionScene: React.FC<SolutionSceneProps> = ({ format }) => {
  const frame = useCurrentFrame();

  // Background fade dari gelap ke cream (reveal moment)
  const bg = `rgba(27,18,8,${interpolate(frame, [0, 12], [0.6, 0], { extrapolateRight: 'clamp' })})`;

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: bg,
        pointerEvents: 'none',
      }} />

      {/* Ilustrasi melayang */}
      <SpiceFloat src="/illustrations/8.png" width={120} height={80}
        rotation={6} delay={12} style={{ position: 'absolute', top: 100, left: 60 }} />
      <SpiceFloat src="/illustrations/13.png" width={100} height={90}
        rotation={-10} delay={18} style={{ position: 'absolute', bottom: 120, right: 70 }} />

      {/* Logo + nama + eyebrow */}
      <div style={{
        position: 'absolute',
        top: format === '16:9' ? '25%' : '33%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
      }}>
        {/* Eyebrow badge */}
        <div style={{
          background: colors.rust,
          borderRadius: 99,
          padding: '8px 20px',
          opacity: interpolate(frame, [6, 16], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <BrandText
            text="Kenalan dulu"
            variant="label"
            color={colors.white}
            animateIn={false}
          />
        </div>

        <Logo size={100} showTagline />

        <BrandText
          text="Pencatat bisnis kuliner & produksi ringan"
          variant="body"
          color={colors.muted}
          animateIn delay={20}
          style={{ textAlign: 'center', padding: '0 80px' }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/SolutionScene.tsx
git commit -m "feat: add SolutionScene"
```

---

## Task 12: Scene — PurchaseScene (CORE)

**Files:**
- Create: `src/scenes/PurchaseScene.tsx`

Scene ini menunjukkan user mencatat pembelian bahan baku baru — trigger untuk HPP berubah.

- [ ] **Step 1: Buat `src/scenes/PurchaseScene.tsx`**

```tsx
// src/scenes/PurchaseScene.tsx
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { AppScreen } from '../components/AppScreen';
import { BrandText } from '../components/BrandText';
import { SpiceFloat } from '../components/SpiceFloat';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface PurchaseSceneProps {
  format: VideoFormat;
  copy?: string;
}

export const PurchaseScene: React.FC<PurchaseSceneProps> = ({
  format,
  copy = 'Harga bahan baku naik? Catat pembelian baru —',
}) => {
  const frame = useCurrentFrame();
  const isLandscape = format === '16:9';

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SpiceFloat src="/illustrations/2.png" width={100} height={90}
        rotation={-8} delay={5} style={{ position: 'absolute', top: 60, right: 50 }} />

      <div style={{
        position: 'absolute',
        top: isLandscape ? '15%' : '12%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 32, padding: '0 60px',
      }}>
        {/* Label */}
        <div style={{
          background: `rgba(181,83,42,0.1)`,
          borderRadius: 99, padding: '6px 18px',
        }}>
          <BrandText text="① Catat Pembelian" variant="label" color={colors.rust} animateIn delay={0} />
        </div>

        {/* Screenshot app */}
        <AppScreen
          src="/screenshots/pembelian.png"
          format={format}
          delay={6}
          slideFrom="bottom"
        />

        {/* Copy */}
        <BrandText
          text={copy}
          variant="body"
          color={colors.muted}
          animateIn delay={18}
          style={{ textAlign: 'center', maxWidth: 520 }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/PurchaseScene.tsx
git commit -m "feat: add PurchaseScene (CORE — HPP flow step 1)"
```

---

## Task 13: Scene — HPPScene (CORE)

**Files:**
- Create: `src/scenes/HPPScene.tsx`

- [ ] **Step 1: Buat `src/scenes/HPPScene.tsx`**

```tsx
// src/scenes/HPPScene.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { HPPCounter } from '../components/HPPCounter';
import { AppScreen } from '../components/AppScreen';
import { BrandText } from '../components/BrandText';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface HPPSceneProps {
  format: VideoFormat;
  fromHPP?: number;
  toHPP?: number;
  copy?: string;
}

export const HPPScene: React.FC<HPPSceneProps> = ({
  format,
  fromHPP = 8500,
  toHPP = 9200,
  copy = '— HPP semua menu langsung ikut update.',
}) => {
  const frame = useCurrentFrame();
  const isLandscape = format === '16:9';

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <div style={{
        position: 'absolute',
        top: isLandscape ? '12%' : '10%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 28, padding: '0 60px',
      }}>
        {/* Label */}
        <div style={{ background: `rgba(181,83,42,0.1)`, borderRadius: 99, padding: '6px 18px' }}>
          <BrandText text="② HPP Otomatis Update" variant="label" color={colors.rust} animateIn delay={0} />
        </div>

        {/* HPP Counter */}
        <div style={{ opacity: interpolate(frame, [4, 14], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <HPPCounter
            fromValue={fromHPP}
            toValue={toHPP}
            label="HPP Nasi Goreng Special"
            delay={8}
            animateDuration={25}
          />
        </div>

        {/* App screenshot (produk) */}
        <AppScreen
          src="/screenshots/produk.png"
          format={format}
          delay={10}
          slideFrom="bottom"
        />

        {/* Copy */}
        <BrandText
          text={copy}
          variant="body"
          color={colors.muted}
          animateIn delay={20}
          style={{ textAlign: 'center', maxWidth: 520 }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/HPPScene.tsx
git commit -m "feat: add HPPScene (CORE — HPP auto-update visual)"
```

---

## Task 14: Scene — StockScene (CORE)

**Files:**
- Create: `src/scenes/StockScene.tsx`

- [ ] **Step 1: Buat `src/scenes/StockScene.tsx`**

```tsx
// src/scenes/StockScene.tsx
import { AbsoluteFill } from 'remotion';
import { AppScreen } from '../components/AppScreen';
import { BrandText } from '../components/BrandText';
import { SpiceFloat } from '../components/SpiceFloat';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface StockSceneProps {
  format: VideoFormat;
  copy?: string;
}

export const StockScene: React.FC<StockSceneProps> = ({
  format,
  copy = 'Stok bahan baku tercatat, ga perlu hitung manual.',
}) => {
  const isLandscape = format === '16:9';

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SpiceFloat src="/illustrations/7.png" width={90} height={90}
        rotation={18} delay={8} style={{ position: 'absolute', bottom: 100, left: 50 }} />

      <div style={{
        position: 'absolute',
        top: isLandscape ? '12%' : '10%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 28, padding: '0 60px',
      }}>
        <div style={{ background: `rgba(181,83,42,0.1)`, borderRadius: 99, padding: '6px 18px' }}>
          <BrandText text="③ Stok Terupdate" variant="label" color={colors.rust} animateIn delay={0} />
        </div>

        <AppScreen
          src="/screenshots/bahan-baku.png"
          format={format}
          delay={6}
          slideFrom="bottom"
        />

        <BrandText
          text={copy}
          variant="body"
          color={colors.muted}
          animateIn delay={18}
          style={{ textAlign: 'center', maxWidth: 520 }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/StockScene.tsx
git commit -m "feat: add StockScene (CORE — stock update visual)"
```

---

## Task 15: Scene — ReportScene + SalesScene + TaglineScene + LogoEndScene

**Files:**
- Create: `src/scenes/ReportScene.tsx`
- Create: `src/scenes/SalesScene.tsx`
- Create: `src/scenes/TaglineScene.tsx`
- Create: `src/scenes/LogoEndScene.tsx`

- [ ] **Step 1: Buat `src/scenes/ReportScene.tsx`**

```tsx
// src/scenes/ReportScene.tsx
import { AbsoluteFill } from 'remotion';
import { AppScreen } from '../components/AppScreen';
import { BarChart } from '../components/BarChart';
import { BrandText } from '../components/BrandText';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface ReportSceneProps {
  format: VideoFormat;
  copy?: string;
  showBarChart?: boolean;
}

export const ReportScene: React.FC<ReportSceneProps> = ({
  format, copy = 'Profit harian, mingguan, bulanan — tinggal lihat.', showBarChart = false,
}) => {
  const isLandscape = format === '16:9';

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <div style={{
        position: 'absolute',
        top: isLandscape ? '12%' : '10%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 28, padding: '0 60px',
      }}>
        <BrandText text="Laporan Profit" variant="label" color={colors.rust} animateIn delay={0} />

        {showBarChart
          ? <div style={{ width: 320 }}><BarChart delay={8} /></div>
          : <AppScreen src="/screenshots/laporan.png" format={format} delay={6} slideFrom="bottom" />
        }

        <BrandText text={copy} variant="body" color={colors.muted} animateIn delay={18}
          style={{ textAlign: 'center', maxWidth: 520 }} />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Buat `src/scenes/SalesScene.tsx`**

```tsx
// src/scenes/SalesScene.tsx
import { AbsoluteFill } from 'remotion';
import { AppScreen } from '../components/AppScreen';
import { BrandText } from '../components/BrandText';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface SalesSceneProps {
  format: VideoFormat;
  copy?: string;
}

export const SalesScene: React.FC<SalesSceneProps> = ({
  format, copy = 'Catat penjualan cepat dari HP.',
}) => (
  <AbsoluteFill style={{ background: colors.cream }}>
    <div style={{
      position: 'absolute', top: '10%', left: 0, right: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '0 60px',
    }}>
      <BrandText text="Catat Penjualan" variant="label" color={colors.rust} animateIn delay={0} />
      <AppScreen src="/screenshots/penjualan.png" format={format} delay={6} slideFrom="bottom" />
      <BrandText text={copy} variant="body" color={colors.muted} animateIn delay={18}
        style={{ textAlign: 'center', maxWidth: 520 }} />
    </div>
  </AbsoluteFill>
);
```

- [ ] **Step 3: Buat `src/scenes/TaglineScene.tsx`**

```tsx
// src/scenes/TaglineScene.tsx
import { AbsoluteFill } from 'remotion';
import { BrandText } from '../components/BrandText';
import { SpiceFloat } from '../components/SpiceFloat';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface TaglineSceneProps {
  format: VideoFormat;
}

export const TaglineScene: React.FC<TaglineSceneProps> = ({ format }) => (
  <AbsoluteFill style={{ background: colors.cream }}>
    <SpiceFloat src="/illustrations/20.png" width={120} height={120}
      rotation={10} delay={5} style={{ position: 'absolute', top: 80, left: 60 }} />
    <SpiceFloat src="/illustrations/13.png" width={100} height={100}
      rotation={-12} delay={10} style={{ position: 'absolute', bottom: 100, right: 60 }} />

    <div style={{
      position: 'absolute', top: format === '16:9' ? '30%' : '38%',
      left: 0, right: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '0 80px',
    }}>
      <BrandText text="Setup 15 menit." variant="subheadline" animateIn delay={0} style={{ textAlign: 'center' }} />
      <BrandText text="Cocok untuk kuliner & produksi ringan." variant="body" color={colors.muted}
        animateIn delay={10} style={{ textAlign: 'center' }} />
    </div>
  </AbsoluteFill>
);
```

- [ ] **Step 4: Buat `src/scenes/LogoEndScene.tsx`**

```tsx
// src/scenes/LogoEndScene.tsx
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';
import { colors } from '../tokens';

export const LogoEndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out di akhir
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ background: colors.cream, opacity, alignItems: 'center', justifyContent: 'center' }}>
      <Logo size={100} showTagline />
    </AbsoluteFill>
  );
};
```

- [ ] **Step 5: Commit**

```bash
git add src/scenes/ReportScene.tsx src/scenes/SalesScene.tsx \
        src/scenes/TaglineScene.tsx src/scenes/LogoEndScene.tsx
git commit -m "feat: add supporting scenes (Report, Sales, Tagline, LogoEnd)"
```

---

## Task 16: Scene — PriceScene + CTAScene

**Files:**
- Create: `src/scenes/PriceScene.tsx`
- Create: `src/scenes/CTAScene.tsx`

- [ ] **Step 1: Buat `src/scenes/PriceScene.tsx`**

```tsx
// src/scenes/PriceScene.tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrandText } from '../components/BrandText';
import { colors, fraunces, jakarta } from '../tokens';
import { VideoFormat } from '../types';

interface PriceSceneProps {
  format: VideoFormat;
}

export const PriceScene: React.FC<PriceSceneProps> = ({ format }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Pulse animation untuk harga
  const pulse = 1 + Math.sin(frame * 0.12) * 0.015;

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <div style={{
        position: 'absolute',
        top: format === '16:9' ? '25%' : '32%',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 60px',
      }}>
        <div style={{ opacity, transform: `scale(${scale})` }}>
          {/* Eyebrow */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <BrandText text="Harga Tata Data Dapur" variant="label" color={colors.muted} animateIn={false} />
          </div>

          {/* Harga besar */}
          <div style={{
            fontFamily: fraunces,
            fontSize: format === '16:9' ? 96 : 112,
            fontWeight: 700,
            color: colors.rust,
            letterSpacing: '-3px',
            lineHeight: 1,
            textAlign: 'center',
            transform: `scale(${pulse})`,
          }}>
            Rp 175.000
          </div>
        </div>

        <BrandText
          text="Bayar sekali. Pakai selamanya."
          variant="subheadline"
          animateIn delay={12}
          style={{ textAlign: 'center' }}
        />

        {/* Checklist */}
        <div style={{
          display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center',
          opacity: interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {['Bayar sekali', 'Setup 15 menit', 'Update gratis selamanya'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: jakarta, fontSize: 18, color: colors.muted }}>
              <div style={{ color: colors.rust, fontSize: 20 }}>✓</div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Buat `src/scenes/CTAScene.tsx`**

```tsx
// src/scenes/CTAScene.tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';
import { colors, fraunces, jakarta } from '../tokens';
import { VideoFormat } from '../types';

interface CTASceneProps {
  format: VideoFormat;
}

export const CTAScene: React.FC<CTASceneProps> = ({ format }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnScale = spring({ frame, fps, config: { damping: 10, stiffness: 120 } });
  const pulse = 1 + Math.sin(frame * 0.15) * 0.025;

  return (
    <AbsoluteFill style={{ background: colors.cream, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
        padding: '0 60px',
        opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <Logo size={70} showTagline />

        {/* CTA Button */}
        <div style={{
          transform: `scale(${btnScale * pulse})`,
          background: colors.rust,
          borderRadius: 99,
          padding: format === '16:9' ? '24px 56px' : '28px 64px',
          boxShadow: `0 8px 40px rgba(181,83,42,0.4)`,
          cursor: 'pointer',
        }}>
          <div style={{
            fontFamily: jakarta,
            fontSize: format === '16:9' ? 22 : 26,
            fontWeight: 800,
            color: colors.white,
            letterSpacing: '-0.3px',
          }}>
            Mulai Rapikan Bisnis Saya →
          </div>
        </div>

        <div style={{
          fontFamily: jakarta, fontSize: 18,
          color: colors.muted,
          opacity: interpolate(frame, [12, 22], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          onetap.id/tata-data/tatadata-dapurmu
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/scenes/PriceScene.tsx src/scenes/CTAScene.tsx
git commit -m "feat: add PriceScene and CTAScene"
```

---

## Task 17: Scene — ShowcaseScene (Video B)

**Files:**
- Create: `src/scenes/ShowcaseScene.tsx`

- [ ] **Step 1: Buat `src/scenes/ShowcaseScene.tsx`**

```tsx
// src/scenes/ShowcaseScene.tsx
// Scene multi-fitur untuk Video B — satu screenshot + label per instance
import { AbsoluteFill } from 'remotion';
import { AppScreen } from '../components/AppScreen';
import { BrandText } from '../components/BrandText';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface ShowcaseSceneProps {
  format: VideoFormat;
  screenshotSrc: string;    // e.g. "/screenshots/laporan.png"
  label: string;            // e.g. "Export PDF & Excel"
  copy: string;
}

export const ShowcaseScene: React.FC<ShowcaseSceneProps> = ({
  format, screenshotSrc, label, copy,
}) => (
  <AbsoluteFill style={{ background: colors.cream }}>
    <div style={{
      position: 'absolute', top: '10%', left: 0, right: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '0 60px',
    }}>
      <div style={{ background: `rgba(181,83,42,0.1)`, borderRadius: 99, padding: '6px 18px' }}>
        <BrandText text={label} variant="label" color={colors.rust} animateIn delay={0} />
      </div>
      <AppScreen src={screenshotSrc} format={format} delay={6} slideFrom="bottom" />
      <BrandText text={copy} variant="body" color={colors.muted} animateIn delay={18}
        style={{ textAlign: 'center', maxWidth: 520 }} />
    </div>
  </AbsoluteFill>
);
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/ShowcaseScene.tsx
git commit -m "feat: add ShowcaseScene for Video B"
```

---

## Task 18: Scene — DayScene (Video C)

**Files:**
- Create: `src/scenes/DayScene.tsx`

- [ ] **Step 1: Buat `src/scenes/DayScene.tsx`**

DayScene adalah wrapper contextual (pagi/sore label) yang dipakai di awal Video C sebagai framing.

```tsx
// src/scenes/DayScene.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { AppScreen } from '../components/AppScreen';
import { BrandText } from '../components/BrandText';
import { SpiceFloat } from '../components/SpiceFloat';
import { colors } from '../tokens';
import { VideoFormat } from '../types';

interface DaySceneProps {
  format: VideoFormat;
  timeOfDay: 'pagi' | 'sore';
  copy: string;
  screenshotSrc?: string;
}

export const DayScene: React.FC<DaySceneProps> = ({
  format, timeOfDay, copy, screenshotSrc,
}) => {
  const frame = useCurrentFrame();
  const isPagi = timeOfDay === 'pagi';

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      {/* Time of day indicator */}
      <div style={{
        position: 'absolute',
        top: 60, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          background: isPagi ? colors.gold : colors.rust,
          borderRadius: 99, padding: '8px 24px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 24 }}>{isPagi ? '🌅' : '🌆'}</span>
          <BrandText
            text={isPagi ? 'Pagi' : 'Sore'}
            variant="label" color={colors.white} animateIn={false}
          />
        </div>
      </div>

      <SpiceFloat src={isPagi ? '/illustrations/1.png' : '/illustrations/20.png'}
        width={100} height={100} rotation={isPagi ? -10 : 12} delay={8}
        style={{ position: 'absolute', top: 120, right: 50 }} />

      <div style={{
        position: 'absolute', top: '22%', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 60px',
      }}>
        <BrandText text={copy} variant="subheadline" animateIn delay={6}
          style={{ textAlign: 'center' }} />
        {screenshotSrc && (
          <AppScreen src={screenshotSrc} format={format} delay={12} slideFrom="bottom" />
        )}
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/DayScene.tsx
git commit -m "feat: add DayScene for Video C day-in-the-life"
```

---

## Task 19: Composition — VideoA30

**Files:**
- Create: `src/compositions/VideoA30.tsx`

VideoA30 = 30 detik = 900 frames. Sequence layout:
- 0–120: HookScene
- 120–210: AgitateScene
- 210–330: SolutionScene
- 330–450: PurchaseScene
- 450–570: HPPScene
- 570–690: StockScene
- 690–810: PriceScene + CTAScene combined
- 810–900: LogoEndScene

- [ ] **Step 1: Buat `src/compositions/VideoA30.tsx`**

```tsx
// src/compositions/VideoA30.tsx
import { AbsoluteFill, Audio, Sequence, useVideoConfig } from 'remotion';
import { HookScene } from '../scenes/HookScene';
import { AgitateScene } from '../scenes/AgitateScene';
import { SolutionScene } from '../scenes/SolutionScene';
import { PurchaseScene } from '../scenes/PurchaseScene';
import { HPPScene } from '../scenes/HPPScene';
import { StockScene } from '../scenes/StockScene';
import { PriceScene } from '../scenes/PriceScene';
import { CTAScene } from '../scenes/CTAScene';
import { LogoEndScene } from '../scenes/LogoEndScene';
import { VideoFormat } from '../types';

interface VideoA30Props {
  format: VideoFormat;
}

export const VideoA30: React.FC<VideoA30Props> = ({ format }) => {
  return (
    <AbsoluteFill>
      <Sequence from={0}   durationInFrames={120}><HookScene format={format} /></Sequence>
      <Sequence from={120} durationInFrames={90}> <AgitateScene format={format} /></Sequence>
      <Sequence from={210} durationInFrames={120}><SolutionScene format={format} /></Sequence>
      <Sequence from={330} durationInFrames={120}><PurchaseScene format={format} /></Sequence>
      <Sequence from={450} durationInFrames={120}><HPPScene format={format} /></Sequence>
      <Sequence from={570} durationInFrames={120}><StockScene format={format} /></Sequence>
      <Sequence from={690} durationInFrames={60}> <PriceScene format={format} /></Sequence>
      <Sequence from={750} durationInFrames={60}> <CTAScene format={format} /></Sequence>
      <Sequence from={810} durationInFrames={90}> <LogoEndScene /></Sequence>

      {/* Musik background — aktifkan setelah background.mp3 tersedia */}
      {/* <Audio src="/music/background.mp3" volume={0.4} /> */}
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Daftarkan sementara di Root.tsx untuk preview**

```tsx
// src/Root.tsx — tambahkan
import { VideoA30 } from './compositions/VideoA30';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="VideoA30-916"
      component={() => <VideoA30 format="9:16" />}
      width={1080} height={1920} fps={30} durationInFrames={900}
    />
    <Composition
      id="VideoA30-169"
      component={() => <VideoA30 format="16:9" />}
      width={1920} height={1080} fps={30} durationInFrames={900}
    />
    <Composition
      id="VideoA30-11"
      component={() => <VideoA30 format="1:1" />}
      width={1080} height={1080} fps={30} durationInFrames={900}
    />
  </>
);
```

- [ ] **Step 3: Preview dan verifikasi**

```bash
npm run preview
```

- Navigasi ke `VideoA30-916`
- Play dari awal sampai akhir
- Verifikasi: setiap scene muncul pada timing yang benar, tidak ada blank frame
- Cek `VideoA30-169` dan `VideoA30-11` — layout harus menyesuaikan

- [ ] **Step 4: Commit**

```bash
git add src/compositions/VideoA30.tsx src/Root.tsx
git commit -m "feat: add VideoA30 composition (Pain→Solusi 30s)"
```

---

## Task 20: Composition — VideoA60

**Files:**
- Create: `src/compositions/VideoA60.tsx`

VideoA60 = 60 detik = 1800 frames. Sama dengan A30 tapi scene HPP flow diperluas dan tambah TaglineScene.

- [ ] **Step 1: Buat `src/compositions/VideoA60.tsx`**

```tsx
// src/compositions/VideoA60.tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { HookScene } from '../scenes/HookScene';
import { AgitateScene } from '../scenes/AgitateScene';
import { SolutionScene } from '../scenes/SolutionScene';
import { PurchaseScene } from '../scenes/PurchaseScene';
import { HPPScene } from '../scenes/HPPScene';
import { StockScene } from '../scenes/StockScene';
import { ReportScene } from '../scenes/ReportScene';
import { TaglineScene } from '../scenes/TaglineScene';
import { PriceScene } from '../scenes/PriceScene';
import { CTAScene } from '../scenes/CTAScene';
import { LogoEndScene } from '../scenes/LogoEndScene';
import { VideoFormat } from '../types';

interface VideoA60Props {
  format: VideoFormat;
}

export const VideoA60: React.FC<VideoA60Props> = ({ format }) => (
  <AbsoluteFill>
    {/* 0–11s */}
    <Sequence from={0}    durationInFrames={120}><HookScene format={format} /></Sequence>
    <Sequence from={120}  durationInFrames={90}> <AgitateScene format={format} /></Sequence>
    <Sequence from={210}  durationInFrames={120}><SolutionScene format={format} /></Sequence>
    {/* 11–35s: HPP flow diperluas */}
    <Sequence from={330}  durationInFrames={180}>
      <PurchaseScene format={format} copy="Harga bahan baku naik? Catat pembelian baru —" />
    </Sequence>
    <Sequence from={510}  durationInFrames={180}>
      <HPPScene format={format} copy="— HPP semua menu langsung ikut update." />
    </Sequence>
    <Sequence from={690}  durationInFrames={180}>
      <StockScene format={format} copy="Stok bahan baku tercatat, ga perlu hitung manual." />
    </Sequence>
    {/* 35–47s: Laporan + tagline */}
    <Sequence from={870}  durationInFrames={180}>
      <ReportScene format={format} copy="Profit harian langsung keliatan — karena HPP akurat." />
    </Sequence>
    <Sequence from={1050} durationInFrames={150}><TaglineScene format={format} /></Sequence>
    {/* 47–57s: Price + CTA */}
    <Sequence from={1200} durationInFrames={180}><PriceScene format={format} /></Sequence>
    <Sequence from={1380} durationInFrames={180}><CTAScene format={format} /></Sequence>
    {/* 57–60s: Logo end */}
    <Sequence from={1710} durationInFrames={90}> <LogoEndScene /></Sequence>
  </AbsoluteFill>
);
```

- [ ] **Step 2: Daftarkan di Root.tsx**

Tambahkan ke Root.tsx:

```tsx
import { VideoA60 } from './compositions/VideoA60';

// Di dalam RemotionRoot:
<Composition id="VideoA60-916" component={() => <VideoA60 format="9:16" />} width={1080} height={1920} fps={30} durationInFrames={1800} />
<Composition id="VideoA60-169" component={() => <VideoA60 format="16:9" />} width={1920} height={1080} fps={30} durationInFrames={1800} />
<Composition id="VideoA60-11"  component={() => <VideoA60 format="1:1" />}  width={1080} height={1080} fps={30} durationInFrames={1800} />
```

- [ ] **Step 3: Preview VideoA60-916, verifikasi semua scene timing**

- [ ] **Step 4: Commit**

```bash
git add src/compositions/VideoA60.tsx src/Root.tsx
git commit -m "feat: add VideoA60 composition (Pain→Solusi 60s)"
```

---

## Task 21: Composition — VideoB60

**Files:**
- Create: `src/compositions/VideoB60.tsx`

VideoB60 = 60s = 1800 frames. Feature Showcase — tidak ada pain/agitate, langsung fitur.

- [ ] **Step 1: Buat `src/compositions/VideoB60.tsx`**

```tsx
// src/compositions/VideoB60.tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { SolutionScene } from '../scenes/SolutionScene';
import { PurchaseScene } from '../scenes/PurchaseScene';
import { HPPScene } from '../scenes/HPPScene';
import { StockScene } from '../scenes/StockScene';
import { ReportScene } from '../scenes/ReportScene';
import { SalesScene } from '../scenes/SalesScene';
import { ShowcaseScene } from '../scenes/ShowcaseScene';
import { PriceScene } from '../scenes/PriceScene';
import { CTAScene } from '../scenes/CTAScene';
import { LogoEndScene } from '../scenes/LogoEndScene';
import { VideoFormat } from '../types';

interface VideoB60Props {
  format: VideoFormat;
}

export const VideoB60: React.FC<VideoB60Props> = ({ format }) => (
  <AbsoluteFill>
    {/* 0–4s: Intro */}
    <Sequence from={0}    durationInFrames={120}><SolutionScene format={format} /></Sequence>
    {/* 4–20s: HPP Flow (CORE — di depan) */}
    <Sequence from={120}  durationInFrames={240}>
      <PurchaseScene format={format} copy="Harga bahan baku naik? Catat pembelian baru —" />
    </Sequence>
    <Sequence from={360}  durationInFrames={240}>
      <HPPScene format={format} copy="— HPP semua menu langsung ikut update." />
    </Sequence>
    <Sequence from={600}  durationInFrames={210}>
      <StockScene format={format} copy="Stok bahan baku tercatat, ga perlu hitung manual." />
    </Sequence>
    {/* 27–47s: Fitur supporting */}
    <Sequence from={810}  durationInFrames={180}>
      <ReportScene format={format} copy="Profit harian, mingguan, bulanan — tinggal lihat." />
    </Sequence>
    <Sequence from={990}  durationInFrames={150}>
      <SalesScene format={format} copy="Catat penjualan cepat dari HP." />
    </Sequence>
    <Sequence from={1140} durationInFrames={120}>
      <ShowcaseScene
        format={format}
        screenshotSrc="/screenshots/laporan.png"
        label="Export PDF & Excel"
        copy="Export laporan kapan saja, kirim ke siapa saja."
      />
    </Sequence>
    {/* 47–57s: Price + CTA */}
    <Sequence from={1260} durationInFrames={180}><PriceScene format={format} /></Sequence>
    <Sequence from={1440} durationInFrames={270}><CTAScene format={format} /></Sequence>
    {/* 57–60s */}
    <Sequence from={1710} durationInFrames={90}><LogoEndScene /></Sequence>
  </AbsoluteFill>
);
```

- [ ] **Step 2: Daftarkan di Root.tsx**

```tsx
import { VideoB60 } from './compositions/VideoB60';

<Composition id="VideoB60-916" component={() => <VideoB60 format="9:16" />} width={1080} height={1920} fps={30} durationInFrames={1800} />
<Composition id="VideoB60-169" component={() => <VideoB60 format="16:9" />} width={1920} height={1080} fps={30} durationInFrames={1800} />
<Composition id="VideoB60-11"  component={() => <VideoB60 format="1:1" />}  width={1080} height={1080} fps={30} durationInFrames={1800} />
```

- [ ] **Step 3: Preview dan verifikasi**

- [ ] **Step 4: Commit**

```bash
git add src/compositions/VideoB60.tsx src/Root.tsx
git commit -m "feat: add VideoB60 composition (Feature Showcase 60s)"
```

---

## Task 22: Composition — VideoC60

**Files:**
- Create: `src/compositions/VideoC60.tsx`

VideoC60 = 60s = 1800 frames. Day-in-the-life story.

- [ ] **Step 1: Buat `src/compositions/VideoC60.tsx`**

```tsx
// src/compositions/VideoC60.tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { DayScene } from '../scenes/DayScene';
import { PurchaseScene } from '../scenes/PurchaseScene';
import { HPPScene } from '../scenes/HPPScene';
import { StockScene } from '../scenes/StockScene';
import { SalesScene } from '../scenes/SalesScene';
import { ReportScene } from '../scenes/ReportScene';
import { PriceScene } from '../scenes/PriceScene';
import { CTAScene } from '../scenes/CTAScene';
import { LogoEndScene } from '../scenes/LogoEndScene';
import { VideoFormat } from '../types';

interface VideoC60Props {
  format: VideoFormat;
}

export const VideoC60: React.FC<VideoC60Props> = ({ format }) => (
  <AbsoluteFill>
    {/* Pagi */}
    <Sequence from={0}    durationInFrames={180}>
      <DayScene format={format} timeOfDay="pagi" copy="Pagi. Beli bahan baku baru."
        screenshotSrc="/screenshots/pembelian.png" />
    </Sequence>
    <Sequence from={180}  durationInFrames={210}>
      <PurchaseScene format={format} copy="Catat harga beli — HPP langsung ikut berubah." />
    </Sequence>
    <Sequence from={390}  durationInFrames={210}>
      <HPPScene format={format} copy="HPP otomatis update. Semua menu." />
    </Sequence>
    <Sequence from={600}  durationInFrames={180}>
      <StockScene format={format} copy="Stok keliatan. Ga perlu tebak-tebakan." />
    </Sequence>
    <Sequence from={780}  durationInFrames={180}>
      <HPPScene format={format} copy="Masak, jual — HPP sudah terhitung." fromHPP={9200} toHPP={9200} />
    </Sequence>
    <Sequence from={960}  durationInFrames={180}>
      <SalesScene format={format} copy="Catat penjualan dalam detik." />
    </Sequence>
    {/* Sore */}
    <Sequence from={1140} durationInFrames={180}>
      <DayScene format={format} timeOfDay="sore" copy="Sore. Laporan sudah siap."
        screenshotSrc="/screenshots/laporan.png" />
    </Sequence>
    <Sequence from={1320} durationInFrames={150}>
      <ReportScene format={format} showBarChart copy="HPP akurat → profit jelas." />
    </Sequence>
    {/* Closing */}
    <Sequence from={1470} durationInFrames={120}>
      <PriceScene format={format} />
    </Sequence>
    <Sequence from={1590} durationInFrames={120}>
      <CTAScene format={format} />
    </Sequence>
    <Sequence from={1710} durationInFrames={90}>
      <LogoEndScene />
    </Sequence>
  </AbsoluteFill>
);
```

- [ ] **Step 2: Daftarkan di Root.tsx**

```tsx
import { VideoC60 } from './compositions/VideoC60';

<Composition id="VideoC60-916" component={() => <VideoC60 format="9:16" />} width={1080} height={1920} fps={30} durationInFrames={1800} />
<Composition id="VideoC60-169" component={() => <VideoC60 format="16:9" />} width={1920} height={1080} fps={30} durationInFrames={1800} />
<Composition id="VideoC60-11"  component={() => <VideoC60 format="1:1" />}  width={1080} height={1080} fps={30} durationInFrames={1800} />
```

- [ ] **Step 3: Preview dan verifikasi semua scene**

- [ ] **Step 4: Commit**

```bash
git add src/compositions/VideoC60.tsx src/Root.tsx
git commit -m "feat: add VideoC60 composition (Day-in-the-life 60s)"
```

---

## Task 23: Background Music

**Files:**
- Modify: `src/compositions/VideoA30.tsx` (uncomment Audio)
- Modify: `src/compositions/VideoA60.tsx`
- Modify: `src/compositions/VideoB60.tsx`
- Modify: `src/compositions/VideoC60.tsx`

- [ ] **Step 1: Download background music**

Cari di https://pixabay.com/music/ — filter: "warm", "acoustic", "upbeat". Download yang berdurasi minimal 2 menit.
Simpan ke: `/home/gbk/Project/tata-data-video/public/music/background.mp3`

- [ ] **Step 2: Aktifkan Audio di semua komposisi**

Di tiap file `src/compositions/Video*.tsx`, uncomment baris Audio dan sesuaikan volume:

```tsx
<Audio src="/music/background.mp3" volume={0.35} />
```

- [ ] **Step 3: Preview untuk cek volume balance dengan teks**

Volume 0.35 adalah titik awal — adjust jika terlalu keras atau pelan.

- [ ] **Step 4: Commit**

```bash
git add public/music/background.mp3 src/compositions/
git commit -m "feat: add background music to all compositions"
```

---

## Task 24: Render semua video

- [ ] **Step 1: Render test satu video dulu**

```bash
cd /home/gbk/Project/tata-data-video
npx remotion render src/index.ts VideoA30-916 out/VideoA30-916.mp4
```

Expected: file `out/VideoA30-916.mp4` terbuat, durasi 30 detik.

- [ ] **Step 2: Tonton dan verifikasi**

```bash
xdg-open out/VideoA30-916.mp4
```

Checklist:
- [ ] Semua scene muncul pada timing yang benar
- [ ] Teks terbaca jelas
- [ ] Animasi HPPCounter berjalan smooth
- [ ] Logo dan screenshots tampil
- [ ] Musik background terdengar (jika sudah ditambah)
- [ ] Fade out di akhir smooth

- [ ] **Step 3: Render semua 12 video**

```bash
mkdir -p out

# VideoA30
npx remotion render src/index.ts VideoA30-916 out/VideoA30-916.mp4
npx remotion render src/index.ts VideoA30-169 out/VideoA30-169.mp4
npx remotion render src/index.ts VideoA30-11  out/VideoA30-11.mp4

# VideoA60
npx remotion render src/index.ts VideoA60-916 out/VideoA60-916.mp4
npx remotion render src/index.ts VideoA60-169 out/VideoA60-169.mp4
npx remotion render src/index.ts VideoA60-11  out/VideoA60-11.mp4

# VideoB60
npx remotion render src/index.ts VideoB60-916 out/VideoB60-916.mp4
npx remotion render src/index.ts VideoB60-169 out/VideoB60-169.mp4
npx remotion render src/index.ts VideoB60-11  out/VideoB60-11.mp4

# VideoC60
npx remotion render src/index.ts VideoC60-916 out/VideoC60-916.mp4
npx remotion render src/index.ts VideoC60-169 out/VideoC60-169.mp4
npx remotion render src/index.ts VideoC60-11  out/VideoC60-11.mp4
```

- [ ] **Step 4: Commit final**

```bash
echo "out/" >> .gitignore  # jangan commit video binary
git add .gitignore
git commit -m "chore: add out/ to gitignore, all 12 videos rendered"
```

---

## Spec Coverage Check

| Requirement | Task |
|-------------|------|
| Warm Cream style (#F4EDE0, rempah) | Task 6 (SpiceFloat), semua scene |
| 4 komposisi (A30, A60, B60, C60) | Task 19–22 |
| 3 format per komposisi (9:16, 16:9, 1:1) | Task 19–22 (Root.tsx) |
| Benang merah: pembelian→HPP→stok | Task 12–14 (PurchaseScene, HPPScene, StockScene) |
| HPPCounter animasi | Task 8 |
| AppScreen dengan frame HP/browser | Task 7 |
| Musik background | Task 23 |
| Fraunces + Plus Jakarta Sans | Task 2 (tokens.ts) |
| Assets dicopy dari sumber | Task 3 |
| Rp 175.000 bayar sekali | Task 16 (PriceScene) |
| CTA "Mulai Rapikan Bisnis Saya" | Task 16 (CTAScene) |
