// Standalone dev entry — not used by federation
import { mount } from './expose';

const el = document.getElementById('app');
if (el) mount(el);
