import { exec } from "shelljs";

export const silentExec = (command: string) => {
  exec(command, { silent: true });
};
