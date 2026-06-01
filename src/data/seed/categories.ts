import { nanoid } from 'nanoid';

export const CAT_THAN_SO_HOC = nanoid();
export const CAT_MBTI = nanoid();
export const CAT_TRAC_NGHIEM_NGHE = nanoid();

// Backward compat aliases — old seed files import these names
export const CAT_TRI_TUE = CAT_MBTI;
export const CAT_NGHE_NGHIEP = CAT_TRAC_NGHIEM_NGHE;

export const categoriesData = [
  {
    id: CAT_THAN_SO_HOC,
    name: 'Thần số học',
    slug: 'than-so-hoc',
    description: 'Bói tình yêu, tình duyên và đặt tên cho bé theo thần số học.',
    iconUrl: null,
    displayOrder: 1,
    isActive: true,
    createdAt: Date.now(),
  },
  {
    id: CAT_MBTI,
    name: 'MBTI Quiz',
    slug: 'mbti-quiz',
    description: 'Trắc nghiệm IQ, EQ, CQ, AQ, SQ, PQ, MBTI và DISC để khám phá trí tuệ & tính cách.',
    iconUrl: null,
    displayOrder: 2,
    isActive: true,
    createdAt: Date.now(),
  },
  {
    id: CAT_TRAC_NGHIEM_NGHE,
    name: 'Trắc nghiệm nghề',
    slug: 'trac-nghiem-nghe',
    description: 'Tìm hiểu xu hướng nghề nghiệp, sức khỏe tâm lý, Big Five và đa trí tuệ MI.',
    iconUrl: null,
    displayOrder: 3,
    isActive: true,
    createdAt: Date.now(),
  },
];

export const LOOKUP_TOOLS = [
  {
    slug: 'boi-tinh-yeu',
    name: 'Bói Tình Yêu',
    lookupType: 'LOVE_COMPATIBILITY' as const,
    categoryId: CAT_THAN_SO_HOC,
    description: 'Xem độ hợp tình yêu giữa hai người theo thần số học.',
  },
  {
    slug: 'boi-tinh-duyen',
    name: 'Bói Tình Duyên',
    lookupType: 'LOVE_COMPATIBILITY' as const,
    categoryId: CAT_THAN_SO_HOC,
    description: 'Phân tích mức độ thấu hiểu và gắn kết lâu dài giữa hai người.',
  },
  {
    slug: 'dat-ten-con',
    name: 'Đặt Tên Con',
    lookupType: 'BABY_NAMING' as const,
    categoryId: CAT_THAN_SO_HOC,
    description: 'Phân tích điểm phong thủy thần số học cho tên của bé.',
  },
];
