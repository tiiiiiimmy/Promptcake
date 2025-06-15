#!/bin/bash

# Install dependencies
npm install

# Install additional dependencies
npm install @tailwindcss/forms

# Build the project
npm run build

echo "Setup completed! You can now load the extension in Chrome." 