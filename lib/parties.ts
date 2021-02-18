import { modes, versions } from "../parties.yaml";

export interface Party {
  version: string;
  mode: string;
}

export function getPartySlug({ version, mode }: Party): string {
  return `/parties/${version}/${mode.toLowerCase().replace(/_/g, "-")}/`;
}

export function getPartyParams({ version, mode }: Party): Party {
  return {
    version,
    mode: mode.toLowerCase().replace(/_/g, "-"),
  };
}

export function getAllPartyModes(): string[] {
  return modes.sort((a: string, b: string) => a.localeCompare(b));
}

export function getAllPartyVersions(): string[] {
  return versions.sort((a: string, b: string) => b.localeCompare(a));
}

export function getAllParties(): Party[] {
  const parties: Party[] = [];

  for (const version of versions) {
    for (const mode of modes) {
      parties.push({ version, mode });
    }
  }

  return parties;
}
