type Tokens = {
    idToken: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  };
  
  let tokens: Tokens = {
    idToken: null,
    accessToken: null,
    refreshToken: null,
  };
  
  try {
    const TOKEN_URL = import.meta.env.VITE_TOKEN_URL;
  
    if (!TOKEN_URL) {
      throw new Error("AUTH_PARCEL_URL is not defined");
    }
  
    // 동적 모듈
    const { getTokens } = await import(/* @vite-ignore */ TOKEN_URL);
  
    // getTokens 호출 및 토큰 추출
    tokens = await getTokens();
  } catch (error) {
    console.error("Failed to retrieve tokens:", error);
  }
  
  export const { idToken, accessToken, refreshToken } = tokens;