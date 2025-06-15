# PromptCake

PromptCake is a Chrome extension designed to help individual users organize, reuse, and translate their ChatGPT prompts more efficiently. It enables structured prompt creation by separating instructions from reference materials and provides tools for saving, managing, and translating prompts for higher-quality AI responses.

## Features

- 🎯 Structured prompt creation and management
- 🔄 Easy prompt reuse and organization
- 🌐 Multi-language translation support
- 📦 Efficient prompt storage and retrieval
- 🎨 Modern, intuitive user interface
- ⚡ Fast and responsive performance

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Chrome browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/promptcake.git
cd promptcake
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory from the project

## Project Structure

```
promptcake/
├── src/
│   ├── components/         # UI components
│   ├── pages/             # Extension pages
│   ├── services/          # Business logic
│   ├── store/             # State management
│   ├── utils/             # Helper functions
│   └── types/             # TypeScript definitions
├── public/                # Static assets
└── manifest.json          # Chrome extension manifest
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
