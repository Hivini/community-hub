import { writable } from 'svelte/store';

let isLogged = writable(false);

export { isLogged };
