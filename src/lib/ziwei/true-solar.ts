/**
 * Giờ mặt trời thật — hiệu chỉnh chi giờ sinh theo kinh độ nơi sinh.
 * Việt Nam dùng một múi giờ UTC+7 (kinh tuyến chuẩn 105°Đ) cho toàn quốc,
 * nên giờ đồng hồ và giờ mặt trời thật lệch nhau vài chục phút tùy nơi sinh,
 * đủ để đẩy giờ sinh gần biên qua canh giờ khác.
 */

const REFERENCE_LONGITUDE = 105;

/** Giờ đồng hồ (0-23) + phút + kinh độ nơi sinh → chi giờ thật (0=Tý...11=Hợi) */
export function calcTrueSolarBranch(clockHour: number, clockMinute: number, longitude: number): number {
  const clockMins = clockHour * 60 + clockMinute;
  const offset = (longitude - REFERENCE_LONGITUDE) * 4;
  const solar = ((clockMins + offset) % 1440 + 1440) % 1440;
  if (solar >= 1380 || solar < 60) return 0;
  return Math.floor((solar - 60) / 120) + 1;
}

/**
 * Quy tắc tý thời sớm/muộn: 23:00-23:59 là "tý thời muộn", lập số theo ngày kế tiếp.
 * 00:00-00:59 là "tý thời sớm", lập số theo ngày hiện tại.
 */
export function shiftDateForLateZi(dateStr: string, clockHour: number): string {
  if (clockHour !== 23) return dateStr;
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function resolveBirthHour(options: {
  branch: string | undefined;
  branchList: readonly string[];
  clockTime: string | undefined;
  longitude: number;
  dateStr: string;
}): { hourIndex: number; dateStr: string } {
  const { branch, branchList, clockTime, longitude, dateStr } = options;
  if (clockTime) {
    const [hourText, minuteText] = clockTime.split(':');
    const clockHour = Number(hourText) || 0;
    const clockMinute = Number(minuteText) || 0;
    return {
      hourIndex: calcTrueSolarBranch(clockHour, clockMinute, longitude),
      dateStr: shiftDateForLateZi(dateStr, clockHour),
    };
  }
  const idx = branchList.indexOf(branch || 'Tý');
  return { hourIndex: idx >= 0 ? idx : 0, dateStr };
}
