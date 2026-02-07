import { Conversation, GlobalConfig } from '@interfaces';

export const globalConfigLocalKey = 'GLOBAL_CONFIG_LOCAL';
export const localConversationKey = 'LOCAL_CONVERSATION';

// Updated model list
export const supportedModels = [
  'grok-4.1-fast-reasoning',
  'gemini-2.5-flash',
] as const;

export type SupportedModel = (typeof supportedModels)[number];

// Updated default model to one of the new supported models
export const defaultModel: SupportedModel = 'grok-4.1-fast-reasoning';

export const supportedImageModels = [
  'DALL-E',
  'Midjourney',
  'Replicate',
] as const;

export type SupportedImageModels = (typeof supportedImageModels)[number];

export const defaultImageModel: SupportedImageModels = 'DALL-E';

// From https://platform.openai.com/docs/api-reference/images/create
export const supportedImgSizes = ['256x256', '512x512', '1024x1024'] as const;

export type SupportedImgSize = (typeof supportedImgSizes)[number];

export const supportedLanguages = [
  {
    label: '简体中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
];

export const layoutConfig = ['full', 'loose', 'default'] as const;

export type LayoutConfig = (typeof layoutConfig)[number];

export const defaultLayoutConfig: LayoutConfig = 'default';

export const defaultGloablConfig: GlobalConfig = {
  password: '',
  openAIApiKey: '',
  model: defaultModel,
  imageModel: defaultImageModel,
  save: true,
  continuous: true,
  messagesCount: 4,
  temperature: 1,
  imagesCount: 1,
  imageSize: '256x256',
  lang: 'en',
  discordChannelId: '',
  discordServerId: '',
  discordToken: '',
  layout: defaultLayoutConfig,
};

export const defaultConversation: Conversation = {
  id: '1',
  title: '',
  messages: [],
  mode: 'text',
  createdAt: Date.now(),
};

export const midjourneyConfigs = {
  timeout: 5 * 60 * 1000, // 5min
  interval: 20 * 1000, // every 20 second
};
