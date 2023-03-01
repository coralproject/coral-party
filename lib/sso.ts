import jwt from "jsonwebtoken";

export interface SSOUser {
  id: string;
  username: string;
  email: string;
  role?: string;
}

export interface SSOConfig {
  secret: string;
  users: SSOUser[];
}

export const getSSOConfig = (): SSOConfig => {
  const rawConfig = process.env.SSO_CONFIG || "";
  const enabled = process.env.SSO_ENABLED === "true" ?? false;

  if (!enabled) {
    return {
      secret: "",
      users: [],
    };
  }

  if (!rawConfig || rawConfig.trim() === "") {
    return {
      secret: "",
      users: [],
    };
  }

  try {
    const config = JSON.parse(rawConfig) as SSOConfig;
    if (!config) {
      return {
        secret: "",
        users: [],
      };
    }

    return config;
  } catch {
    return {
      secret: "",
      users: [],
    };
  }
};

interface SSOTokenParams {
  jti: string;
  user: {
    id: string;
    email: string;
    username: string;
    role?: string;
  };
  iat: number;
  exp: number;
}

export const createSSOToken = (secret: string, params: SSOTokenParams) => {
  const payload = {
    jti: params.jti,
    iat: params.iat,
    exp: params.exp,
    user: params.user,
  };

  const token = jwt.sign(payload, secret);

  return {
    token,
    payload,
  };
};
