import { writable } from 'svelte/store';

let isLogged = writable(false);
let loginVerified = writable(false);

export { isLogged, loginVerified };
