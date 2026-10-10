import type { Dictionary } from "./ko";

export const en: Dictionary = {
  meta: {
    title: "Jongchan & Hyunji are getting married",
    description: "Saturday, February 20, 2027 · 1:00 PM · Terrarium Seoul",
  },
  common: {
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    photo: "Photo",
  },
  cover: {
    eyebrow: "THE WEDDING OF",
    date: "2027. 02. 20  SAT",
    time: "1:00 PM",
    venue: "Terrarium Seoul",
    venueDetail: "Nowon-gu, Seoul · 7–8F",
  },
  invitation: {
    number: "No. 01",
    title: "Invitation",
    subtitle: undefined,
    message:
      "At the end of winter,\nas spring begins to blossom,\nwe promise to become\neach other's life companion.\n\nWe hope to take our first step\nsurrounded by those who have\nalways cared for us — your presence\nwould be our greatest joy.",
    family: [
      {
        role: "GROOM",
        name: "Jongchan",
        nameNote: undefined,
        parents: "Son of\nKyujang Lee & Kyungja Jeon",
      },
      {
        role: "BRIDE",
        name: "Hyunji",
        nameNote: "(Heather)",
        parents: "Daughter of\nGunhyuk Lim & Junghoon Jung",
      },
    ],
  },
  theDay: {
    number: "No. 02",
    title: "The Day",
    subtitle: undefined,
    timeLine: "Saturday, 1:00 PM",
    fullDate: "Saturday, February 20, 2027 · 1:00 PM",
  },
  gallery: {
    number: "No. 03",
    title: "Gallery",
    subtitle: undefined,
    more: "View more",
    allTitle: "Gallery",
    allCount: "{count} photos",
    prev: "PREV",
    next: "NEXT",
    swipeHint: "Swipe to browse",
    openPhoto: "Open photo {index}",
    loading: "Loading photos",
  },
  location: {
    number: "No. 04",
    title: "Location",
    subtitle: undefined,
    venue: "Terrarium Seoul",
    address: "7–8F Seoul Oncheon Bldg.\n247 Nowon-ro, Nowon-gu, Seoul",
    addressCopy: "7–8F Seoul Oncheon Bldg., 247 Nowon-ro, Nowon-gu, Seoul",
    tel: "Tel. 02-6316-7700",
    copyAddress: "Copy address",
    mapLabel: "MAP",
    mapLinks: [
      { id: "naver", label: "Naver Map" },
      { id: "kakao", label: "Kakao Map" },
      { id: "google", label: "Google Maps" },
    ],
    directions: [
      {
        key: "SHUTTLE",
        label: "Shuttle",
        lines: [
          { type: "strong", badge: "7", text: "Hagye Stn. Exit 2" },
          {
            type: "note",
            text: "Board in front of Mugunghwa Pharmacy,\n150m from the exit · runs frequently all day",
          },
        ],
      },
      {
        key: "SUBWAY",
        label: "Subway",
        lines: [
          { type: "strong", badge: "7", text: "Hagye Stn. Exit 2" },
          {
            type: "note",
            text: "300m toward Nowon Fire Station, ~10 min walk",
          },
        ],
      },
      {
        key: "BUS",
        label: "Bus",
        lines: [
          {
            type: "note",
            text: "Get off at Seoul Oncheon, Hagye 1-dong Community Center, Golmaeul Park or Daejin High School stop",
          },
          { type: "item", badge: "Trunk", text: "100" },
          { type: "item", badge: "Branch", text: "1132 · 1141 · 1221 · 1224" },
        ],
      },
      {
        key: "CAR",
        label: "Car",
        lines: [
          {
            type: "strong",
            text: "Search “Terrarium Seoul” or “Seoul Oncheon”",
          },
          { type: "note", text: "247 Nowon-ro, Nowon-gu, Seoul" },
        ],
      },
      {
        key: "PARKING",
        label: "Parking",
        lines: [
          { type: "strong", text: "Free for 2 hours · 700 spaces" },
          { type: "item", badge: "P2", text: "Daejin High School lot" },
          { type: "item", badge: "P3", text: "Yongdong Elementary lot" },
          { type: "item", badge: "P4", text: "Hagye Techno Town lot" },
          {
            type: "note",
            text: "P2 and P4 are the most convenient.\nParking staff are at the 1F main entrance.",
          },
        ],
      },
    ],
  },
  rsvp: {
    eyebrow: "R.S.V.P.",
    cardTitle: "Will you join us?",
    cardBody:
      "So we can welcome each of you properly,\nplease let us know if you can attend.",
    open: "Send RSVP",
    notice: {
      title: "Kindly\nRSVP",
      body: "There's no pressure — just let us know.\nYour reply helps us prepare to welcome\nyou properly.",
      summary: [
        { label: "COUPLE", value: "Jongchan Lee &\nHyunji Lim (Heather)" },
        { label: "DATE", value: "Sat, Feb 20, 2027 · 1:00 PM" },
        { label: "VENUE", value: "Terrarium Seoul · 7–8F" },
      ],
      next: "Send RSVP",
      skipToday: "Don't show again today",
    },
    form: {
      title: "Your reply",
      side: {
        label: "Whose guest are you?",
        groom: "Groom's",
        bride: "Bride's",
      },
      attendance: {
        label: "Attendance",
        yes: "Joyfully accept",
        no: "Regretfully decline",
      },
      name: { label: "Full name", placeholder: "Enter your name" },
      phone: { label: "Phone", placeholder: "010-0000-0000" },
      consent: "I agree to the privacy policy",
      required: "*",
      consentMore: "Details",
      consentDetail:
        "Collected: name, phone, attendance\nPurpose: confirming and guiding wedding guests\nRetention: deleted within one month after the wedding",
      submit: "Send RSVP",
    },
    done: {
      title: "Thank you",
      body: "Your reply has been sent.\nWe look forward to welcoming you.",
      close: "Close",
    },
  },
  gift: {
    number: "No. 05",
    title: "With Heart",
    subtitle: undefined,
    intro:
      "For those who wish to send their blessings\nfrom afar, our account details are below.\nWe will treasure your kindness always.",
    groups: { groom: "Groom's side", bride: "Bride's side" },
  },
  guestbook: {
    number: "No. 06",
    title: "Guestbook",
    subtitle: undefined,
    intro: "Leave a few words for the two of us.",
    empty: "Be the first to leave a message.",
    viewAll: "View all",
    collapse: "Show less",
    write: "Leave a message",
    prevPage: "Previous page",
    nextPage: "Next page",
    deleteMessage: "Delete message",
    sheet: {
      title: "Guestbook",
      subtitle: "Leave a message",
      name: { label: "Name", placeholder: "Your name" },
      password: { label: "Password", placeholder: "4 digits" },
      message: {
        label: "Message",
        placeholder: "Write your wishes for the couple.",
      },
      note: "You'll need the password to delete your message.",
      submit: "Post",
    },
      error: "Something went wrong. Please try again shortly.",
    remove: {
      title: "Delete this message?",
      body: "Enter the password you used when posting.",
      placeholder: "Password",
      wrong: "The password doesn't match.",
      cancel: "Cancel",
      error: "Couldn't delete it. Please try again shortly.",
      confirm: "Delete",
    },
  },
  closing: {
    heading: "With gratitude,",
    body: "Thank you for celebrating our beginning.\nWe will cherish each other\nas much as we have been cherished.",
    sign: "Love, Jongchan & Hyunji (Heather)",
    shareKakao: "Share on KakaoTalk",
    copyLink: "Copy link",
    footerDate: "2027. 02. 20",
  },
};
