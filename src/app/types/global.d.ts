declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  import { type ReactElement, type SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.png' {
  const value: any;
  export = value
}

declare module '*.jpg' {
  const value: any;
  export = value
}

declare const __PROJECT__: 'frontend' | 'storybook';
declare const __IS_DEV__: boolean;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

declare namespace NodeJS {
	interface ProcessEnv {
		readonly API_KEY: string;
		readonly CURRENCY_API_KEY: string;
		readonly CURRENCY_LINK: string;
		readonly CONVERTER_LINK: string;

		readonly FIREBASE_API_KEY: string;
		readonly FIREBASE_AUTH_DOMAIN: string;
		readonly FIREBASE_PROJECT_ID: string;
		readonly FIREBASE_STORAGE_BUCKET: string;
		readonly FIREBASE_MESAGGING_SENDER_ID: string;
		readonly FIREBASE_APP_ID: string;
		readonly FIREBASE_MEASUREMENT_ID: string;
	}
}