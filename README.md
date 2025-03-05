<div align="center">
  <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60" alt="React" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="60" alt="TypeScript" />
    <img src="https://vitejs.dev/logo.svg" width="60" alt="Vite" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" width="60" alt="AWS" />
  </div>

# Modern Enigma Machine Simulator
</div>


## Overview

This project is a fully interactive, web-based simulation of the World War II-era Enigma encryption machine, built with modern web technologies. It provides an authentic recreation of the original machine's mechanics while offering a sleek, user-friendly interface.

## Features

- **Authentic Enigma Mechanics**
    - Accurate implementation of rotor mechanics and encryption algorithms
    - Support for multiple rotor configurations (I-V)
    - Three reflector options (A, B, C)
    - Configurable plugboard connections

- **Modern User Interface**
    - Real-time encryption/decryption
    - Interactive keyboard with visual feedback
    - Illuminated lampboard display
    - Live text display showing both input and encrypted output

- **Full Configuration Options**
    - Rotor selection and positioning
    - Ring settings
    - Initial rotor positions
    - Plugboard pair configurations
    - Reflector selection

## Technology Stack

- React 18.3.1
- TypeScript 5.6.2
- Tailwind CSS
- Vite

## Live Demo

[Try the Enigma Machine Simulator](your-deployment-link-here)

## How It Works

The Enigma Machine works by passing electrical signals through a series of rotating mechanical rotors, creating a complex polyalphabetic substitution cipher. Each keypress triggers the following sequence:

1. The right rotor rotates one position
2. Middle and left rotors rotate based on notch positions
3. The electrical signal passes through:
    - Plugboard (forward)
    - Rotors (forward)
    - Reflector
    - Rotors (backward)
    - Plugboard (backward)

This creates a unique encryption/decryption system where each letter is encoded differently based on the current rotor positions.

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/enigma-simulator.git

# Navigate to project directory
cd enigma-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. **Configure the Machine**
    - Select rotors and their positions
    - Set ring settings
    - Configure plugboard connections
    - Choose a reflector

2. **Start Encoding**
    - Type using your keyboard or click the on-screen keys
    - Watch the lampboard illuminate with encoded letters
    - View both original and encoded text in the display panel
