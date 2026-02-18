## Currently in Development
**Branch:** main  
**Commit:** Merge pull request #2 from FlamingoLindo/front-end  
**Description:** Front end  
**Commit ID:** `7b2b5b7`  
[View Branch](https://github.com/FlamingoLindo/Chatingo/tree/main) | [View Commit](https://github.com/FlamingoLindo/Chatingo/commit/7b2b5b767225ff3e4437c09b115ecf031b67d7ce)
---

# Tauri + SvelteKit + TypeScript

**Disclaimer.:** Color schema will change I'm just leaving black, white, and red because its easier for me to see any changes this way

<https://github.com/user-attachments/assets/c1aa1adc-e1b2-414a-92cd-4c42f181ee41>

## About Chatingo

Chatingo is a Twitch chat client built as a desktop application using Svelte and Tauri. The project aims to provide an enhanced chat experience with rich emote support and customizable features.

### Current Development Status

This project is currently in **early development** with focus on the **front-end implementation**. There is no real integration with Twitch yet - the UI and components are being built and refined before connecting to live Twitch services.

### Features in Development

- **Multi-channel Support**: Interface for managing and switching between multiple Twitch channels
- **Emote menu**: Support for multiple emote providers including:
  - Twitch native emotes (global and subscriber)
  - 7TV emotes
- **Chat Interface**: Message display, input handling, and user interaction
- **Video Player**: Integrated Twitch video player component
- **User Cards**: User profile and information display

### API Integration (Planned)

The project is designed to work with multiple APIs:

#### REST APIs

- **Twitch API**: For channel information, user data, and authentication

#### GraphQL APIs

- **7TV GraphQL**: For emote search, user emote sets, and real-time emote updates

The API layer is structured with:

- DTOs (Data Transfer Objects) for type-safe API responses
- Service layers for abstracting API calls
- Error handling for API failures
- Emote caching and management systems

## Code Examples

### Type-Safe DTOs

The project uses TypeScript interfaces to ensure type safety across the application:

```typescript
export interface ITwitch {
    myUser: MyUser
}

export interface IChannel {
    id: number
    channel: string
    isLive: boolean
    newMessages: boolean
    isSelected: boolean
    messages: IMessage[]
}

export interface IMessage {
    time: string
    sender: ISender
    content: string
}

export interface ISender {
    badges: string[]
    username: string
    color: string
}
```

### GraphQL Query Example

Fetching 7TV emotes using GraphQL:

```typescript
const query = `
    query GetUserEmotesByUsername($query: String!) {
        search {
            all(query: $query, page: 1, perPage: 1) {
                users {
                    items {
                        id
                        mainConnection {
                            platformDisplayName
                        }
                        style {
                            activeEmoteSet {
                                id
                                name
                                emotes {
                                    items {
                                        emote {
                                            id
                                            images {
                                                url
                                            }
                                            flags {
                                                animated
                                            }
                                        }
                                        alias
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const response = await the7tvEmotesApi.get7tvEmotes(query, { query: username });
```

### API Service Layer

The API layer abstracts network calls and error handling:

```typescript
class The7TvEmotesApi {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async get7tvEmotes(query: string, variables: Record<string, any>): Promise<The7TvAPIResponse> {
        const config: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            })
        };

        const response = await fetch(this.apiUrl, config);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}

export const the7tvEmotesApi = new The7TvEmotesApi(The7TV_API_ENDPOINT);
```

### Svelte Component Example

Components use Svelte 5's runes for reactive state management:

```svelte
<script lang="ts">
  import type { The7TvAPIResponse, EmotesItem } from '$lib/apis/DTO/emotes/7tv.dto';
  import { browser } from '$app/environment';

  let { data }: { data: { emotesPromise: Promise<The7TvAPIResponse> } } = $props();
  let isOpen: boolean = $state(true);
  let hoveredEmote: EmotesItem | null = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  function getEmoteUrl(emote: EmotesItem, size: 1 | 2 | 3 | 4): string {
    const animated = emote.emote.flags?.animated;
    const sizeStr = `${size}x`;
    const suffix = animated ? '.webp' : '_static.webp';
    const pattern = `${sizeStr}${suffix}`;

    const matchingImage = emote.emote.images.find((img) =>
      img.url.includes(pattern)
    );

    return matchingImage?.url || emote.emote.images[0]?.url || '';
  }
</script>
```
