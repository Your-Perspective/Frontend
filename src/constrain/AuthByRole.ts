import { decodeJwtToken } from "@/constrain/decodeJwtToken";

export interface RoleProps {
  token?: string | null;
  role?: Array<
    | "ADMIN"
    | "AUTHOR"
    | "author:delete"
    | "author:read"
    | "author:update"
    | "author:write"
  >;
}

export interface AuthResult {
  isAuthorized: boolean;
  loading: boolean;
  error: boolean;
}

export async function GetAuthByRoles({
  role,
  token,
}: RoleProps): Promise<AuthResult> {
  let result: AuthResult = {
    isAuthorized: false,
    loading: true,
    error: false,
  };

  if (!role || !token) {
    result.loading = false;
    result.error = true;
    return result;
  }

  try {
    const decodedToken = decodeJwtToken(token);

    if (decodedToken && decodedToken.scope) {
      result.isAuthorized =
        role.some((r) => decodedToken.scope.includes(r)) &&
        decodedToken.verify_by_admin;
    }
    
    if (!result.isAuthorized) {
      result.error = true;
    }
  } catch (e) {
    result.error = true;
  } finally {
    result.loading = false;
  }

  return result;
}
