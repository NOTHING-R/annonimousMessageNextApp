import { Message } from "@/models/User.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: true;
  messages?: Array<Message>;
}
