![Banner Image](banner.png)

> [English version](./README.md) [中文版本](./README_zh.md)

> A curated, developer friendly learning path for building real-time voice AI agents from your first STT call to scaling production telephony.

Voice AI has moved from research demos into shipping product in under three years. **The modern stack is converging around a clear pattern**: a real-time transport layer (WebRTC or telephony), a streaming pipeline of speech-to-text → LLM → text-to-speech, and a turn-taking model that decides when the agent should speak. This list is structured to mirror that learning order  start with the foundations, pick a framework, then drill into individual components and production concerns.

Resources are tagged **🟢 Beginner**, **🟡 Intermediate**, or **🔴 Advanced**. Prefer free official docs and vendor-neutral guides; flag where authors have commercial interests.

---

## How to use this list

Read top-to-bottom if you're brand new. The recommended path:

1. **Foundations** → understand the pipeline and latency budget
2. **Frameworks** → pick one (LiveKit Agents or Pipecat are the safest open-source bets) and ship a hello-world
3. **Components** (STT, TTS, LLM, VAD, turn detection) → swap pieces to learn what each layer does
4. **Transport & telephony** → connect to a real phone number
5. **Evaluation, production, ethics** → make it safe enough to ship

---

## Table of contents

1. [Foundational concepts and learning paths](#1-foundational-concepts-and-learning-paths)
2. [Frameworks and orchestration platforms](#2-frameworks-and-orchestration-platforms)
3. [Speech-to-text (STT / ASR)](#3-speech-to-text-stt--asr)
4. [Text-to-speech (TTS)](#4-text-to-speech-tts)
5. [LLMs for voice and real-time AI](#5-llms-for-voice-and-real-time-ai)
6. [Voice activity detection and turn-taking](#6-voice-activity-detection-and-turn-taking)
7. [WebRTC fundamentals](#7-webrtc-fundamentals)
8. [Telephony and SIP](#8-telephony-and-sip)
9. [Tutorials and hands-on projects](#9-tutorials-and-hands-on-projects)
10. [GitHub starter repos and awesome lists](#10-github-starter-repos-and-awesome-lists)
11. [Datasets and benchmarks](#11-datasets-and-benchmarks)
12. [Beginner-accessible research papers](#12-beginner-accessible-research-papers)
13. [Evaluation and testing](#13-evaluation-and-testing)
14. [Production, deployment, and scaling](#14-production-deployment-and-scaling)
15. [Ethics, safety, and regulation](#15-ethics-safety-and-regulation)
16. [Blogs and newsletters](#16-blogs-and-newsletters)
17. [Podcasts](#17-podcasts)
18. [Communities](#18-communities)
19. [Conferences and events](#19-conferences-and-events)
20. [Hackathons and competitions](#20-hackathons-and-competitions)

---

## 1. Foundational concepts and learning paths

Start here. These resources establish the **mental model of the voice agent pipeline** and the latency budget you'll fight for the rest of your career.

- [Voice AI & Voice Agents  An Illustrated Primer](https://voiceaiandvoiceagents.com/)  Kwindla Hultman Kramer's free, regularly-updated long-form primer. The de facto textbook for the field. **🟢 Beginner**
- [Voice Agent Architecture: STT, LLM, and TTS Pipelines Explained (LiveKit)](https://livekit.com/blog/voice-agent-architecture-stt-llm-tts-pipelines-explained)  Visual walkthrough of streaming patterns, turn detection, and where latency accumulates. **🟢 Beginner**
- [Everything You Need to Know About Voice AI Agents (Deepgram)](https://deepgram.com/learn/everything-about-voice-ai-agents)  End-to-end primer covering feature extraction, ASR, LLM reasoning, and synthesis. **🟢 Beginner**
- [AI Voice Agents (LiveKit Docs)](https://docs.livekit.io/agents/voice-agent/)  The canonical "what is a voice agent" reference, covering pipeline vs multimodal and agent state. **🟢 Beginner**
- [Core Latency in AI Voice Agents (Twilio)](https://www.twilio.com/en-us/blog/developers/best-practices/guide-core-latency-ai-voice-agents)  Visual explanation of end-of-turn detection, silence thresholds, and smart endpointing. **🟢 Beginner**
- [Advice on Building Voice AI in June 2025 (Daily.co)](https://www.daily.co/blog/advice-on-building-voice-ai-in-june-2025/)  Practical P50/P95 latency-budget guidance from Pipecat's creators. **🟡 Intermediate**
- [How Intelligent Turn Detection Solves the Biggest Challenge in Voice Agents (AssemblyAI)](https://www.assemblyai.com/blog/turn-detection-endpointing-voice-agent)  Endpointing is the most underestimated problem; this is the clearest deep-dive. **🟡 Intermediate**

## 2. Frameworks and orchestration platforms

The frameworks below all let you wire STT, an LLM, and TTS together. **For open-source production work, LiveKit Agents and Pipecat are the two safest bets**; for managed dashboards, Vapi, Retell, and Bland win on time-to-first-call.

### Open-source frameworks
- [LiveKit Agents  Voice AI Quickstart](https://docs.livekit.io/agents/start/voice-ai/)  Working assistant in <10 min via Python or TypeScript, runs on top of WebRTC. **🟢 Beginner**
- [Pipecat  Quickstart](https://docs.pipecat.ai/getting-started/quickstart)  Scaffolds a Deepgram + OpenAI + Cartesia pipeline you can talk to in the browser in 5 minutes. **🟢 Beginner**
- [Ultravox (fixie-ai/ultravox)](https://github.com/fixie-ai/ultravox)  Open-weight multimodal speech LLM (Llama/Gemma/Qwen variants) that skips the separate ASR stage for ~150 ms TTFT. **🔴 Advanced**

### Managed platforms
- [Vapi  Quickstart](https://docs.vapi.ai/quickstart/introduction)  Dashboard-first; ship an agent on a free US phone number in under 5 minutes. **🟢 Beginner**
- [Retell AI  Introduction & Quickstart](https://docs.retellai.com/general/introduction)  Phone-agent platform with $10 free credit on signup. **🟢 Beginner**
- [Bland AI  Send Your First Phone Call](https://docs.bland.ai/tutorials/send-first-call)  Minimal API tutorial for placing your first AI phone call. **🟢 Beginner**
- [ElevenLabs Conversational AI  Quickstart](https://elevenlabs.io/docs/eleven-agents/quickstart)  Build and embed a voice agent widget on any website in 5 minutes. **🟢 Beginner**

### Realtime / speech-to-speech APIs
- [OpenAI Realtime API  Guide](https://platform.openai.com/docs/guides/realtime)  Official guide to `gpt-realtime` over WebRTC, WebSockets, or SIP. **🟡 Intermediate**
- [Google Gemini Live API  Overview](https://ai.google.dev/gemini-api/docs/live-api)  Low-latency, bidirectional voice + vision agents with barge-in and tool use. **🟡 Intermediate**
- [Twilio ConversationRelay](https://www.twilio.com/docs/voice/conversationrelay)  WebSocket bridge that handles STT/TTS so you focus on LLM logic; works with any LLM. **🟡 Intermediate**

### Vendor-neutral comparisons
- [Vapi vs Pipecat vs LiveKit (AssemblyAI)](https://www.assemblyai.com/blog/vapi-vs-pipecat-vs-livekit)  Architecture-focused comparison of pipeline control and transport choices. **🟡 Intermediate**
- [11 Voice Agent Platforms Compared (Softcery)](https://softcery.com/lab/choosing-the-right-voice-agent-platform-in-2025)  Broad market map with use-case recommendations. **🟢 Beginner**
- [Best Voice Agent Stack (Hamming AI)](https://hamming.ai/resources/best-voice-agent-stack)  Buy-vs-build framework with concrete cost, latency, and time-to-launch numbers. **🟡 Intermediate**

## 3. Speech-to-text (STT / ASR)

Pick **one streaming STT** and learn it deeply before shopping around. Deepgram, AssemblyAI, and Whisper-derivatives cover most use cases.

### Commercial APIs
- [Deepgram Nova-3  STT benchmarks](https://deepgram.com/learn/speech-to-text-benchmarks)  Primer on WER, latency, and cost alongside Deepgram's product reference. **🟢 Beginner**
- [AssemblyAI Universal-Streaming](https://www.assemblyai.com/blog/build-voice-agent-function-calling)  Streaming STT walkthrough that doubles as a function-calling tutorial. **🟡 Intermediate**
- [OpenAI Whisper / gpt-4o-transcribe API docs](https://platform.openai.com/docs/guides/speech-to-text)  Easiest cloud STT if you already use OpenAI. **🟢 Beginner**
- [Soniox multilingual benchmark](https://soniox.com/benchmarks)  Public WER comparison across 60 languages. **🟢 Beginner**
- [Cartesia Ink](https://docs.cartesia.ai/)  Streaming STT paired with Sonic TTS for a single-vendor low-latency stack. **🟢 Beginner**

### Open source
- [openai/whisper](https://github.com/openai/whisper)  The original repo and the de facto starting point for any DIY ASR project. **🟢 Beginner**
- [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper)  CTranslate2 reimplementation up to 4× faster with INT8; recommended for self-hosted Whisper. **🟡 Intermediate**
- [NVIDIA NeMo (Parakeet / Canary)](https://github.com/NVIDIA-NeMo/NeMo)  Top-of-leaderboard open ASR models with streaming inference recipes. **🔴 Advanced**
- [Moonshine](https://github.com/moonshine-ai/moonshine)  Tiny on-device ASR (~190 MB) optimized for live streaming on edge devices. **🟡 Intermediate**

### Benchmarks and explainers
- [Open ASR Leaderboard (HuggingFace)](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard)  Community leaderboard across 11 datasets  your reference for open-source picks. **🟢 Beginner**
- [Artificial Analysis  Speech-to-Text](https://artificialanalysis.ai/speech-to-text)  Independent leaderboard ranking 48+ STT providers by WER, speed, and cost. **🟢 Beginner**
- [Streaming vs Batch ASR (Arun Baby)](https://www.arunbaby.com/speech-tech/0001-streaming-asr/)  Engineer-friendly explainer of RNN-T and Conformer streaming architectures. **🟡 Intermediate**

## 4. Text-to-speech (TTS)

**Latency, not raw quality, is what kills voice agents**  prioritize providers offering true streaming with first-byte under 200 ms.

### Commercial APIs
- [ElevenLabs Docs](https://elevenlabs.io/docs)  Industry-leading quality, voice cloning, and Conversational AI in one SDK. **🟢 Beginner**
- [Cartesia Sonic Quickstart](https://docs.cartesia.ai/get-started/quickstart)  Sub-100 ms first-byte latency, designed specifically for voice agents. **🟢 Beginner**
- [Deepgram Aura](https://developers.deepgram.com/docs/tts-models)  Low-latency streaming TTS that pairs cleanly with Deepgram STT. **🟢 Beginner**
- [OpenAI TTS (gpt-4o-mini-tts)](https://platform.openai.com/docs/guides/text-to-speech)  Easiest plug-in TTS for the OpenAI stack. **🟢 Beginner**
- [Artificial Analysis  TTS leaderboard](https://artificialanalysis.ai/text-to-speech/models)  ELO, price, and speed comparison covering Rime, PlayHT, Hume, Inworld, and others. **🟢 Beginner**

### Open source
- [Coqui TTS (idiap fork)](https://github.com/idiap/coqui-ai-TTS)  Maintained fork of Coqui-TTS / XTTS v2; the most battle-tested OSS TTS toolkit. **🟡 Intermediate**
- [Piper (OHF-Voice/piper1-gpl)](https://github.com/OHF-Voice/piper1-gpl)  Fast local neural TTS optimized for Raspberry Pi; perfect for offline projects. **🟢 Beginner**
- [Kokoro 82M](https://github.com/hexgrad/kokoro)  Tiny Apache-licensed model that tops community ELO arenas; runs on CPU. **🟢 Beginner**
- [F5-TTS](https://github.com/SWivid/F5-TTS)  Diffusion-transformer TTS with high-quality zero-shot voice cloning. **🟡 Intermediate**
- [Orpheus-TTS](https://github.com/canopyai/Orpheus-TTS)  Llama-3B-based emotive TTS with ~200 ms streaming and emotion tags. **🟡 Intermediate**
- [Sesame CSM](https://github.com/SesameAILabs/csm)  Conversational, context-aware multi-speaker TTS using a Llama backbone with the Mimi codec. **🔴 Advanced**

### Streaming and ethics
- [Streaming TTS for Low-Latency Agents (Picovoice)](https://picovoice.ai/blog/streaming-text-to-speech-for-ai-agents/)  Clear taxonomy of single, output-streaming, and dual-streaming TTS. **🟡 Intermediate**
- [Ethics of Voice Cloning & Deepfakes (Deepgram)](https://deepgram.com/learn/ethics-of-voice-cloning-and-deepfakes)  Vendor-neutral discussion of misuse, regulation, and developer responsibility. **🟢 Beginner**

## 5. LLMs for voice and real-time AI

A voice agent's perceived intelligence is bounded by **how fast the LLM streams its first token**. Sub-300 ms TTFT changes the conversation feel entirely.

### Low-latency inference
- [Groq](https://groq.com/)  LPU-based inference cloud delivering ~10× faster Llama tokens/sec than commodity GPUs. **🟢 Beginner**
- [Cerebras Inference](https://www.cerebras.ai/inference)  Wafer-scale chip inference with very high throughput on Llama models. **🟢 Beginner**
- [SambaNova Cloud](https://cloud.sambanova.ai/)  Reconfigurable Dataflow inference; stable throughput at low latency. **🟢 Beginner**

### Speech-to-speech models
- [OpenAI Realtime API guide](https://platform.openai.com/docs/guides/realtime)  Flagship S2S product with WebRTC/WebSocket transport. **🟡 Intermediate**
- [Google Gemini Live](https://ai.google.dev/gemini-api/docs/live-api)  Real-time multimodal voice/video with barge-in and 70-language support. **🟡 Intermediate**
- [Moshi (kyutai-labs)](https://github.com/kyutai-labs/moshi)  Open-source full-duplex speech-text foundation model with 200 ms latency  the premier OSS S2S model to study. **🔴 Advanced**

### Voice-specific prompting and tools
- [OpenAI Voice Agents Guide](https://platform.openai.com/docs/guides/voice-agents)  Compares chained vs S2S architectures with prompt and tool best practices. **🟢 Beginner**
- [ElevenLabs Voice Agent Prompting Guide](https://elevenlabs.io/docs/conversational-ai/best-practices/prompting-guide)  Production-grade prompt structure tuned for voice; vendor-neutral lessons. **🟡 Intermediate**
- [Voice AI Prompt Engineering Guide (VoiceInfra)](https://voiceinfra.ai/blog/voice-ai-prompt-engineering-complete-guide)  Explains why voice prompts must be 60–70% shorter than chat prompts, with templates. **🟢 Beginner**
- [Function Calling for Voice Agents (LiveKit Docs)](https://docs.livekit.io/agents/voice-agent/function-calling/)  Concise guide to defining tools and RPC inside a voice agent. **🟡 Intermediate**

## 6. Voice activity detection and turn-taking

Pure VAD is no longer enough  modern agents combine **acoustic VAD with a small semantic model** that predicts end-of-utterance from words and prosody.

- [Silero VAD](https://github.com/snakers4/silero-vad)  MIT-licensed pre-trained VAD; <1 ms per chunk on CPU. The de facto VAD inside LiveKit and Pipecat. **🟢 Beginner**
- [py-webrtcvad](https://github.com/wiseman/py-webrtcvad)  Python bindings for Google's classic WebRTC VAD; lightweight baseline. **🟢 Beginner**
- [LiveKit Turn Detector  blog post](https://blog.livekit.io/using-a-transformer-to-improve-end-of-turn-detection)  How a SmolLM-based EOU model complements VAD with semantic context. **🟡 Intermediate**
- [LiveKit turn-detector model on HuggingFace](https://huggingface.co/livekit/turn-detector)  Open-weights multilingual EOU model running ONNX on CPU in under 500 MB. **🟡 Intermediate**
- [Pipecat Smart Turn v3](https://www.daily.co/blog/announcing-smart-turn-v3-with-cpu-inference-in-just-12ms/)  Whisper-Tiny-based audio semantic VAD with 12 ms CPU inference, BSD-2 licensed. **🟡 Intermediate**
- [pipecat-ai/smart-turn](https://github.com/pipecat-ai/smart-turn)  Repo with model code, training scripts, and integration examples. **🟡 Intermediate**
- [The Complete Guide to AI Turn-Taking (Tavus)](https://www.tavus.io/post/ai-turn-taking)  Reader-friendly overview of why pure VAD fails in real conversations. **🟢 Beginner**
- [Tackling Turn Detection in Voice AI (Notch)](https://www.notch.cx/post/turn-detection-in-voice-ai)  Engineer-first walkthrough combining VAD probability, volume, and TTS markers. **🟡 Intermediate**

## 7. WebRTC fundamentals

WebRTC is the **default transport for voice agents** that don't run over the phone network. Understanding ICE, STUN, TURN, and SFU architecture is non-negotiable for production work.

- [MDN WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)  Authoritative free reference for `RTCPeerConnection`, `getUserMedia`, and signaling. **🟢 Beginner**
- [MDN: Introduction to WebRTC Protocols](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols)  Beginner-friendly explanation of ICE, STUN, TURN, and SDP. **🟢 Beginner**
- [WebRTC.org Getting Started](https://webrtc.org/getting-started/overview)  Official Google-maintained intro, splitting WebRTC into media-capture and connectivity. **🟢 Beginner**
- [GetStream  WebRTC for the Brave](https://getstream.io/resources/projects/webrtc/)  Free multi-module tutorial covering networking basics through advanced topics. **🟢 Beginner**
- [Why WebRTC Beats WebSockets for Voice AI (LiveKit)](https://livekit.com/blog/why-webrtc-beats-websockets-for-voice-ai-agents)  2025 explainer aimed at AI builders, comparing transports in plain English. **🟡 Intermediate**
- [Daily Docs  Intro to Video Architecture (P2P vs SFU)](https://docs.daily.co/guides/architecture-and-monitoring/intro-to-video-arch)  One of the clearest beginner write-ups of P2P vs SFU. **🟢 Beginner**
- [Agora  How WebRTC Works](https://www.agora.io/en/blog/how-does-webrtc-work/)  Side-by-side WebRTC vs WebSockets walkthrough with signaling diagrams. **🟢 Beginner**

## 8. Telephony and SIP

The phone network has its own physics. Once you know which **SIP trunk provider** to point at LiveKit or Pipecat, you can ship.

- [Twilio Programmable Voice](https://www.twilio.com/en-us/voice)  TwiML, Voice API, and PSTN connectivity in one hub; the default starting point. **🟢 Beginner**
- [Twilio: Voice AI Assistant with OpenAI Realtime + Python](https://www.twilio.com/en-us/blog/voice-ai-assistant-openai-realtime-api-python)  Step-by-step junior-friendly tutorial wiring Twilio Media Streams to an LLM. **🟢 Beginner**
- [Twilio SIP Quickstart](https://www.twilio.com/docs/voice/sip/quickstart)  Clearest beginner explainer of SIP basics, SIP Domains, and softphone setup. **🟢 Beginner**
- [Telnyx Voice API](https://telnyx.com/products/voice-api)  Strong Twilio alternative with WebSocket media streaming and an AI Assistant tooling. **🟢 Beginner**
- [Telnyx  How to Set Up a SIP Trunk](https://telnyx.com/resources/how-to-setup-sip-trunk)  Friendly walkthrough of SIP trunking architecture, codecs, and authentication. **🟢 Beginner**
- [Plivo Voice API Documentation](https://www.plivo.com/docs/voice/)  XML call control and audio-streaming integrations for AI agents. **🟢 Beginner**
- [SignalWire Voice Docs](https://developer.signalwire.com/voice/)  Built on FreeSWITCH; SWML, TwiML-compatible API, and an AI Agents SDK. **🟡 Intermediate**
- [LiveKit SIP Primer](https://docs.livekit.io/reference/telephony/sip-primer/)  Best diagram of how a call flows from PSTN → trunk → SIP service → agent. **🟢 Beginner**
- [LiveKit SIP Trunk Setup](https://docs.livekit.io/telephony/start/sip-trunk-setup/)  Practical guide for wiring Twilio/Telnyx/Plivo trunks into LiveKit. **🟡 Intermediate**
- [Pipecat Telephony Overview](https://docs.pipecat.ai/guides/telephony/overview)  Differences between WebSocket-based telephony and SIP-based call control. **🟡 Intermediate**

## 9. Tutorials and hands-on projects

Pick **one tutorial and finish it before starting another**. Voice AI is unforgiving of half-built pipelines.

- [LiveKit Voice AI Quickstart](https://docs.livekit.io/agents/start/voice-ai/)  Official 10-minute walkthrough in Python or Node with starter templates. **🟢 Beginner**
- [Build Your First AI Voice Agent in Python (LiveKit)](https://livekit.com/blog/build-your-first-ai-voice-agent-python)  End-to-end Python tutorial covering streaming, latency, and deployment. **🟢 Beginner**
- [Pipecat Quickstart](https://docs.pipecat.ai/getting-started/quickstart)  Build and deploy a Deepgram + OpenAI + Cartesia bot in roughly 10 minutes. **🟢 Beginner**
- [How to Build a Real-Time Voice Agent with Pipecat (AssemblyAI)](https://www.assemblyai.com/blog/building-a-voice-agent-with-pipecat)  Production-oriented walkthrough including local testing and Pipecat Cloud deployment. **🟡 Intermediate**
- [Deepgram  Build a Voice AI Agent](https://deepgram.com/learn/how-to-build-a-voice-ai-agent)  Step-by-step guide wiring Deepgram STT, GPT, and Aura TTS. **🟢 Beginner**
- [Build a Voice Assistant with Twilio ConversationRelay + LiteLLM](https://www.twilio.com/en-us/blog/developers/tutorials/product/voice-ai-assistant-conversationrelay-litellm-python)  Provider-agnostic tutorial supporting OpenAI, Anthropic, or DeepSeek. **🟡 Intermediate**
- [freeCodeCamp  Build Advanced AI Agents (LiveKit, Exa, LangChain)](https://www.youtube.com/watch?v=B0TJC4lmzEM)  Free 3-part video course covering interactive voice agents end-to-end. **🟢 Beginner**
- [freeCodeCamp  Private On-Device Voice Assistant](https://www.freecodecamp.org/news/private-voice-assistant-using-open-source-tools/)  Hands-on local stack with Whisper, a local LLM, and system TTS. **🟡 Intermediate**

## 10. GitHub starter repos and awesome lists

Clone these instead of writing boilerplate from scratch.

- [livekit/agents](https://github.com/livekit/agents)  The flagship open-source Python/Node framework for production voice agents. **🟢 → 🔴**
- [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)  Vendor-neutral framework with 40+ STT/LLM/TTS service plugins. **🟢 → 🔴**
- [livekit-examples/agent-starter-python](https://github.com/livekit-examples/agent-starter-python)  Production-ready starter with Dockerfile, eval suite, turn detector, and core plugins. **🟢 Beginner**
- [livekit-examples (org)](https://github.com/livekit-examples)  Official collection of LiveKit Python/React/Swift/Android starters. **🟢 Beginner**
- [pipecat-ai/pipecat-examples](https://github.com/pipecat-ai/pipecat-examples)  Sample apps for push-to-talk, websocket, telephony, and multimodal use cases. **🟢 → 🟡**
- [elevenlabs/elevenlabs-examples](https://github.com/elevenlabs/elevenlabs-examples)  Runnable Next.js and Python examples for TTS, STT, and real-time agents. **🟢 Beginner**
- [vocodedev/vocode-core](https://github.com/vocodedev/vocode-core)  Open-source modular framework for voice-LLM agents on phone, Zoom, or system audio. **🟡 Intermediate** *(less actively maintained than LiveKit/Pipecat)*
- [kwindla/macos-local-voice-agents](https://github.com/kwindla/macos-local-voice-agents)  Pipecat example hitting sub-800 ms voice-to-voice latency entirely on M-series Macs. **🟡 Intermediate**
- [zzw922cn/awesome-speech-recognition-speech-synthesis-papers](https://github.com/zzw922cn/awesome-speech-recognition-speech-synthesis-papers)  Comprehensive curated index of ASR, TTS, voice conversion, and speech-LLM papers. **🟡 Intermediate**
- [wildminder/awesome-ai-voice](https://github.com/wildminder/awesome-ai-voice)  Up-to-date 2025–2026 list of open-source TTS and voice-cloning models.
- [CorentinJ/Real-Time-Voice-Cloning](https://github.com/CorentinJ/Real-Time-Voice-Cloning)  Classic 5-second voice cloning project for understanding TTS fundamentals. **🟡 Intermediate**

## 11. Datasets and benchmarks

You'll rarely train from scratch, but knowing **which dataset a model was trained on** explains its accents, languages, and failure modes.

- [LibriSpeech ASR Corpus](https://www.openslr.org/12)  ~1,000 hours of English audiobooks; nearly every ASR paper benchmarks against it. **🟢 Beginner**
- [Mozilla Common Voice](https://commonvoice.mozilla.org/)  Crowdsourced multilingual dataset (100+ languages); the easiest legal way to fine-tune ASR. **🟢 Beginner**
- [Common Voice on HuggingFace](https://huggingface.co/datasets/mozilla-foundation/common_voice_17_0)  One-line `load_dataset()` access for hands-on experiments. **🟢 Beginner**
- [Open ASR Leaderboard](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard)  Live comparison of 60+ ASR models on WER and real-time factor. **🟢 Beginner**
- [Artificial Analysis  Speech](https://artificialanalysis.ai/speech-to-text)  Independent benchmarks of commercial STT and TTS providers. **🟢 Beginner**
- [LJSpeech Dataset](https://keithito.com/LJ-Speech-Dataset/)  ~24 hours of single-speaker English audio; baseline corpus for Tacotron 2 and VITS. **🟢 Beginner**
- [VCTK Corpus](https://datashare.ed.ac.uk/handle/10283/3443)  ~110 English speakers with diverse accents; widely used for multi-speaker TTS. **🟡 Intermediate**
- [VoxCeleb (Oxford VGG)](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/)  Million-utterance "in the wild" dataset for speaker identification and verification. **🟡 Intermediate**

## 12. Beginner-accessible research papers

These are the **landmark papers behind the models you'll actually use**. Read the Whisper and Common Voice papers first  they're unusually approachable.

- [Whisper  Robust Speech Recognition via Large-Scale Weak Supervision (2022)](https://arxiv.org/abs/2212.04356)  Behind the most popular open ASR model; unusually clear prose for an ML paper. **🟡 Intermediate**
- [HuggingFace Whisper fine-tuning blog (companion)](https://huggingface.co/blog/fine-tune-whisper)  Hands-on walkthrough that lets you "feel" the Whisper paper in code. **🟢 Beginner**
- [VITS  Conditional VAE with Adversarial Learning for End-to-End TTS (2021)](https://arxiv.org/abs/2106.06103)  The single-stage TTS model behind many open-source voice cloners. **🟡 Intermediate**
- [Tacotron 2  Natural TTS Synthesis (2017)](https://arxiv.org/abs/1712.05884)  Landmark seq2seq + WaveNet-vocoder paper that made neural TTS sound natural. **🟡 Intermediate**
- [Conformer  Convolution-augmented Transformer for ASR (2020)](https://arxiv.org/abs/2005.08100)  The architecture inside NVIDIA Parakeet, Canary, and many leaderboard models. **🟡 Intermediate**
- [wav2vec 2.0  Self-Supervised Learning of Speech Representations (2020)](https://arxiv.org/abs/2006.11477)  Showed that pretraining on unlabeled audio drastically reduces labeled-data needs. **🟡 Intermediate**
- [Common Voice  A Massively-Multilingual Speech Corpus (2020)](https://arxiv.org/abs/1912.06670)  Short, accessible paper describing how Common Voice is built and validated. **🟢 Beginner**
- [Open ASR Leaderboard preprint (2025)](https://arxiv.org/abs/2510.06961)  Reproducible benchmark of 60+ ASR models across 11 datasets; the modern landscape map. **🟡 Intermediate**

## 13. Evaluation and testing

You can't ship what you can't measure. **Voice-agent evaluation is fundamentally probabilistic**  a single transcript can pass and fail across runs, so simulation and statistics matter more than fixed test cases.

- [Coval  Voice AI Testing Platform](https://www.coval.dev/voice-ai-testing)  Defines the core voice-agent metrics: TTFB, WER, resolution rate, simulated accents, and interruptions. **🟢 Beginner**
- [Coval  How to Evaluate Voice Agents (Practical Guide)](https://www.coval.ai/blog/how-to-evaluate-voice-agents-a-practical-guide-to-testing-and-quality-assurance)  One of the most cited 2025 guides on probabilistic vs deterministic evaluation. **🟢 Beginner**
- [Cekura  Metrics Overview](https://docs.cekura.ai/documentation/key-concepts/metrics/overview)  Predefined metrics, instruction-following checks, and simulation framework. **🟢 Beginner**
- [Cekura  Performance Testing for Voice Agents](https://www.cekura.ai/blogs/performance-testing-voice-agents-practical-guide-cekura)  Practical 2025 guide on multi-turn simulation and edge-case generation. **🟡 Intermediate**
- [Hamming AI](https://hamming.ai/)  Production-focused QA platform with simulation, load testing, and 50+ metrics. **🟡 Intermediate**
- [Hamming  Voice Agent Evaluation Metrics Guide](https://hamming.ai/resources/voice-agent-evaluation-metrics-guide)  Reference of latency percentiles, WER, MOS-style quality, and task completion with formulas. **🟡 Intermediate**
- [LiveKit  Understand and Improve Agent Latency](https://livekit.com/blog/understand-and-improve-agent-latency)  Per-turn latency metrics (e2e, LLM TTFT, TTS TTFB) and where to optimize. **🟡 Intermediate**
- [Twilio  How Do You Know if Your Voice AI Agents Are Working?](https://www.twilio.com/en-us/blog/developers/evaluating-voice-ai-agents)  Vendor-neutral 2025 guide arguing for business-outcome metrics over raw WER/latency. **🟢 Beginner**
- [Future AGI simulate-sdk](https://github.com/future-agi/simulate-sdk)  Open-source voice AI simulation SDK for testing AI agents; generates synthetic conversations for evaluation. **🟡 Intermediate**

## 14. Production, deployment, and scaling

Real production voice infrastructure is **the hardest unsolved problem in this space**. Read these before quoting anyone a per-minute price.

- [LiveKit  Deploy and scale agents on LiveKit Cloud](https://blog.livekit.io/deploy-and-scale-agents-on-livekit-cloud/)  Real-world write-up on stateful load balancing, autoscaling, and warm pools. **🟡 Intermediate**
- [LiveKit  Why You Shouldn't Build Voice Agents Directly on Model APIs](https://livekit.com/blog/real-time-voice-agents-vs-model-apis)  Honest breakdown of what raw model APIs don't give you. **🟡 Intermediate**
- [Latent Space  OpenAI Realtime API: The Missing Manual](https://www.latent.space/p/realtime-api)  Field-tested guide from Pipecat's creator on Realtime API production realities. **🟡 Intermediate**
- [TWIML  Building Voice AI Agents That Don't Suck (Kwindla Kramer)](https://twimlai.com/podcast/twimlai/building-voice-ai-agents-that-dont-suck)  One-hour discussion on real production architecture and turn-taking. **🟡 Intermediate**
- [AWS  Voice Agents with Pipecat and Amazon Bedrock](https://aws.amazon.com/blogs/machine-learning/building-intelligent-ai-voice-agents-with-pipecat-and-amazon-bedrock-part-1/)  Full architecture walkthrough including latency optimization and Nova Sonic. **🟡 Intermediate**
- [Deepgram  STT API Pricing Breakdown](https://deepgram.com/learn/speech-to-text-api-pricing-breakdown-2025)  Vendor-by-vendor per-minute economics  required reading before signing any contract. **🟢 Beginner**
- [Sierra  Shipping and Scaling AI Agents](https://sierra.ai/blog/shipping-and-scaling-ai-agents)  Case-study on Sonos, SiriusXM, and OluKai voice deployments. **🟡 Intermediate**
- [Sierra  Constellation of Models](https://sierra.ai/blog/constellation-of-models)  How a leading CX company composes 15+ models per agent. **🟡 Intermediate**
- [LiveKit Agent Observability](https://livekit.com/products/agent-observability)  Built-in tracing, transcripts, and per-stage latency for LiveKit Cloud. **🟢 Beginner**

## 15. Ethics, safety, and regulation

If you're shipping a voice agent in 2026, **disclosure and consent are no longer optional**. The FCC and EU AI Act both have teeth.

- [FCC  AI-Generated Voices in Robocalls Illegal (Feb 2024)](https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal)  The landmark TCPA ruling every U.S. voice-agent dev must read. **🟢 Beginner**
- [EU AI Act  Article 50 (Transparency for Deepfakes & AI Interactions)](https://artificialintelligenceact.eu/article/50/)  Authoritative text of EU disclosure rules; takes effect August 2026. **🟡 Intermediate**
- [European Commission  Code of Practice on AI-Generated Content](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)  Official EU implementation guidance on watermarking and labelling. **🟡 Intermediate**
- [FTC  Approaches to Address AI-Enabled Voice Cloning](https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/04/approaches-address-ai-enabled-voice-cloning)  Plain-English summary of the Voice Cloning Challenge winners and Impersonation Rule. **🟢 Beginner**
- [FTC  Final Impersonation Rule (Feb 2024)](https://www.ftc.gov/news-events/news/press-releases/2024/02/ftc-proposes-new-protections-combat-ai-impersonation-individuals)  Direct source on U.S. impersonation-fraud rules covering AI deepfakes. **🟢 Beginner**
- [Pindrop  2025 Voice Intelligence & Security Report](https://www.pindrop.com/research/report/voice-intelligence-security-report/)  Industry report documenting a 1,300% rise in deepfake fraud attempts. **🟢 Beginner**
- [Voice Cloning Ethics (CAMB.AI)](https://www.camb.ai/blog-post/voice-cloning-ethics-consent-deepfakes-responsible-ai-voice-use)  Practical overview of consent frameworks, ELVIS Act, and EU AI Act. **🟢 Beginner**
- [NCLC  Top Six TCPA/Robocall Developments 2024/2025](https://library.nclc.org/article/top-six-tcparobocall-developments-20242025)  Consumer-protection lens on what's actually being enforced. **🟡 Intermediate**

## 16. Blogs and newsletters

Subscribe to two or three to stay current  the field moves quickly.

- [LiveKit Blog](https://blog.livekit.io/)  Engineering deep-dives on WebRTC, agents framework releases, and production patterns.
- [Deepgram Learn](https://deepgram.com/learn)  Tutorials on STT/TTS, voice agent design, evals, and pipeline architecture.
- [Cartesia Blog](https://cartesia.ai/blog)  State-space TTS models, Sonic releases, and yearly "State of Voice AI" reports.
- [ElevenLabs Blog](https://elevenlabs.io/blog)  Product and research announcements with implementation notes.
- [Daily.co Blog (Pipecat)](https://www.daily.co/blog/)  Posts from Pipecat's maintainers covering scaling and feature releases.
- [Voice AI & Voice Agents  Illustrated Primer](https://voiceaiandvoiceagents.com/)  Free, regularly-updated long-form primer.
- [Latent Space (swyx & Alessio)](https://www.latent.space/)  AI Engineer newsletter and podcast with frequent voice-AI episodes.
- [Voice AI Newsletter (Krisp)](https://voice-ai-newsletter.krisp.ai/)  "Future of Voice AI" interview series with founders; published weekly in 2025.
- [Voice AI Weekly (Vapi)](https://vapivoice.substack.com/)  Weekly Substack rounding up news, products, and tools.
- [Voicebot.ai (Synthedia)](https://voicebot.ai/)  Long-running daily news and paid newsletter on industry trends.

## 17. Podcasts

- [The Voicebot Podcast (Bret Kinsella)](https://voicebot.ai/voicebot-podcasts/)  Longest-running serious voice-tech podcast; weekly founder interviews.
- [Latent Space  The AI Engineer Podcast](https://www.latent.space/podcast)  Top US tech podcast; regularly covers Realtime API, Pipecat, Voxtral, Gemini Live.
- [The Future of Voice AI (Krisp)](https://podcasts.apple.com/us/podcast/the-future-of-voice-ai/id1809847184)  Weekly founder interviews focused on enterprise voice AI architecture.
- [TWIML AI Podcast  voice episodes](https://podcasts.apple.com/us/podcast/building-voice-ai-agents-that-dont-suck-with-kwindla-kramer/id1116303051?i=1000717421464)  Strong technical interviews; the Kwin Kramer episode is a great starting point.
- [This Week In Voice (Project Voice)](https://thisweekinvoice.substack.com/)  News-roundtable format covering conversational AI.

## 18. Communities

- [LiveKit Community Slack](https://livekit.io/join-slack)  Direct access to maintainers and other agent builders.
- [Pipecat Discord](https://www.pipecat.ai/)  Active community with weekly office hours; invite link from the homepage.
- [HuggingFace Discord  #ml-for-audio-and-speech](https://hf.co/join/discord)  200k-member server with strong audio/speech channels.
- [Vapi Discord](https://vapi.ai/)  Builder community for Vapi voice agents; invite from the homepage.
- [Retell AI Discord](https://www.retellai.com/)  Discord for Retell developers building phone-call voice agents.
- [ElevenLabs Discord](https://discord.gg/elevenlabs)  Large TTS, voice cloning, and Conversational AI community with daily help threads.
- [Deepgram Discord](https://deepgram.com/)  STT/TTS/Voice Agent API support and build-with-us threads.
- [Reddit  r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/)  Active threads on local Whisper/Parakeet, on-device TTS, and end-to-end voice stacks.
- [Reddit  r/AI_Agents](https://www.reddit.com/r/AI_Agents/)  General AI-agent community where voice topics surface frequently.

## 19. Conferences and events

- [AI Engineer World's Fair](https://www.ai.engineer/worldsfair)  Biggest AI-engineering conference; the Voice track has hosted major launches from ElevenLabs, Vapi, LiveKit, Pipecat, and Cartesia. **🟢 Beginner**
- [AI Engineer YouTube channel](https://www.youtube.com/@aiDotEngineer)  All World's Fair and Summit talks are posted free; the best library of recent voice-AI talks. **🟢 Beginner**
- [AI Engineer Summit Online  Voice playlist](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0VetQVGT1EqTbcr-qcgbfFs)  Curated playlist including voice-track sessions from leading labs. **🟢 Beginner**
- [AIEWF 2025 Recap (Latent Space)](https://www.latent.space/p/aiewf-2025-keynotes)  Written deep-dive into 2025's voice-track talks and major launches. **🟢 Beginner**
- [VOICE & AI (Modev)](https://www.voicesummit.ai/)  Long-running voice technology conference with broader CX and voicebot focus. **🟢 Beginner**
- [Project Voice](https://www.projectvoice.ai/annual-conference)  Main U.S. event for conversational AI across voice, text, and chat. **🟢 Beginner**
- [Interspeech](https://www.interspeech2025.org/)  Top academic speech-science conference; intimidating but worth knowing  most landmark papers debut here. **🔴 Advanced**

## 20. Hackathons and competitions

- [ElevenLabs Worldwide Hackathon](https://hackathon.elevenlabs.io/)  Flagship global hackathon for conversational agents; 30+ cities and a $200K+ prize pool. **🟢 Beginner**
- [ElevenHacks (weekly sprints)](https://hacks.elevenlabs.io/)  Weekly themed challenges with credits and prizes; low-pressure way to ship one project per week. **🟢 Beginner**
- [AI Engineer World's Fair Hackathon](https://www.ai.engineer/worldsfair)  Co-located with the conference; $10K prizes judged by 3,000+ AI engineers, with a strong voice track. **🟡 Intermediate**
- [lablab.ai AI Hackathons](https://lablab.ai/event)  Continuous calendar of short online hackathons frequently sponsored by voice-AI vendors. **🟢 Beginner**
- [Devpost  Voice AI Hackathons](https://devpost.com/hackathons?search=voice+ai)  Centralized search for active voice-AI hackathons; the best way to find what's open right now. **🟢 Beginner**

---

## Suggested learning path

1. **Week 1  Foundations:** Read the LiveKit pipeline post and Voice AI Illustrated Primer (sections 1, 7).
2. **Week 2  First agent:** Finish the LiveKit *or* Pipecat quickstart end-to-end (sections 2, 9).
3. **Week 3  Components:** Swap STT, TTS, and LLM providers; benchmark latency (sections 3, 4, 5).
4. **Week 4  Turn-taking & telephony:** Add Silero VAD and a turn detector; connect a SIP trunk (sections 6, 8).
5. **Week 5  Production:** Add evaluation, observability, and read the FCC/EU AI Act material (sections 13, 14, 15).
6. **Ongoing:** Subscribe to two newsletters and join voice ai community in [linkedin](https://www.linkedin.com/groups/14269127/) (sections 16, 17, 18).

## Contributing

Pull requests welcome. Resources must be **active in the last 12 months**, **accessible to developers**, and **vendor-neutral or clearly labeled** when authored by a commercial party. Open an issue to suggest additions or removals.

