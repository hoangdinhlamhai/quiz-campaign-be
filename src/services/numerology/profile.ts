import type { NumerologyProfile, NumerologyCoreNumber, NumerologyLifeCycle, NumerologyPersonalYear, NumerologyDimension, NumerologyCareerGroup } from '@/types';
import { calculateLifePath, calculateNameNumber, reduceNumber, hashSeed, calcMaturity, calcBalance } from './calc';
import { getNumInfo, CYCLE_NAMES, PERSONAL_YEAR_TITLES, CAREER_GROUPS } from './interpretations';

function calcPersonalYear(birthDate: string, year: number): number {
  const [, m, d] = birthDate.split('-').map(Number);
  return reduceNumber((m || 1) + (d || 1) + reduceNumber(year));
}

function buildCoreNumbers(name: string, birthDate: string): NumerologyCoreNumber[] {
  const lp = calculateLifePath(birthDate);
  const dest = calculateNameNumber(name, 'all');
  const soul = calculateNameNumber(name, 'vowels');
  const pers = calculateNameNumber(name, 'consonants');
  const mat = calcMaturity(lp, dest);
  const bal = calcBalance(name);

  const entries: Array<{ key: string; label: string; value: number }> = [
    { key: 'lifePath', label: 'Số Chủ Đạo', value: lp },
    { key: 'destiny', label: 'Số Sứ Mệnh', value: dest },
    { key: 'soul', label: 'Số Linh Hồn', value: soul },
    { key: 'personality', label: 'Số Thái Độ', value: pers },
    { key: 'maturity', label: 'Số Trưởng Thành', value: mat },
    { key: 'balance', label: 'Số Cân Bằng', value: bal },
  ];

  return entries.map((e) => {
    const info = getNumInfo(e.value);
    return { ...e, keywords: info.keywords, description: info.desc };
  });
}

function buildLifeCycles(birthDate: string, name: string): NumerologyLifeCycle[] {
  const [yearStr, mStr, dStr] = birthDate.split('-');
  const birthYear = Number(yearStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const lp = calculateLifePath(birthDate);

  const c1End = 36 - lp;
  const c2End = c1End + 9;
  const nums = [reduceNumber(m), reduceNumber(d), reduceNumber(birthYear)];

  return CYCLE_NAMES.map((cName, i) => {
    const num = nums[i];
    const info = getNumInfo(num);
    const startAge = i === 0 ? 0 : i === 1 ? c1End + 1 : c2End + 1;
    const endAge = i === 0 ? c1End : i === 1 ? c2End : 99;
    return {
      number: num,
      name: cName,
      label: `Chu kỳ ${i + 1}`,
      ageRange: i === 0 ? `Đầu đời - ${endAge} tuổi` : i === 2 ? `${startAge} tuổi về sau` : `${startAge} - ${endAge} tuổi`,
      yearRange: `(${birthYear + startAge} - ${birthYear + endAge})`,
      linkedNumber: num,
      description: `Giai đoạn ${cName}: ${info.desc}`,
      opportunities: info.keywords.slice(0, 2).map((k) => `Phát triển khả năng ${k.toLowerCase()}`),
      challenges: [info.weakness],
      advice: `${info.strength}. Hãy tận dụng giai đoạn này để phát triển bản thân.`,
    };
  });
}

function buildPersonalYears(birthDate: string): NumerologyPersonalYear[] {
  const now = new Date().getFullYear();
  return [0, 1, 2].map((offset) => {
    const year = now + offset;
    const num = calcPersonalYear(birthDate, year);
    const info = getNumInfo(num);
    const title = PERSONAL_YEAR_TITLES[num] || `NĂM SỐ ${num}`;
    return {
      year,
      number: num,
      title: `Năm Cá Nhân Số ${num}: ${title}`,
      description: info.desc,
      career: `Năm thuận lợi cho các lĩnh vực ${info.career.join(', ')}.`,
      love: num <= 3 ? 'Năm tốt để khởi đầu mối quan hệ mới.' : num <= 6 ? 'Năm tập trung vào ổn định tình cảm.' : 'Năm để nhìn lại và làm sâu sắc tình cảm.',
      challenge: info.weakness,
      advice: info.keywords.map((k) => `${k}: Hãy phát huy thế mạnh này.`),
      mantra: `"Tôi ${info.keywords[0].toLowerCase()} và sẵn sàng đón nhận mọi cơ hội."`,
    };
  });
}

function buildCareerGroups(name: string, birthDate: string, seed: number): { top: NumerologyCareerGroup[]; caution: NumerologyCareerGroup[] } {
  const lp = calculateLifePath(birthDate);
  const dest = calculateNameNumber(name, 'all');
  const info = getNumInfo(lp);

  // Deterministic distribution from seed + numbers
  const raw = CAREER_GROUPS.map((g, i) => {
    const base = ((lp * 7 + dest * 3 + seed + i * 13) % 25) + 5;
    return { name: g, percent: base };
  });
  const total = raw.reduce((s, r) => s + r.percent, 0);
  const normalized = raw.map((r) => ({ ...r, percent: Math.round((r.percent / total) * 100) }));
  normalized.sort((a, b) => b.percent - a.percent);

  return { top: normalized.slice(0, 3), caution: normalized.slice(3) };
}

function buildDimensions(name: string, birthDate: string, seed: number): NumerologyDimension[] {
  const labels = [
    'Mạnh mẽ - Độc lập - Tự tin',
    'Lắng nghe - Khéo léo - Nhạy cảm',
    'Sáng tạo - Hoạt bát - Lạc quan',
    'Cẩn thận - Cầu toàn - Thực tế',
    'Năng động - Linh hoạt - Tò mò',
    'Quan tâm - Yêu thương - Kiểm soát',
    'Thông thái - Khám phá - Truyền đạt',
    'Công bằng - Tập trung - Lý tưởng',
    'Trách nhiệm - Rộng lượng - Hào phóng',
  ];
  const lp = calculateLifePath(birthDate);
  const dest = calculateNameNumber(name, 'all');
  return labels.map((label, i) => ({
    label: `${i + 1}. ${label}`,
    percent: Math.min(35, ((lp * 11 + dest * 7 + seed + i * 17) % 30) + 3),
  }));
}

export function calculateProfile(name: string, birthDate: string): NumerologyProfile {
  const seed = hashSeed(`${name}${birthDate}`);
  const lp = calculateLifePath(birthDate);
  const info = getNumInfo(lp);
  const coreNumbers = buildCoreNumbers(name, birthDate);
  const { top, caution } = buildCareerGroups(name, birthDate, seed);

  return {
    name,
    birthDate,
    coreNumbers,
    traits: {
      strengths: info.keywords.map((k) => `${k} — ${info.desc.slice(0, 40)}`),
      weaknesses: [info.weakness],
      advice: `${info.strength}. Hãy học cách cam kết và hoàn thành những gì bạn bắt đầu.`,
    },
    lifeCycles: buildLifeCycles(birthDate, name),
    personalYears: buildPersonalYears(birthDate),
    topCareerGroups: top,
    cautionCareerGroups: caution,
    dimensions: buildDimensions(name, birthDate, seed),
    summary: `Với năng lượng cốt lõi của Số Chủ Đạo ${lp}, ${info.desc} Con đường bạn cần đi, được thể hiện qua Số Sứ Mệnh ${coreNumbers[1].value}, là ${getNumInfo(coreNumbers[1].value).desc}`,
  };
}
