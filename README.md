# Heather & Owen Invitation

모바일 청첩장 프론트엔드 프로젝트입니다. 한국어 / 영어 두 가지 버전을 제공합니다.

## 1. 개발 환경

### 주요 기술 스택

| 카테고리      | 기술                                            |
| ------------- | ----------------------------------------------- |
| 코어 · 빌드   | Next.js 16 (App Router), React 19, TypeScript 5 |
| 스타일 · UI   | Tailwind CSS 4                                  |
| 서버 상태     | TanStack Query 5                                |
| 코드 품질     | ESLint 9 (`eslint-config-next`), Prettier 3     |
| 패키지 매니저 | pnpm                                            |

> ⚠️ Next.js 16은 이전 버전과 API · 컨벤션이 다를 수 있습니다. 코드를 작성하기 전에 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 확인합니다. ([AGENTS.md](AGENTS.md) 참고)

### 필요 버전

- **Node.js**: `>= 20.9.0`
- **pnpm**: `11.21.0` (`package.json`의 `packageManager` 기준)

corepack을 사용하면 프로젝트에 지정된 pnpm 버전을 자동으로 맞출 수 있습니다.

```bash
corepack enable
```

### 패키지 설치

```bash
pnpm install
```

### 환경 변수

아직 사용하는 환경 변수가 없습니다. 추가할 때는 프로젝트 루트의 `.env.local`에 작성하고(`.env*`는 Git에 커밋하지 않습니다), 이 섹션에 변수명과 용도를 함께 기록합니다.

### 실행 및 빌드 스크립트

```bash
# 개발 서버 실행 (http://localhost:3000)
pnpm dev

# 타입 체크 및 프로덕션 빌드
pnpm build

# 빌드 결과물 실행
pnpm start

# ESLint 린트 검사
pnpm lint

# Prettier 포맷 적용 / 검사만
pnpm format
pnpm format:check
```

---

## 2. 폴더 구조

본 프로젝트는 소규모 개발에 맞춘 **경량화된 FSD(Feature-Sliced Design)** 아키텍처를 따릅니다. 레이어 간 의존성은 **`app` → `features` → `shared`** (상위 → 하위) 단방향으로만 흐릅니다.

```
src/
├── app/                  # Next.js App Router — 전역 설정 + 라우팅 (FSD의 app · pages 레이어 역할)
│   ├── [locale]/         # 언어별 경로 (ko, en)
│   │   ├── layout.tsx    # 루트 레이아웃 (<html lang>, 글꼴, 메타데이터)
│   │   ├── page.tsx      # 청첩장 본문: features의 섹션을 순서대로 조립
│   │   └── test/page.tsx # 공용 UI 테스트 페이지 (개발 환경 전용)
│   ├── fonts.ts          # 글꼴 불러오기 (Cormorant Garamond, Noto Serif KR, Noto Sans KR)
│   ├── providers.tsx     # 전역 Provider (TanStack Query)
│   └── globals.css       # Tailwind 진입점 + styles/ 토큰 import
├── features/             # 청첩장 섹션 · 기능 단위 (ui / api / lib / model)
│   ├── cover/            # 커버 (이름, 메인 사진, 일시 · 장소, 언어 전환)
│   ├── invitation/       # 초대의 글, 혼주 표
│   ├── the-day/          # 예식 일시, D-day
│   ├── gallery/          # 사진첩, 전체 보기, 크게 보기
│   ├── location/         # 오시는 길 (지도, 교통 안내)
│   ├── rsvp/             # 참석 의사 전달 (안내 모달 → 폼 모달)
│   ├── gift/             # 마음 전하실 곳 (계좌 안내)
│   ├── guestbook/        # 방명록 (목록, 작성, 삭제)
│   └── closing/          # 마무리 인사, 공유
├── shared/               # 공용 모듈 (도메인 비의존)
│   ├── ui/               # 공용 UI 컴포넌트 (아래 표 참고)
│   ├── hooks/            # 공용 훅 (useCopy)
│   ├── lib/              # 공통 유틸리티 (cn, getQueryClient)
│   ├── i18n/             # 언어별 문구 사전 (ko.ts, en.ts, getDictionary)
│   ├── config/           # 언어와 무관한 예식 정보 (날짜, 영문 이름 등)
│   ├── assets/           # 공용 에셋 (icons, images)
│   └── types/            # 전역 공통 타입
└── styles/               # 디자인 토큰 CSS (color.css, typography.css, spacing.css)
public/                   # 정적 파일 (OG 이미지, 파비콘 등 URL로 직접 제공되는 파일)
```

### 경로

| 경로                   | 설명                                              |
| ---------------------- | ------------------------------------------------- |
| `/`                    | 한국어 청첩장 (`next.config.ts`에서 `/ko`로 연결) |
| `/en`                  | 영어 청첩장                                       |
| `/ko/test`, `/en/test` | 공용 UI 테스트 페이지 (개발 환경 전용)            |

### 예시 데이터 (노션 연동 전)

사진 · 방명록 · 참석 의사는 아직 서버에 연결되어 있지 않고, 각 feature의 `api/`에 있는 **예시 구현**으로 동작합니다. 연동할 때는 함수의 모양(인자 · 반환값)은 그대로 두고 안쪽만 바꿉니다.

| 파일                                     | 지금 동작                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| `features/gallery/api/photos.ts`         | 사진 없는 자리 21개를 12개씩 나눠 돌려줌 (회색 자리 표시로 보임)        |
| `features/guestbook/api/guestbookApi.ts` | 처음에는 비어 있음. 작성 · 삭제는 화면에만 반영되고 새로고침하면 사라짐 |
| `features/rsvp/api/rsvpApi.ts`           | 아무 데도 저장하지 않고 완료 화면만 보여줌                              |

### 레이어 규칙

| 레이어     | 역할                                    | import 할 수 있는 대상         |
| ---------- | --------------------------------------- | ------------------------------ |
| `app`      | 라우팅, 전역 설정, 섹션 조립            | `features`, `shared`, `styles` |
| `features` | 섹션 · 기능 단위의 UI와 로직            | `shared`                       |
| `shared`   | 어떤 섹션에도 의존하지 않는 재사용 코드 | (다른 레이어 import 금지)      |

- **feature끼리는 서로 import 하지 않습니다.** 두 곳 이상에서 필요해지면 `shared`로 내립니다.
- `src/app`에는 Next.js 파일 컨벤션(`layout`, `page`, `route` 등)만 두고, 화면 구현은 `features`에 둡니다.
- feature 내부 세그먼트는 필요한 것만 만듭니다.

| 세그먼트 | 내용                                     |
| -------- | ---------------------------------------- |
| `ui/`    | 컴포넌트                                 |
| `api/`   | 서버 통신 함수                           |
| `lib/`   | 해당 feature 전용 유틸리티 · 상수 · 문구 |
| `model/` | 상태, 타입, 훅 (복잡해질 때만)           |

> 경량화를 위해 `widgets` · `entities` 레이어와 slice별 `index.ts`(Public API)는 두지 않습니다. 프로젝트가 커져 필요해지면 그때 추가합니다.

### 공용 UI 컴포넌트

Figma의 🧩 Components · 🔣 Icons 페이지와 1:1로 맞춥니다. `pnpm dev` 실행 후 [`/ko/test`](http://localhost:3000/ko/test)에서 한눈에 확인할 수 있습니다. (프로덕션 빌드에서는 404)

| Figma 컴포넌트             | 코드                                          | 비고                                                 |
| -------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| Icon/\*                    | `shared/ui/Icon/Icon.tsx`                     | `name`으로 선택, 글자색(`text-*`)을 따름             |
| Button                     | `shared/ui/Button/Button.tsx`                 | `variant`: primary / secondary, `showIcon`           |
| Chip                       | `shared/ui/Chip/Chip.tsx`, `ChipGroup.tsx`    | 하나만 고르는 라디오 버튼. 같은 묶음은 `name`을 같게 |
| Checkbox                   | `shared/ui/Checkbox/Checkbox.tsx`             | 실제 `<input type="checkbox">`를 감쌈                |
| Input                      | `shared/ui/Input/Input.tsx`, `Textarea.tsx`   | `index`, `label`, 글자 수 표시(`maxLength`)          |
| Language Toggle            | `shared/ui/LanguageToggle/LanguageToggle.tsx` | `active`, `hrefs`                                    |
| Badge                      | `shared/ui/Badge/Badge.tsx`                   |                                                      |
| Photo Slot                 | `shared/ui/PhotoSlot/PhotoSlot.tsx`           | `shape`: rect / arch, 사진은 children으로            |
| Section Header             | `shared/ui/SectionHeader/SectionHeader.tsx`   | `theme`: light / dark                                |
| Summary Row                | `shared/ui/SummaryRow/SummaryRow.tsx`         |                                                      |
| Guestbook Message          | `features/guestbook/ui/GuestbookMessage.tsx`  | 방명록에서만 쓰므로 feature에 둠                     |
| Account Row                | `features/gift/ui/AccountRow.tsx`             | 계좌 안내에서만 쓰므로 feature에 둠                  |
| Account 펼치기 (계좌 묶음) | `features/gift/ui/AccountGroup.tsx`           | 제목 줄을 눌러 여닫음 (+ / −)                        |

- 모달은 `shared/ui/Modal/Modal.tsx`를 씁니다. `variant`로 가운데 창(`center`) · 아래에서 올라오는 창(`sheet`) · 전체 화면(`full`)을 고릅니다.
- 아이콘을 추가할 때는 Figma에서 내보낸 SVG를 `shared/assets/icons/`에 넣고 `Icon.tsx`의 `ICONS`에 등록합니다.

---

## 3. 개발 가이드

### 브랜치 전략 및 워크플로우

**이슈 기반 워크플로우**를 따릅니다. 1인 소규모 프로젝트이므로 `main` 단일 브랜치를 기준으로 합니다.

- **`main`**: 기본 브랜치이자 배포 브랜치 (모든 작업물이 병합되는 기준 브랜치)

#### 작업 워크플로우

1. **이슈 생성**: 작업 시작 전 GitHub Issues에서 [이슈 템플릿](.github/ISSUE_TEMPLATE)을 사용해 이슈를 생성하고 **이슈 번호**를 발급받습니다.
2. **브랜치 생성**: `main` 브랜치에서 이슈 번호를 포함한 작업 브랜치를 생성합니다.
3. **작업 및 PR**: 작업 완료 후 `main`을 대상(base)으로 PR을 생성하고 머지합니다.

#### 브랜치 명명 규칙

`브랜치타입/#이슈번호-작업내용` 형식으로 작성합니다. (**이슈 번호 필수**)

| 접두사      | 용도                     | 예시                          |
| ----------- | ------------------------ | ----------------------------- |
| `feat/`     | 신규 기능 개발           | `feat/#12-guestbook-section`  |
| `fix/`      | 버그 수정                | `fix/#34-rsvp-modal-scroll`   |
| `refactor/` | 기능 변경 없는 코드 개선 | `refactor/#56-section-header` |
| `docs/`     | 문서 수정                | `docs/#78-update-readme`      |
| `chore/`    | 기타 설정 및 단순 작업   | `chore/#90-setup-fonts`       |

### Git 커밋 컨벤션 (Commit Message)

커밋 메시지는 작업의 성격을 한눈에 알 수 있도록 아래의 태그를 사용합니다.

- **형식**: `태그: 설명`
- **예시**: `feat: 방명록 작성 바텀시트 추가`
- 설명은 한국어로, 무엇을 했는지 한 줄로 작성합니다. 끝에 마침표를 붙이지 않습니다.
- 하나의 커밋에는 하나의 목적만 담습니다.

| **태그**     | **설명**                          |
| :----------- | :-------------------------------- |
| **feat**     | 새로운 기능 추가                  |
| **fix**      | 버그 수정                         |
| **refactor** | 기능 변경 없는 코드 수정/리팩토링 |
| **chore**    | 빌드 설정, 의존성 업데이트 등     |
| **docs**     | 문서 수정 (README, 주석 등)       |
| **test**     | 테스트 코드 추가 및 수정          |

### 이슈 컨벤션 (Issue)

[이슈 템플릿](.github/ISSUE_TEMPLATE)에 맞춰 작성합니다. 제목은 템플릿이 붙여주는 태그로 시작합니다.

| 템플릿          | 제목 태그    | 라벨          |
| --------------- | ------------ | ------------- |
| Feature Request | `[FEAT]`     | `Feature ✨`  |
| Bug Report      | `[BUG]`      | `Fix 🐜`      |
| Refactoring     | `[REFACTOR]` | `Refactor 🛠️` |
| Documentation   | `[DOCS]`     | `Docs 📃`     |
| Chore           | `[CHORE]`    | `Chore 🧹`    |

### PR 컨벤션 (Pull Request)

PR은 [PR 템플릿](.github/pull_request_template.md)에 맞춰 작성합니다.

- **제목**: `[FEAT]`, `[FIX]`, `[REFACTOR]`, `[DOCS]`, `[CHORE]` 태그로 시작합니다.
  - 예시: `[FEAT] 방명록 섹션 및 메시지 작성 기능 구현`
- **본문 구성**

| 섹션                     | 내용                                                            |
| ------------------------ | --------------------------------------------------------------- |
| 📸 작업 내용             | 작업한 내용을 두괄식으로 작성                                   |
| 🎞️ 주요 코드 설명        | 설명이 필요한 코드 위주로 작성 (없으면 생략)                    |
| 🖥️ 구현화면              | 모바일 뷰포트 캡처 첨부 (문구 변경 시 KO / EN 모두)             |
| ✅ 체크리스트            | `pnpm format:check`, `pnpm lint`, `pnpm build`, Figma 비교 확인 |
| 🔗 연결된 이슈           | `Connected: #이슈번호` 형식으로 작성                            |
| 📚 참고자료              | 있으면 작성, 없으면 제목까지 삭제                               |
| 💬 기타 더 이야기해볼 점 | 있으면 작성, 없으면 제목까지 삭제                               |

### 코드 컨벤션

#### 네이밍

| 대상                       | 규칙                      | 예시                             |
| -------------------------- | ------------------------- | -------------------------------- |
| feature 폴더               | kebab-case                | `the-day/`, `guestbook/`         |
| 컴포넌트 파일 · 이름       | PascalCase                | `GuestbookSection.tsx`, `Button` |
| 공용 UI 폴더               | 컴포넌트명 폴더 안에 파일 | `shared/ui/Button/Button.tsx`    |
| 훅                         | `use` + camelCase         | `useModal.ts`                    |
| 유틸 · API 파일            | camelCase                 | `date.ts`, `guestbookApi.ts`     |
| 상수                       | UPPER_SNAKE_CASE          | `MESSAGE_MAX_LENGTH`             |
| Props 타입                 | `컴포넌트명Props`         | `ButtonProps`                    |
| 이벤트 핸들러 / 콜백 Props | `handle~` / `on~`         | `handleSubmit`, `onClose`        |
| 불리언                     | `is~`, `has~`, `can~`     | `isOpen`                         |

#### 컴포넌트

- **함수 선언문 + named export**로 작성합니다. (`export function Button() {}`)
  - 예외: Next.js 파일 컨벤션(`page.tsx`, `layout.tsx` 등)은 `export default`를 사용합니다.
- Props는 `interface`로 선언하고 컴포넌트와 함께 export 합니다. 유니온 · 유틸리티 타입은 `type`을 사용합니다.
- 타입만 가져올 때는 `import type`을 사용합니다.
- **기본은 Server Component**입니다. 상태 · 이벤트 · 브라우저 API가 필요한 컴포넌트에만 파일 최상단에 `"use client"`를 선언하고, 그 범위를 가능한 한 작게 유지합니다.
- 이미지는 `next/image`를 사용합니다. 글꼴은 `src/app/fonts.ts`에서만 불러옵니다. (영문은 `next/font`, 한글은 `@fontsource` 패키지)
- 컴포넌트 · 훅 · 함수의 의도가 코드만으로 드러나지 않을 때 JSDoc 주석(한국어)을 답니다.

```tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

/** 공용 버튼. primary는 먹색 채움, secondary는 외곽선. */
export function Button({
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} {...props} />;
}
```

#### import

- 레이어를 넘나드는 import는 **`@/` 절대 경로**(`@/*` → `src/*`)를 사용합니다.
- 같은 feature · 같은 폴더 안에서는 상대 경로를 사용합니다.
- slice별 `index.ts`를 두지 않으므로 **파일 경로를 직접** import 합니다.

```tsx
import { Button } from "@/shared/ui/Button/Button";
import { GuestbookMessage } from "./GuestbookMessage";
```

#### 스타일

- Tailwind CSS 유틸리티 클래스를 사용하고, 색상 · 글꼴은 **`src/styles/`의 디자인 토큰**만 사용합니다. 임의 색상값(`text-[#141414]`)을 직접 쓰지 않습니다.
- 토큰 이름은 Figma 변수 · 텍스트 스타일과 맞춥니다. Tailwind 기본 색상 팔레트(`bg-red-500` 등)는 꺼 두었습니다.
- 모바일 폭 390px 기준으로 구현합니다.

| 종류          | Figma                                   | 코드 (Tailwind 클래스)                            | 선언 위치               |
| ------------- | --------------------------------------- | ------------------------------------------------- | ----------------------- |
| 배경색        | `color/bg/page`                         | `bg-page`                                         | `styles/color.css`      |
| 글자색        | `color/text/primary`                    | `text-primary`                                    | `styles/color.css`      |
| 테두리색      | `color/border/strong`                   | `border-strong`                                   | `styles/color.css`      |
| 아이콘색      | `color/icon/primary`                    | `text-icon-primary`                               | `styles/color.css`      |
| 텍스트 스타일 | `Heading/Section EN`                    | `typo-heading-section-en`                         | `styles/typography.css` |
| 글꼴          | Cormorant / 명조 / 고딕                 | `font-display` / `font-serif` / `font-sans`       | `styles/typography.css` |
| 간격          | `spacing/16` (px)                       | `p-4`, `gap-4` (px ÷ 4)                           | Tailwind 기본 간격      |
| 레이아웃      | `layout/gutter` · `section-y` · `width` | `px-gutter` · `py-section-y` · `max-w-invitation` | `styles/spacing.css`    |

- 글자는 `typo-*` 클래스로 글꼴 · 크기 · 줄 간격 · 자간을 한 번에 지정하고, 색은 `text-*`로 따로 줍니다.

```tsx
<h2 className="typo-heading-section-en text-primary">Invitation</h2>
```

#### 서버 데이터 (TanStack Query)

- 서버에서 가져오는 데이터는 TanStack Query로 다룹니다. 쿼리 설정(`queryKey`, `queryFn`)은 feature의 `api/`에 `~QueryOptions` 함수로 두고, 서버와 브라우저가 같은 설정을 씁니다. (예: `features/gallery/api/photoQueries.ts`)
- 첫 화면에 필요한 데이터는 Server Component에서 미리 가져와 `HydrationBoundary`로 넘깁니다. `QueryClient`는 `getQueryClient()`(`shared/lib/queryClient.ts`)로 얻습니다.

```tsx
// Server Component
const queryClient = getQueryClient();
await queryClient.prefetchInfiniteQuery(photosInfiniteQueryOptions());

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <GalleryBoard />
  </HydrationBoundary>
);
```

```tsx
// Client Component
const { data, fetchNextPage } = useSuspenseInfiniteQuery(
  photosInfiniteQueryOptions(),
);
```

#### 문구 (KO / EN)

- 화면에 보이는 문구는 컴포넌트에 직접 쓰지 않고 언어별 사전(`src/shared/i18n/ko.ts`, `en.ts`)에서 가져옵니다. 문구를 추가 · 수정할 때는 KO / EN을 함께 수정합니다.
- 사전의 모양은 한국어 사전(`ko.ts`)이 기준입니다. 영어 사전에 빠진 항목이 있으면 타입 오류가 납니다.
- 섹션 컴포넌트는 사전에서 자기 부분만 `dict`로 받습니다. (예: `<CoverSection dict={dict.cover} />`)

#### 포맷

- 포맷은 **Prettier**가 맡습니다. 규칙은 [.prettierrc.json](.prettierrc.json)에 있습니다: 들여쓰기 2칸, 큰따옴표(`"`), 세미콜론, trailing comma, 한 줄 80자.
- ESLint의 포맷 관련 규칙은 `eslint-config-prettier`로 꺼 두었으므로, 포맷은 Prettier · 코드 품질은 ESLint가 담당합니다.
- 커밋 전에 `pnpm format`과 `pnpm lint`를 통과시킵니다.
