import { TokenResponse } from "./token-response.interface";
import { UserResponse } from "./user-response.interface";


export interface AuthResponse {
  user: UserResponse;
  tokens: TokenResponse;
}
