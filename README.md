# المساعد الذكي - Arabic AI Voice Assistant

![Arabic AI Assistant](https://img.shields.io/badge/Arabic-AI%20Assistant-green)
![Ollama Compatible](https://img.shields.io/badge/Ollama-Compatible-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Bilingual](https://img.shields.io/badge/Arabic%2FEnglish-Bilingual-purple)

## 🌟 World's First Arabic-First AI Voice Assistant

**المساعد الذكي (Smart Assistant)** is a revolutionary AI assistant designed specifically for Arabic users, with natural voice interaction in both Arabic and English, universal Ollama compatibility, and intelligent file management.

## ✨ Key Features

### 🎤 **Advanced Voice Interaction**
- **Native Arabic Speech Recognition** - Understands Modern Standard Arabic and dialects
- **Bilingual Commands** - Switch seamlessly between Arabic and English
- **Wake Word Activation** - "مرحبا" or "Hello smart assistant"
- **Mixed Language Support** - Natural code-switching

### 🤖 **Universal AI Compatibility**
- **Works with ANY Ollama Model** - Llama2, Mistral, Qwen, CodeLlama, custom models
- **Model-Agnostic System** - Same behavior regardless of selected model
- **Automatic Capability Detection** - Optimizes for each model's strengths
- **Cross-Model Consistency** - Maintain personality across model changes

### 🎭 **AI Role Management**
- **File Manager Specialist** - Focuses on file operations only
- **Personal Assistant** - Comprehensive task management
- **Research Helper** - Academic and professional research
- **Custom Roles** - Create your own AI personality

### 🧠 **Learning & Personalization**
- **Adaptive Learning** - Learns your patterns and preferences
- **Memory System** - Remembers your files and habits
- **Personalized Greetings** - Time-aware and context-rich
- **Growth Capabilities** - Gets better over time

### 🔒 **Enterprise Security**
- **Multi-Modal Authentication** - Password, voice biometrics, PIN
- **Privilege Levels** - Read-only, modify, system, admin access
- **Local Processing** - All data stays on your PC
- **Audit Logging** - Complete security tracking

### 📁 **Intelligent File Management**
- **Natural Language Search** - "أظهر لي ملفات PDF من هذا الشهر"
- **Content Search** - Search inside documents (PDF, Word, etc.)
- **Arabic File Support** - Full Arabic filename and content handling
- **Unlimited Access** - Any drive, cloud storage, archives

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **Ollama** installed locally
- **FFmpeg** for audio processing
- **Microphone and speakers**

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/al-musaed-al-dhaki.git
cd al-musaed-al-dhaki

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start Ollama (if not running)
ollama serve
ollama pull llama2:7b

# Start the application
npm run dev

# Open in browser
open http://localhost:3000
