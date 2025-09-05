import { jwtDecode, JwtPayload } from "jwt-decode";

export function decode(accessToken: string) {
  try {
    return jwtDecode<JwtPayload & { role: string }>(accessToken);
  } catch (error: unknown) {
    console.error("Failed to decode JWT:", error);
    return { role: "anon" } as JwtPayload & { role: string };
  }
}
