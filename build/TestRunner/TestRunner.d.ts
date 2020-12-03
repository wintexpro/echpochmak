import Mocha from 'mocha';
import { testConfig } from '../config/config';
export declare const TestRun: (config: testConfig) => Promise<void>;
export declare const SetTestGlobal: (config: testConfig) => void;
export declare const restart: (port?: number) => Promise<void>;
export declare const CreateMocha: (config: testConfig) => Mocha;
