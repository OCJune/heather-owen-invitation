import { notFound } from "next/navigation";
import { AccountGroup } from "@/features/gift/ui/AccountGroup";
import { AccountRow } from "@/features/gift/ui/AccountRow";
import { GuestbookMessage } from "@/features/guestbook/ui/GuestbookMessage";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Chip } from "@/shared/ui/Chip/Chip";
import { ChipGroup } from "@/shared/ui/Chip/ChipGroup";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Input } from "@/shared/ui/Input/Input";
import { Textarea } from "@/shared/ui/Input/Textarea";
import { LanguageToggle } from "@/shared/ui/LanguageToggle/LanguageToggle";
import { PhotoSlot } from "@/shared/ui/PhotoSlot/PhotoSlot";
import { SectionHeader } from "@/shared/ui/SectionHeader/SectionHeader";
import { SummaryRow } from "@/shared/ui/SummaryRow/SummaryRow";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="typo-label-strong text-tertiary">{title}</h2>
      {children}
    </section>
  );
}

/** 공용 UI 컴포넌트 테스트 페이지. 개발 환경에서만 열린다. */
export default function TestPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto flex w-full max-w-invitation flex-col gap-12 px-gutter py-12">
      <Block title="Icon">
        <div className="flex items-center gap-4 text-icon-primary">
          <Icon name="close" />
          <Icon name="arrow-right" />
          <span className="flex bg-inverse text-on-inverse">
            <Icon name="check" size={18} />
          </span>
        </div>
      </Block>

      <Block title="Button">
        <Button showIcon className="w-full">
          참석 의사 전달하기
        </Button>
        <Button variant="secondary" showIcon className="w-full">
          참석 의사 전달하기
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1">
            전체 보기
          </Button>
          <Button className="flex-1">메시지 남기기</Button>
        </div>
      </Block>

      <Block title="Chip (하나만 선택)">
        <ChipGroup index="01" label="어느 쪽 하객이신가요?">
          <Chip name="side" value="groom" defaultChecked>
            신랑측
          </Chip>
          <Chip name="side" value="bride">
            신부측
          </Chip>
        </ChipGroup>
        <ChipGroup index="02" label="참석 여부">
          <Chip name="attendance" value="yes" defaultChecked>
            참석할게요
          </Chip>
          <Chip name="attendance" value="no">
            어려워요
          </Chip>
        </ChipGroup>
      </Block>

      <Block title="Checkbox">
        <Checkbox>개인정보 수집 · 이용 동의</Checkbox>
        <Checkbox defaultChecked>개인정보 수집 · 이용 동의</Checkbox>
      </Block>

      <Block title="Input">
        <Input index="01" label="성함" placeholder="성함을 입력해 주세요" />
        <Textarea
          index="02"
          label="메시지"
          placeholder="두 사람에게 전할 축하의 말을 적어주세요."
          maxLength={200}
        />
        <Input placeholder="비밀번호" type="password" />
      </Block>

      <Block title="Language Toggle">
        <div className="flex gap-6">
          <LanguageToggle
            active="ko"
            hrefs={{ ko: "/ko/test", en: "/en/test" }}
          />
          <LanguageToggle
            active="en"
            hrefs={{ ko: "/ko/test", en: "/en/test" }}
          />
        </div>
      </Block>

      <Block title="Badge">
        <div className="flex items-center gap-2">
          <Badge>7</Badge>
          <Badge>간선</Badge>
          <Badge>P2</Badge>
        </div>
      </Block>

      <Block title="Photo Slot">
        <div className="flex gap-4">
          <PhotoSlot className="h-53 flex-1" sizeHint="160 × 212" />
          <PhotoSlot
            shape="arch"
            className="h-53 flex-1"
            sizeHint="160 × 212"
          />
        </div>
      </Block>

      <Block title="Section Header">
        <SectionHeader
          number="No. 01"
          title="Invitation"
          subtitle="초대의 글"
        />
        <div className="bg-inverse p-4">
          <SectionHeader
            theme="dark"
            number="No. 02"
            title="The Day"
            subtitle="예식 일시"
          />
        </div>
      </Block>

      <Block title="Summary Row">
        <div className="border-t border-strong">
          <SummaryRow label="COUPLE">신랑 이종찬 · 신부 임현지</SummaryRow>
          <SummaryRow label="DATE">2027. 2. 20 (토) 오후 1:00</SummaryRow>
          <SummaryRow label="VENUE">테라리움서울 · 서울온천 7–8층</SummaryRow>
        </div>
      </Block>

      <Block title="Guestbook Message (features/guestbook)">
        <div className="border-t border-strong">
          <GuestbookMessage name="홍길동" date="02.10">
            결혼 진심으로 축하해! 지금처럼 서로에게 가장 든든한 편이 되어주길.
          </GuestbookMessage>
        </div>
      </Block>

      <Block title="Account Group · Account Row (features/gift)">
        <div className="border-t border-strong">
          <AccountGroup title="신랑측 계좌" defaultOpen>
            <AccountRow holder="신랑 이종찬" account="국민 000000-00-000000" />
            <AccountRow holder="부 이규장" account="신한 000-000-000000" />
            <AccountRow holder="모 전경자" account="농협 000-0000-0000-00" />
          </AccountGroup>
          <AccountGroup title="신부측 계좌">
            <AccountRow holder="신부 임현지" account="우리 0000-000-000000" />
          </AccountGroup>
        </div>
      </Block>
    </main>
  );
}
