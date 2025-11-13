export interface SettingsUser {
  id: number;
  uuid: string;
  isPublicWords: boolean; // 🔹 Les mots du user sont publics ?
  showOthersWords: boolean; // 🔹 Peut voir les mots publics des autres ?
  createdAt?: Date;
  updatedAt?: Date;
  userId: number; // 🔹 FK vers User.id
}
