export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
}

export function getInitial(name: string): string {
  return name.charAt(0);
}

export function getProgressPercent(registered?: number, capacity?: number): number {
  if (!registered || !capacity) return 0;
  return Math.round((registered / capacity) * 100);
}
