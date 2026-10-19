"use client";

import { useState } from "react";
import { AccountGroup } from "./AccountGroup";

export interface AccountAccordionItem {
  /** 묶음을 구분하는 값 (예: "groom") */
  key: string;
  /** 묶음 제목 (예: "신랑측 계좌") */
  title: string;
  /** 펼쳤을 때 보여줄 계좌 줄 (`AccountRow`) */
  content: React.ReactNode;
}

export interface AccountAccordionProps {
  items: AccountAccordionItem[];
  className?: string;
}

/** 계좌 묶음들. 처음에는 모두 닫혀 있고, 한 묶음을 열면 다른 묶음은 닫힌다. */
export function AccountAccordion({ items, className }: AccountAccordionProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className={className}>
      {items.map(({ key, title, content }) => (
        <AccountGroup
          key={key}
          title={title}
          isOpen={openKey === key}
          onToggle={() => setOpenKey((prev) => (prev === key ? null : key))}
        >
          {content}
        </AccountGroup>
      ))}
    </div>
  );
}
