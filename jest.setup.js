// jest.setup.js
// Polyfill para TextEncoder y TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// jest.setup.js
import '@testing-library/jest-dom';
