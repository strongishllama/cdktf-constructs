export function suffix(): string {
  let suffix = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 6; i++) {
    suffix += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return suffix;
}
