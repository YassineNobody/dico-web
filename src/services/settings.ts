import type { SettingsUser } from "../interfaces/settings/settings";
import { api, ContentType } from "./api";

async function getSettingsUser() {
  return await api.get<SettingsUser>(ContentType.SETTINGS_USER);
}

async function setVisibility() {
  return await api.patch<SettingsUser>(
    ContentType.SETTINGS_USER,
    "/visibility"
  );
}

async function setShowOther() {
  return await api.patch<SettingsUser>(
    ContentType.SETTINGS_USER,
    "/show-other"
  );
}

async function resetAll() {
  return await api.patch<SettingsUser>(ContentType.SETTINGS_USER, "/reset");
}

export default {
  getSettingsUser,
  setVisibility,
  setShowOther,
  resetAll,
};
