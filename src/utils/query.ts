export function createQueryString<
  T extends { [key: string]: string | number | undefined }
>(params: T): string {
  const qs = '?';

  if (Object.keys(params).length === 0) return '';

  return Object.keys(params).reduce((acc: string, key: string, i: number) => {
    if (!params[key]) return acc;

    return acc + `${i !== 0 ? '&' : ''}${key}=${params[key]}`;
  }, qs);
}
