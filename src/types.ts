export type BearState = "idle" | "happy" | "shy" | "love" | "reading" | "surprise" | "sleep";
export type GestureType = "Open_Palm" | "Thumb_Up" | "Pointing_Up" | "Victory" | "ILoveYou" | "Closed_Fist" | "None";

export type SecretMessage = {
  id: string;
  gesture: GestureType;
  state: BearState;
  variants: string[];
};

export type FinalSecret = {
  state: BearState[];
  message: string;
};

export type AppMode = 'soul' | 'heart' | 'sparkle' | 'dream';
