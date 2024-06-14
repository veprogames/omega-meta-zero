import { writable } from "svelte/store";
import { Game } from "./game/game";

export const game = writable(new Game());