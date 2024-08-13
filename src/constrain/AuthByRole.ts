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
}

export async function GetAuthByRoles({
  role,
  token,
}: RoleProps): Promise<AuthResult> {
  let isAuthorized = false;
  let loading = false;

  if (token && role) {
    const decodedToken = await decodeJwtToken(token);
    loading = true;

    if (decodedToken && decodedToken.scope && role) {
      isAuthorized =
        role.some((r) => decodedToken.scope.includes(r)) &&
        decodedToken.verify_by_admin;
    }
  }

  if (isAuthorized) {
    loading = false;
  }

  return { isAuthorized, loading };
}
