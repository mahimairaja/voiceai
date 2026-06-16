<div align="center">

<picture>
<source media="(prefers-color-scheme: dark)" srcset="docs/assets/banner-dark.webp">
<source media="(prefers-color-scheme: light)" srcset="docs/assets/banner-light.webp">
<img src="docs/assets/banner-light.webp" alt="Voice AI: a curated learning path for building real-time voice agents" width="100%" />
</picture>

**A curated, developer-friendly learning path for building real-time voice AI agents, from your first STT call to scaling production telephony.**

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: MIT](https://img.shields.io/github/license/mahimairaja/voiceai?style=flat-square&color=blue)](LICENSE)
[![Stars](https://img.shields.io/github/stars/mahimairaja/voiceai?style=flat-square&logo=github&color=yellow)](https://github.com/mahimairaja/voiceai/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/mahimairaja/voiceai?style=flat-square&color=informational)](https://github.com/mahimairaja/voiceai/commits/main)
[![Resources](https://img.shields.io/badge/resources-190%2B-5b21b6?style=flat-square)](#table-of-contents)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](#contributing)

**English** · [中文版本](./README_zh.md)

</div>

Voice AI has moved from research demos into shipping product in under three years. **The modern stack is converging around a clear pattern**: a real-time transport layer (WebRTC or telephony), a streaming pipeline of speech-to-text → LLM → text-to-speech, and a turn-taking model that decides when the agent should speak. This list is structured to mirror that learning order: start with the foundations, pick a framework, then drill into individual components and production concerns.

Learning resources are tagged **🟢 Beginner**, **🟡 Intermediate**, or **🔴 Advanced** (blogs, podcasts, and communities in sections 17-19 are intentionally left untagged). Prefer free official docs and vendor-neutral guides; flag where authors have commercial interests.

---

## How to use this list

Read top-to-bottom if you're brand new. The recommended path:

1. **Foundations** → understand the pipeline and latency budget
2. **Frameworks** → pick one (LiveKit Agents or Pipecat are the safest open-source bets) and ship a hello-world
3. **Components** (STT, TTS, LLM, VAD, turn detection) → swap pieces to learn what each layer does
4. **Transport & telephony** → connect to a real phone number
5. **Evaluation, production, ethics** → make it safe enough to ship

---

## 📘 Companion book: Voice Agents Handbook

If you want this material in a tighter, opinionated, production-grade form, I wrote the **[Voice Agents Handbook](https://handbook.mahimai.ca)**: building production voice AI with LiveKit, plus appendices on choosing your stack and the LiveKit ecosystem beyond agents. Available now on Kindle (and in paperback).

The README you're reading collects the field's best free resources. The book is the curated path through them, with the patterns I've used shipping voice agents for trade people, lawyers, and immigration consultants.

> _Disclosure: I maintain this repo and authored the handbook. Free sample (Introduction + Chapter 1) at [handbook.mahimai.ca](https://handbook.mahimai.ca)._

---

## Table of contents

<details>
<summary><b>📖 Expand the 21 sections</b></summary>

1. [Foundational concepts and learning paths](#1-foundational-concepts-and-learning-paths)
2. [Frameworks and orchestration platforms](#2-frameworks-and-orchestration-platforms)
3. [Speech-to-text (STT / ASR)](#3-speech-to-text-stt--asr)
4. [Text-to-speech (TTS)](#4-text-to-speech-tts)
5. [LLMs for voice and real-time AI](#5-llms-for-voice-and-real-time-ai)
6. [Voice activity detection and turn-taking](#6-voice-activity-detection-and-turn-taking)
7. [Audio enhancement and noise suppression](#7-audio-enhancement-and-noise-suppression)
8. [WebRTC fundamentals](#8-webrtc-fundamentals)
9. [Telephony and SIP](#9-telephony-and-sip)
10. [Tutorials and hands-on projects](#10-tutorials-and-hands-on-projects)
11. [GitHub starter repos and awesome lists](#11-github-starter-repos-and-awesome-lists)
12. [Datasets and benchmarks](#12-datasets-and-benchmarks)
13. [Beginner-accessible research papers](#13-beginner-accessible-research-papers)
14. [Evaluation and testing](#14-evaluation-and-testing)
15. [Production, deployment, and scaling](#15-production-deployment-and-scaling)
16. [Ethics, safety, and regulation](#16-ethics-safety-and-regulation)
17. [Blogs and newsletters](#17-blogs-and-newsletters)
18. [Podcasts](#18-podcasts)
19. [Communities](#19-communities)
20. [Conferences and events](#20-conferences-and-events)
21. [Hackathons and competitions](#21-hackathons-and-competitions)

</details>

---

## 1. Foundational concepts and learning paths

Start here. These resources establish the **mental model of the voice agent pipeline** and the latency budget you'll fight for the rest of your career.

- [Voice AI & Voice Agents: An Illustrated Primer](https://voiceaiandvoiceagents.com/): Kwindla Hultman Kramer's free, regularly-updated long-form primer. The de facto textbook for the field. **🟢 Beginner**
- [Voice Agent Architecture: STT, LLM, and TTS Pipelines Explained (LiveKit)](https://livekit.com/blog/voice-agent-architecture-stt-llm-tts-pipelines-explained): Visual walkthrough of streaming patterns, turn detection, and where latency accumulates. **🟢 Beginner**
- [Everything You Need to Know About Voice AI Agents (Deepgram)](https://deepgram.com/learn/everything-about-voice-ai-agents): End-to-end primer covering feature extraction, ASR, LLM reasoning, and synthesis. **🟢 Beginner**
- [AI Voice Agents (LiveKit Docs)](https://docs.livekit.io/agents/): The canonical "what is a voice agent" reference, covering the Agents framework, sessions, and the STT-LLM-TTS pipeline vs realtime model split. **🟢 Beginner**
- [Core Latency in AI Voice Agents (Twilio)](https://www.twilio.com/en-us/blog/developers/best-practices/guide-core-latency-ai-voice-agents): Visual explanation of end-of-turn detection, silence thresholds, and smart endpointing. **🟢 Beginner**
- [Advice on Building Voice AI in June 2025 (Daily.co)](https://www.daily.co/blog/advice-on-building-voice-ai-in-june-2025/): Practical P50/P95 latency-budget guidance from Pipecat's creators. **🟡 Intermediate**
- [How Intelligent Turn Detection Solves the Biggest Challenge in Voice Agents (AssemblyAI)](https://www.assemblyai.com/blog/turn-detection-endpointing-voice-agent): Endpointing is the most underestimated problem; this is the clearest deep-dive. **🟡 Intermediate**

## 2. Frameworks and orchestration platforms

The frameworks below all let you wire STT, an LLM, and TTS together. **For open-source production work, LiveKit Agents and Pipecat are the two safest bets**; for managed dashboards, Vapi, Retell, and Bland win on time-to-first-call.

### Open-source frameworks

- [LiveKit Agents: Voice AI Quickstart](https://docs.livekit.io/agents/start/voice-ai/): Working assistant in <10 min via Python or TypeScript, runs on top of WebRTC. **🟢 Beginner**
- [Pipecat: Quickstart](https://docs.pipecat.ai/getting-started/quickstart): Scaffolds a Deepgram + OpenAI + Cartesia pipeline via the Pipecat CLI (`uv tool install pipecat-ai-cli`, then `pipecat init quickstart`); talk to it in the browser in ~5 minutes. **🟢 Beginner**
- [Ultravox (fixie-ai/ultravox)](https://github.com/fixie-ai/ultravox): Open-weight multimodal speech LLM (Llama/Gemma/Qwen variants) that skips the separate ASR stage for ~150 ms TTFT. **🔴 Advanced**

### Managed platforms

- [Vapi: Quickstart](https://docs.vapi.ai/quickstart/introduction): Dashboard-first; ship an agent on a free US phone number in under 5 minutes. **🟢 Beginner**
- [Retell AI: Introduction & Quickstart](https://docs.retellai.com/general/introduction): Phone-agent platform with $10 free credit on signup. **🟢 Beginner**
- [Bland AI: Send Your First Phone Call](https://www.bland.ai/blog/the-bland-ai-voice-call-api): Minimal API tutorial for placing your first AI phone call. **🟢 Beginner**
- [ElevenLabs Agents: Quickstart](https://elevenlabs.io/docs/eleven-agents/quickstart): Build and embed a voice agent widget on any website in 5 minutes (formerly branded "Conversational AI," now ElevenAgents). **🟢 Beginner**

### Realtime / speech-to-speech APIs

- [OpenAI Realtime API: Guide](https://platform.openai.com/docs/guides/realtime): Official guide to `gpt-realtime` (now GA) over WebRTC, WebSockets, or SIP. **🟡 Intermediate**
- [Google Gemini Live API: Overview](https://ai.google.dev/gemini-api/docs/live-api): Low-latency, bidirectional voice + vision agents with barge-in and tool use, on Gemini 3 native audio. **🟡 Intermediate**
- [Twilio ConversationRelay](https://www.twilio.com/docs/voice/conversationrelay): WebSocket bridge that handles STT/TTS so you focus on LLM logic; works with any LLM. **🟡 Intermediate**

### Vendor-neutral comparisons

- [Vapi vs Pipecat vs LiveKit (AssemblyAI)](https://www.assemblyai.com/blog/vapi-vs-pipecat-vs-livekit): Architecture-focused comparison of pipeline control and transport choices. **🟡 Intermediate**
- [11 Voice Agent Platforms Compared (Softcery)](https://softcery.com/lab/choosing-the-right-voice-agent-platform-in-2025): Broad market map with use-case recommendations. **🟢 Beginner**
- [Best Voice Agent Stack (Hamming AI)](https://hamming.ai/resources/best-voice-agent-stack): Buy-vs-build framework with concrete cost, latency, and time-to-launch numbers. **🟡 Intermediate**

## 3. Speech-to-text (STT / ASR)

Pick **one streaming STT** and learn it deeply before shopping around. Deepgram, AssemblyAI, and Whisper-derivatives cover most use cases. (All-in-one ASR + end-of-turn models like Deepgram Flux are covered under [turn-taking](#6-voice-activity-detection-and-turn-taking).)

### Commercial APIs

- [Deepgram Nova-3: STT benchmarks](https://deepgram.com/learn/speech-to-text-benchmarks): Primer on WER, latency, and cost alongside Deepgram's product reference; Nova-3 now spans 36+ languages with multilingual code-switching. **🟢 Beginner**
- [AssemblyAI Universal-3 Pro](https://www.assemblyai.com/blog/build-voice-agent-function-calling): Streaming STT walkthrough that doubles as a function-calling tutorial; Universal-3 Pro is the current flagship, adding natural-language keyterm prompting. **🟡 Intermediate**
- [OpenAI Whisper / gpt-4o-transcribe API docs](https://platform.openai.com/docs/guides/speech-to-text): Easiest cloud STT if you already use OpenAI. **🟢 Beginner**
- [Soniox multilingual benchmark](https://soniox.com/benchmarks): Public WER comparison across 60 languages. **🟢 Beginner**
- [Cartesia Ink 2](https://docs.cartesia.ai/build-with-cartesia/stt/latest): Streaming STT paired with Sonic TTS for a single-vendor low-latency stack. **🟢 Beginner**

### Open source

- [openai/whisper](https://github.com/openai/whisper): The original repo and the de facto starting point for any DIY ASR project. **🟢 Beginner**
- [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper): CTranslate2 reimplementation up to 4× faster with INT8; recommended for self-hosted Whisper. **🟡 Intermediate**
- [NVIDIA NeMo (Parakeet / Canary)](https://github.com/NVIDIA-NeMo/NeMo): Top-of-leaderboard open ASR models with streaming inference recipes. **🔴 Advanced**
- [Moonshine](https://github.com/moonshine-ai/moonshine): Tiny on-device ASR (tiny 27M / base 61M params); v2 adds an ergodic streaming encoder built for latency-critical live transcription on edge devices. **🟡 Intermediate**

### Benchmarks and explainers

- [Open ASR Leaderboard (HuggingFace)](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard): Community leaderboard across 11 datasets: your reference for open-source picks. **🟢 Beginner**
- [Artificial Analysis: Speech-to-Text](https://artificialanalysis.ai/speech-to-text): Independent leaderboard ranking 48+ STT providers by WER, speed, and cost. **🟢 Beginner**
- [Best Speech-to-Text Providers in 2026 (Coval)](https://www.coval.ai/blog/best-speech-to-text-providers-in-2026-independent-benchmarks-and-how-to-choose/): Independent benchmark across 14 providers (WER, latency, end-of-turn, cost), with guidance on testing against your own traffic. **🟡 Intermediate**
- [Best Speech-to-Text APIs in 2026 (Deepgram)](https://deepgram.com/learn/best-speech-to-text-apis-2026): Provider comparison guide; note the commercial author. **🟢 Beginner**
- [Streaming vs Batch ASR (Arun Baby)](https://www.arunbaby.com/speech-tech/0001-streaming-asr/): Engineer-friendly explainer of RNN-T and Conformer streaming architectures. **🟡 Intermediate**

## 4. Text-to-speech (TTS)

**Latency, not raw quality, is what kills voice agents**: prioritize providers offering true streaming with first-byte under 200 ms.

### Commercial APIs

- [ElevenLabs Docs](https://elevenlabs.io/docs): Industry-leading quality, voice cloning, and Agents platform in one SDK. **🟢 Beginner**
- [Cartesia Sonic Quickstart](https://docs.cartesia.ai/build-with-cartesia/tts-models/latest): Sonic 3.5, sub-90 ms first-byte latency, designed specifically for voice agents. **🟢 Beginner**
- [Deepgram Aura-2](https://developers.deepgram.com/docs/tts-models): Low-latency streaming TTS (Aura-2) that pairs cleanly with Deepgram STT. **🟢 Beginner**
- [OpenAI TTS (gpt-4o-mini-tts)](https://platform.openai.com/docs/guides/text-to-speech): Easiest plug-in TTS for the OpenAI stack. **🟢 Beginner**
- [Artificial Analysis: TTS leaderboard](https://artificialanalysis.ai/text-to-speech/models): ELO, price, and speed comparison covering Rime, PlayHT, Hume, Inworld, and others. **🟢 Beginner**

### Open source

- [Chatterbox (resemble-ai/chatterbox)](https://github.com/resemble-ai/chatterbox): Resemble AI's MIT-licensed TTS that beats ElevenLabs in blind preference tests; ~5 s zero-shot voice cloning, emotion-exaggeration control, and a built-in PerTh watermark. Turbo variant (350M) hits sub-150 ms first audio; Multilingual (V3, 0.5B) covers 23+ languages. **🟡 Intermediate**
- [Kokoro 82M](https://github.com/hexgrad/kokoro): Tiny Apache-licensed model that tops community ELO arenas; runs on CPU. **🟢 Beginner**
- [Piper (OHF-Voice/piper1-gpl)](https://github.com/OHF-Voice/piper1-gpl): Fast local neural TTS optimized for Raspberry Pi; perfect for offline projects. **🟢 Beginner**
- [Coqui TTS (idiap fork)](https://github.com/idiap/coqui-ai-TTS): Maintained fork of Coqui-TTS / XTTS v2; still battle-tested, though Chatterbox now leads on zero-shot cloning quality. **🟡 Intermediate**
- [Orpheus-TTS](https://github.com/canopyai/Orpheus-TTS): Llama-3B-based emotive TTS with ~200 ms streaming and emotion tags. **🟡 Intermediate**
- [Sesame CSM](https://github.com/SesameAILabs/csm): Conversational, context-aware multi-speaker TTS using a Llama backbone with the Mimi codec. **🔴 Advanced**

### Streaming and ethics

- [Streaming TTS for Low-Latency Agents (Picovoice)](https://picovoice.ai/blog/streaming-text-to-speech-for-ai-agents/): Clear taxonomy of single, output-streaming, and dual-streaming TTS. **🟡 Intermediate**
- [Ethics of Voice Cloning & Deepfakes (Deepgram)](https://deepgram.com/learn/ethics-of-voice-cloning-and-deepfakes): Vendor-neutral discussion of misuse, regulation, and developer responsibility. **🟢 Beginner**

## 5. LLMs for voice and real-time AI

A voice agent's perceived intelligence is bounded by **how fast the LLM streams its first token**. Sub-300 ms TTFT changes the conversation feel entirely.

### Low-latency inference

- [Groq](https://groq.com/): LPU-based inference cloud delivering ~10× faster Llama tokens/sec than commodity GPUs. **🟢 Beginner**
- [Cerebras Inference](https://www.cerebras.ai/inference): Wafer-scale chip inference with very high throughput on Llama models. **🟢 Beginner**
- [SambaNova Cloud](https://cloud.sambanova.ai/): Reconfigurable Dataflow inference; stable throughput at low latency. **🟢 Beginner**

### Speech-to-speech models

- [OpenAI Realtime API guide](https://platform.openai.com/docs/guides/realtime): Flagship S2S product with WebRTC/WebSocket transport (`gpt-realtime`, now GA). **🟡 Intermediate**
- [Google Gemini Live](https://ai.google.dev/gemini-api/docs/live-api): Real-time multimodal voice/video with barge-in and broad language support, on Gemini 3 native audio. **🟡 Intermediate**
- [Moshi (kyutai-labs)](https://github.com/kyutai-labs/moshi): Open full-duplex speech-text foundation model (~200 ms, Mimi codec). Kyutai's broader stack now includes Unmute (cascaded STT+LLM+TTS with tool use), Kyutai STT/TTS, and Hibiki (streaming translation). **🔴 Advanced**
- [Speech-to-Speech Models in 2026: Three Architectural Bets (Krzysztof Sopyla)](https://ai.ksopyla.com/posts/voice-to-voice-models-2026-review/): Vendor-neutral comparison of full-duplex (Moshi), near-duplex multimodal (Qwen-Omni), and cascade approaches, with FullDuplexBench numbers and tradeoffs. **🟡 Intermediate**

### Voice-specific prompting and tools

- [OpenAI Voice Agents Guide](https://platform.openai.com/docs/guides/voice-agents): Compares chained vs S2S architectures with prompt and tool best practices. **🟢 Beginner**
- [ElevenLabs Voice Agent Prompting Guide](https://elevenlabs.io/docs/eleven-agents/best-practices/prompting-guide): Production-grade prompt structure tuned for voice; vendor-neutral lessons. **🟡 Intermediate**
- [Voice AI Prompt Engineering Guide (VoiceInfra)](https://voiceinfra.ai/blog/voice-ai-prompt-engineering-complete-guide): Explains why voice prompts must be 60–70% shorter than chat prompts, with templates. **🟢 Beginner**
- [Tool Definition and Use for Voice Agents (LiveKit Docs)](https://docs.livekit.io/agents/logic/tools/definition/): Defining `@function_tool` tools and raw-schema tools inside a voice agent. **🟡 Intermediate**

## 6. Voice activity detection and turn-taking

Pure VAD is no longer enough: modern agents combine **acoustic VAD with a small semantic model** that predicts end-of-utterance from words and prosody.

- [Silero VAD](https://github.com/snakers4/silero-vad): MIT-licensed pre-trained VAD; <1 ms per chunk on CPU. The de facto VAD inside LiveKit and Pipecat. **🟢 Beginner**
- [py-webrtcvad](https://github.com/wiseman/py-webrtcvad): Python bindings for Google's classic WebRTC VAD; lightweight baseline. **🟢 Beginner**
- [LiveKit Turn Detector: blog post](https://livekit.com/blog/using-a-transformer-to-improve-end-of-turn-detection): How a small transformer-based EOU model complements VAD with semantic context. **🟡 Intermediate**
- [LiveKit turn-detector model on HuggingFace](https://huggingface.co/livekit/turn-detector): Open-weights multilingual EOU model running ONNX on CPU in under 500 MB. **🟡 Intermediate**
- [Deepgram Flux](https://deepgram.com/learn/fluxing-conversational-state-and-speech-to-text): All-in-one conversational STT with built-in end-of-turn detection (median EOT <300 ms), integrated with Deepgram's Voice Agent API; collapses STT and turn detection into a single model. **🟡 Intermediate**
- [Pipecat Smart Turn v3](https://www.daily.co/blog/announcing-smart-turn-v3-with-cpu-inference-in-just-12ms/): Whisper-Tiny-based audio semantic VAD with fast CPU inference (~12 ms on a standard instance per the v3 repo), BSD-2 licensed. **🟡 Intermediate**
- [pipecat-ai/smart-turn](https://github.com/pipecat-ai/smart-turn): Repo with model code, training scripts, and integration examples (~8M params, Whisper-Tiny base). **🟡 Intermediate**
- [Krisp Turn-Taking](https://krisp.ai/): Commercial turn-taking model used alongside any STT/LLM/TTS stack. **🟡 Intermediate**
- [The Complete Guide to AI Turn-Taking (Tavus)](https://www.tavus.io/blog/ai-turn-taking): Reader-friendly overview of why pure VAD fails in real conversations. **🟢 Beginner**
- [Tackling Turn Detection in Voice AI (Notch)](https://www.notch.cx/post/turn-detection-in-voice-ai): Engineer-first walkthrough combining VAD probability, volume, and TTS markers. **🟡 Intermediate**
- [Evaluating End-of-Turn Detection Models (Deepgram)](https://deepgram.com/learn/evaluating-end-of-turn-detection-models): Methodology plus a head-to-head of Flux, Pipecat Smart Turn, and LiveKit EOU; note the commercial author. **🟡 Intermediate**
- [ai-coustics VAD](https://developers.ai-coustics.com/): VAD bundled with real-time speech enhancement, noise suppression, and voice isolation in a single audio preprocessing SDK; useful when you want cleanup and turn-taking signals from the same component. **🟢 Beginner**

## 7. Audio enhancement and noise suppression

The audio reaching your VAD and STT is often noisy, reverberant, or mixed with background voices. **Cleaning the signal before the rest of the pipeline** is frequently the difference between an agent that ships and one that frustrates users in real-world conditions (cars, cafés, call centres). In 2026 every major voice-AI vendor ships a deep-learning suppressor on top of WebRTC's classic noise-suppression chain.

- [ai-coustics](https://ai-coustics.com/): Real-time speech enhancement SDK covering noise cancellation, voice isolation, and VAD; on-device and cloud deployment. See the [docs](https://docs.ai-coustics.com/) and [developer platform](https://developers.ai-coustics.com/). **🟢 Beginner**
- [Krisp SDK](https://krisp.ai/): Commercial-grade real-time noise and background-voice cancellation; the de facto standard for voice comms (Python, Node.js, Go, C++ SDKs). LiveKit's background voice cancellation and Pipecat Cloud both build on Krisp. Enterprise access via contact form. **🟢 Beginner**
- [DeepFilterNet (Rikorose/DeepFilterNet)](https://github.com/Rikorose/DeepFilterNet): Open-source, low-complexity real-time speech enhancement for full-band audio; designed to run on embedded devices. The strongest actively-developed OSS noise suppressor. **🟡 Intermediate**
- [RNNoise (xiph/rnnoise)](https://github.com/xiph/rnnoise): Classic hybrid DSP + deep-learning noise suppression; a tiny, well-understood baseline, but no longer actively maintained. **🟡 Intermediate**
- [Koala Noise Suppression (Picovoice)](https://picovoice.ai/platform/koala/): On-device, cross-platform voice isolation with self-serve access (browser, mobile, desktop, Raspberry Pi). **🟢 Beginner**
- [Noise Suppression Guide 2026 (Picovoice)](https://picovoice.ai/blog/complete-guide-to-noise-suppression/): Algorithms, intelligibility metrics (SII / STI / STOI), and implementation tradeoffs; note the commercial author. **🟡 Intermediate**

## 8. WebRTC fundamentals

WebRTC is the **default transport for voice agents** that don't run over the phone network. Understanding ICE, STUN, TURN, and SFU architecture is non-negotiable for production work.

- [MDN WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API): Authoritative free reference for `RTCPeerConnection`, `getUserMedia`, and signaling. **🟢 Beginner**
- [MDN: Introduction to WebRTC Protocols](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols): Beginner-friendly explanation of ICE, STUN, TURN, and SDP. **🟢 Beginner**
- [WebRTC.org Getting Started](https://webrtc.org/getting-started/overview): Official Google-maintained intro, splitting WebRTC into media-capture and connectivity. **🟢 Beginner**
- [GetStream: WebRTC for the Brave](https://getstream.io/resources/projects/webrtc/): Free multi-module tutorial covering networking basics through advanced topics. **🟢 Beginner**
- [Why WebRTC Beats WebSockets for Voice AI (LiveKit)](https://livekit.com/blog/why-webrtc-beats-websockets-for-voice-ai-agents): 2025 explainer aimed at AI builders, comparing transports in plain English. **🟡 Intermediate**
- [Daily Docs: Intro to Video Architecture (P2P vs SFU)](https://docs.daily.co/guides/architecture-and-monitoring/intro-to-video-arch): One of the clearest beginner write-ups of P2P vs SFU. **🟢 Beginner**
- [P2P, SFU, MCU, Hybrid: WebRTC Architecture Guide (Forasoft)](https://www.forasoft.com/blog/article/webrtc-architecture-guide-for-business-2026): Vendor-neutral 2026 breakdown of the four architectures with current OSS tooling (mediasoup, Janus, Jitsi). **🟡 Intermediate**
- [Agora: How WebRTC Works](https://www.agora.io/en/blog/how-does-webrtc-work/): Side-by-side WebRTC vs WebSockets walkthrough with signaling diagrams. **🟢 Beginner**

## 9. Telephony and SIP

The phone network has its own physics. Once you know which **SIP trunk provider** to point at LiveKit or Pipecat, you can ship.

- [Twilio Programmable Voice](https://www.twilio.com/en-us/voice): TwiML, Voice API, and PSTN connectivity in one hub; the default starting point. **🟢 Beginner**
- [Twilio: Voice AI Assistant with OpenAI Realtime + Python](https://www.twilio.com/en-us/blog/voice-ai-assistant-openai-realtime-api-python): Step-by-step junior-friendly tutorial wiring Twilio Media Streams to an LLM. **🟢 Beginner**
- [Twilio SIP Quickstart](https://www.twilio.com/docs/voice/sip/quickstart): Clearest beginner explainer of SIP basics, SIP Domains, and softphone setup. **🟢 Beginner**
- [Telnyx Voice API](https://telnyx.com/products/voice-api): Strong Twilio alternative with WebSocket media streaming and AI Assistant tooling. **🟢 Beginner**
- [Telnyx: How to Set Up a SIP Trunk](https://support.telnyx.com/en/articles/8096455-how-to-configure-a-sip-trunk): Friendly walkthrough of SIP trunking architecture, codecs, and authentication. **🟢 Beginner**
- [Plivo Voice API Documentation](https://www.plivo.com/docs/voice/): XML call control and audio-streaming integrations for AI agents. **🟢 Beginner**
- [SignalWire Voice Docs](https://developer.signalwire.com/voice/): Built on FreeSWITCH; SWML, TwiML-compatible API, and an AI Agents SDK. **🟡 Intermediate**
- [LiveKit SIP Primer](https://docs.livekit.io/reference/telephony/sip-primer/): Best diagram of how a call flows from PSTN → trunk → SIP service → agent. **🟢 Beginner**
- [LiveKit SIP Trunk Setup](https://docs.livekit.io/telephony/start/sip-trunk-setup/): Practical guide for wiring Twilio/Telnyx/Plivo/Wavix/Sinch trunks into LiveKit. **🟡 Intermediate**
- [Pipecat Telephony Overview](https://docs.pipecat.ai/guides/telephony/overview): Differences between WebSocket-based telephony and SIP-based call control. **🟡 Intermediate**

## 10. Tutorials and hands-on projects

Pick **one tutorial and finish it before starting another**. Voice AI is unforgiving of half-built pipelines.

- [LiveKit Voice AI Quickstart](https://docs.livekit.io/agents/start/voice-ai/): Official 10-minute walkthrough in Python or Node with starter templates. **🟢 Beginner**
- [Build Your First AI Voice Agent in Python (LiveKit)](https://livekit.com/blog/build-your-first-ai-voice-agent-python): End-to-end Python tutorial covering streaming, latency, and deployment. **🟢 Beginner**
- [Pipecat Quickstart](https://docs.pipecat.ai/getting-started/quickstart): Build and deploy a Deepgram + OpenAI + Cartesia bot via the Pipecat CLI in roughly 10 minutes. **🟢 Beginner**
- [How to Build a Real-Time Voice Agent with Pipecat (AssemblyAI)](https://www.assemblyai.com/blog/building-a-voice-agent-with-pipecat): Production-oriented walkthrough including local testing and Pipecat Cloud deployment. **🟡 Intermediate**
- [Build a Voice Agent with LiveKit (AssemblyAI)](https://www.assemblyai.com/blog/build-voice-agent-livekit): End-to-end walkthrough wiring LiveKit Agents + AssemblyAI Universal-3 Pro + Cartesia, run locally then on the Agents Playground. **🟡 Intermediate**
- [Deepgram: Build a Voice AI Agent](https://deepgram.com/learn/how-to-build-a-voice-ai-agent): Step-by-step guide wiring Deepgram STT, GPT, and Aura TTS. **🟢 Beginner**
- [Build a Voice Assistant with Twilio ConversationRelay + LiteLLM](https://www.twilio.com/en-us/blog/developers/tutorials/product/voice-ai-assistant-conversationrelay-litellm-python): Provider-agnostic tutorial supporting OpenAI, Anthropic, or DeepSeek. **🟡 Intermediate**
- [freeCodeCamp: Build Advanced AI Agents (LiveKit, Exa, LangChain)](https://www.youtube.com/watch?v=B0TJC4lmzEM): Free 3-part video course covering interactive voice agents end-to-end. **🟢 Beginner**
- [freeCodeCamp: Build a Voice AI Agent with Open-Source Tools](https://www.freecodecamp.org/news/how-to-build-a-voice-ai-agent-using-open-source-tools/): Hands-on local stack covering open-source STT, a local LLM, and system TTS, plus the cascaded vs end-to-end tradeoff. **🟡 Intermediate**

## 11. GitHub starter repos and awesome lists

Clone these instead of writing boilerplate from scratch.

- [livekit/agents](https://github.com/livekit/agents): The flagship open-source Python/Node framework for production voice agents (tip: pair it with the LiveKit Docs MCP server and Agent Skill for AI-assisted builds). **🟢 → 🔴**
- [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat): Vendor-neutral framework with 40+ STT/LLM/TTS service plugins. **🟢 → 🔴**
- [livekit-examples/agent-starter-python](https://github.com/livekit-examples/agent-starter-python): Production-ready starter with Dockerfile, eval suite, turn detector, and core plugins. **🟢 Beginner**
- [livekit-examples (org)](https://github.com/livekit-examples): Official collection of LiveKit Python/React/Swift/Android starters. **🟢 Beginner**
- [pipecat-ai/pipecat-examples](https://github.com/pipecat-ai/pipecat-examples): Sample apps for push-to-talk, websocket, telephony, and multimodal use cases. **🟢 → 🟡**
- [elevenlabs/elevenlabs-examples](https://github.com/elevenlabs/elevenlabs-examples): Runnable Next.js and Python examples for TTS, STT, and real-time agents. **🟢 Beginner**
- [kwindla/macos-local-voice-agents](https://github.com/kwindla/macos-local-voice-agents): Pipecat example hitting sub-800 ms voice-to-voice latency entirely on M-series Macs. **🟡 Intermediate**
- [zzw922cn/awesome-speech-recognition-speech-synthesis-papers](https://github.com/zzw922cn/awesome-speech-recognition-speech-synthesis-papers): Comprehensive curated index of ASR, TTS, voice conversion, and speech-LLM papers. **🟡 Intermediate**
- [wildminder/awesome-ai-voice](https://github.com/wildminder/awesome-ai-voice): Actively maintained 2026 list of open-source TTS, voice-cloning, and audio/music-generation models. **🟢 Beginner**

## 12. Datasets and benchmarks

You'll rarely train from scratch, but knowing **which dataset a model was trained on** explains its accents, languages, and failure modes.

- [LibriSpeech ASR Corpus](https://www.openslr.org/12): ~1,000 hours of English audiobooks; nearly every ASR paper benchmarks against it. **🟢 Beginner**
- [Mozilla Common Voice](https://commonvoice.mozilla.org/): Crowdsourced multilingual dataset (100+ languages); the easiest legal way to fine-tune ASR. **🟢 Beginner**
- [Common Voice on HuggingFace](https://huggingface.co/datasets/mozilla-foundation/common_voice_17_0): One-line `load_dataset()` access for hands-on experiments. The official `mozilla-foundation` releases top out around v17; newer corpus versions (up to v22) are hosted on community mirrors. **🟢 Beginner**
- [Open ASR Leaderboard](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard): Live comparison of 60+ ASR models on WER and real-time factor. **🟢 Beginner**
- [Artificial Analysis: Speech](https://artificialanalysis.ai/speech-to-text): Independent benchmarks of commercial STT and TTS providers. **🟢 Beginner**
- [LJSpeech Dataset](https://keithito.com/LJ-Speech-Dataset/): ~24 hours of single-speaker English audio; baseline corpus for Tacotron 2 and VITS. **🟢 Beginner**
- [VCTK Corpus](https://datashare.ed.ac.uk/handle/10283/3443): ~110 English speakers with diverse accents; widely used for multi-speaker TTS. **🟡 Intermediate**
- [VoxCeleb (Oxford VGG)](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/): Million-utterance "in the wild" dataset for speaker identification and verification. **🟡 Intermediate**

## 13. Beginner-accessible research papers

These are the **landmark papers behind the models you'll actually use**. Read the Whisper and Common Voice papers first: they're unusually approachable.

- [Whisper: Robust Speech Recognition via Large-Scale Weak Supervision (2022)](https://arxiv.org/abs/2212.04356): Behind the most popular open ASR model; unusually clear prose for an ML paper. **🟡 Intermediate**
- [HuggingFace Whisper fine-tuning blog (companion)](https://huggingface.co/blog/fine-tune-whisper): Hands-on walkthrough that lets you "feel" the Whisper paper in code. **🟢 Beginner**
- [VITS: Conditional VAE with Adversarial Learning for End-to-End TTS (2021)](https://arxiv.org/abs/2106.06103): The single-stage TTS model behind many open-source voice cloners. **🟡 Intermediate**
- [Tacotron 2: Natural TTS Synthesis (2017)](https://arxiv.org/abs/1712.05884): Landmark seq2seq + WaveNet-vocoder paper that made neural TTS sound natural. **🟡 Intermediate**
- [Conformer: Convolution-augmented Transformer for ASR (2020)](https://arxiv.org/abs/2005.08100): The architecture inside NVIDIA Parakeet, Canary, and many leaderboard models. **🟡 Intermediate**
- [wav2vec 2.0: Self-Supervised Learning of Speech Representations (2020)](https://arxiv.org/abs/2006.11477): Showed that pretraining on unlabeled audio drastically reduces labeled-data needs. **🟡 Intermediate**
- [Common Voice: A Massively-Multilingual Speech Corpus (2020)](https://arxiv.org/abs/1912.06670): Short, accessible paper describing how Common Voice is built and validated. **🟢 Beginner**
- [Moshi: A Speech-Text Foundation Model for Real-Time Dialogue (2024)](https://arxiv.org/abs/2410.00037): The first real-time full-duplex spoken LLM; introduces the Mimi codec and the "Inner Monologue" method (time-aligned text before audio tokens). **🔴 Advanced**
- [Open ASR Leaderboard preprint (2025)](https://arxiv.org/abs/2510.06961): Reproducible benchmark of 60+ ASR models across 11 datasets; the modern landscape map. **🟡 Intermediate**
- [Full-Duplex-Bench: Evaluating Full-Duplex Spoken Dialogue Models on Turn-Taking (2025)](https://arxiv.org/abs/2503.04721): A reproducible benchmark for interruption handling and turn-taking in speech-to-speech models. **🟡 Intermediate**

## 14. Evaluation and testing

You can't ship what you can't measure. **Voice-agent evaluation is fundamentally probabilistic**: a single transcript can pass and fail across runs, so simulation and statistics matter more than fixed test cases.

- [Coval: Voice AI Testing Platform](https://www.coval.ai/): Defines the core voice-agent metrics: TTFB, WER, resolution rate, simulated accents, and interruptions. **🟢 Beginner**
- [Coval: How to Evaluate Voice Agents (Practical Guide)](https://www.coval.ai/blog/how-to-evaluate-voice-agents-a-practical-guide-to-testing-and-quality-assurance): One of the most cited 2025 guides on probabilistic vs deterministic evaluation. **🟢 Beginner**
- [Cekura: Metrics Overview](https://docs.cekura.ai/documentation/key-concepts/metrics/overview): Predefined metrics, instruction-following checks, and simulation framework. **🟢 Beginner**
- [Cekura: Performance Testing for Voice Agents](https://www.cekura.ai/blogs/performance-testing-voice-agents-practical-guide-cekura): Practical 2025 guide on multi-turn simulation and edge-case generation. **🟡 Intermediate**
- [Hamming AI](https://hamming.ai/): Production-focused QA platform with simulation, load testing, and 50+ metrics. **🟡 Intermediate**
- [Hamming: Voice Agent Evaluation Metrics Guide](https://hamming.ai/resources/voice-agent-evaluation-metrics-guide): Reference of latency percentiles, WER, MOS-style quality, and task completion with formulas. **🟡 Intermediate**
- [LiveKit: Understand and Improve Agent Latency](https://livekit.com/blog/understand-and-improve-agent-latency): Per-turn latency metrics (e2e, LLM TTFT, TTS TTFB) and where to optimize. **🟡 Intermediate**
- [Twilio: How Do You Know if Your Voice AI Agents Are Working?](https://www.twilio.com/en-us/blog/developers/evaluating-voice-ai-agents): Vendor-neutral 2025 guide arguing for business-outcome metrics over raw WER/latency. **🟢 Beginner**
- [Future AGI simulate-sdk](https://github.com/future-agi/simulate-sdk): Open-source voice AI simulation SDK for testing AI agents; generates synthetic conversations for evaluation. **🟡 Intermediate**
- [Future AGI](https://github.com/future-agi/future-agi): Open-source platform to simulate, evaluate, trace, guardrail, and optimize voice and AI agent apps in one feedback loop, with persona-driven simulation and 50+ eval metrics. **🟡 Intermediate**

## 15. Production, deployment, and scaling

Real production voice infrastructure is **the hardest unsolved problem in this space**. Read these before quoting anyone a per-minute price.

- [LiveKit: Deploy and scale agents on LiveKit Cloud](https://livekit.com/blog/deploy-and-scale-agents-on-livekit-cloud/): Real-world write-up on stateful load balancing, autoscaling, and warm pools. **🟡 Intermediate**
- [LiveKit: Why You Shouldn't Build Voice Agents Directly on Model APIs](https://livekit.com/blog/real-time-voice-agents-vs-model-apis): Honest breakdown of what raw model APIs don't give you. **🟡 Intermediate**
- [Latent Space: OpenAI Realtime API: The Missing Manual](https://www.latent.space/p/realtime-api): Field-tested guide from Pipecat's creator on Realtime API production realities. **🟡 Intermediate**
- [TWIML: Building Voice AI Agents That Don't Suck (Kwindla Kramer)](https://twimlai.com/podcast/twimlai/building-voice-ai-agents-that-dont-suck): One-hour discussion on real production architecture and turn-taking. **🟡 Intermediate**
- [AWS: Voice Agents with Pipecat and Amazon Bedrock](https://aws.amazon.com/blogs/machine-learning/building-intelligent-ai-voice-agents-with-pipecat-and-amazon-bedrock-part-1/): Full architecture walkthrough including latency optimization and Nova Sonic. **🟡 Intermediate**
- [Deepgram: STT API Pricing Breakdown](https://deepgram.com/learn/speech-to-text-api-pricing-breakdown-2025): Vendor-by-vendor per-minute economics: required reading before signing any contract. **🟢 Beginner**
- [Sierra: Shipping and Scaling AI Agents](https://sierra.ai/blog/shipping-and-scaling-ai-agents): Case-study on Sonos, SiriusXM, and OluKai voice deployments. **🟡 Intermediate**
- [Sierra: Constellation of Models](https://sierra.ai/blog/constellation-of-models): How a leading CX company composes 15+ models per agent. **🟡 Intermediate**
- [LiveKit Agent Observability](https://livekit.com/products/agent-observability): Built-in tracing, transcripts, and per-stage latency for LiveKit Cloud. **🟢 Beginner**

## 16. Ethics, safety, and regulation

If you're shipping a voice agent in 2026, **disclosure and consent are no longer optional**. The FCC and EU AI Act both have teeth.

- [FCC: AI-Generated Voices in Robocalls Illegal (Feb 2024)](https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal): The landmark TCPA ruling every U.S. voice-agent dev must read. **🟢 Beginner**
- [EU AI Act: Article 50 (Transparency for Deepfakes & AI Interactions)](https://artificialintelligenceact.eu/article/50/): Authoritative text of EU disclosure rules; transparency obligations apply from 2 August 2026 (systems already on the market before that date have until 2 December 2026 to comply). **🟡 Intermediate**
- [European Commission: Code of Practice on AI-Generated Content](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content): Official EU implementation guidance on watermarking and labelling; the finalized Code was published on 10 June 2026. **🟡 Intermediate**
- [FTC: Approaches to Address AI-Enabled Voice Cloning](https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/04/approaches-address-ai-enabled-voice-cloning): Plain-English summary of the Voice Cloning Challenge winners and Impersonation Rule. **🟢 Beginner**
- [FTC: Proposed Rule on AI Impersonation of Individuals (Feb 2024)](https://www.ftc.gov/news-events/news/press-releases/2024/02/ftc-proposes-new-protections-combat-ai-impersonation-individuals): Direct source on U.S. impersonation-fraud rules covering AI deepfakes. **🟢 Beginner**
- [Pindrop: Voice Intelligence & Security Report](https://www.pindrop.com/research/report/voice-intelligence-security-report/): Industry report documenting the sharp rise in deepfake fraud attempts. **🟢 Beginner**
- [Voice Cloning Ethics (CAMB.AI)](https://www.camb.ai/blog-post/voice-cloning-ethics-consent-deepfakes-responsible-ai-voice-use): Practical overview of consent frameworks, ELVIS Act, and EU AI Act. **🟢 Beginner**
- [NCLC: Top Six TCPA/Robocall Developments 2024/2025](https://library.nclc.org/article/top-six-tcparobocall-developments-20242025): Consumer-protection lens on what's actually being enforced. **🟡 Intermediate**

## 17. Blogs and newsletters

Subscribe to two or three to stay current: the field moves quickly.

- [LiveKit Blog](https://livekit.com/blog/): Engineering deep-dives on WebRTC, agents framework releases, and production patterns.
- [Deepgram Learn](https://deepgram.com/learn): Tutorials on STT/TTS, voice agent design, evals, and pipeline architecture.
- [Cartesia Blog](https://cartesia.ai/blog): State-space TTS models, Sonic releases, and yearly "State of Voice AI" reports.
- [ElevenLabs Blog](https://elevenlabs.io/blog): Product and research announcements with implementation notes.
- [Daily.co Blog (Pipecat)](https://www.daily.co/blog/): Posts from Pipecat's maintainers covering scaling and feature releases.
- [Voice AI & Voice Agents: An Illustrated Primer](https://voiceaiandvoiceagents.com/): Free, regularly-updated long-form primer.
- [Voice AI Space](https://www.voiceaispace.com/): Vendor-neutral hub for the voice AI ecosystem: a curated product and tool directory, the Voice AI Newsroom, tutorials and repos, a jobs board, and community meetups.
- [Voice AI Newsletter (Krisp)](https://voice-ai-newsletter.krisp.ai/): "Future of Voice AI" interview series with founders.
- [Voice AI Weekly (Vapi)](https://vapivoice.substack.com/): Weekly Substack rounding up news, products, and tools.

## 18. Podcasts

- [Deepgram AI Minds](https://deepgram.com/podcast): Founder and builder interviews across the voice AI ecosystem.
- [The Future of Voice AI (Krisp)](https://podcasts.apple.com/us/podcast/the-future-of-voice-ai/id1809847184): Weekly founder interviews focused on enterprise voice AI architecture.
- [TWIML AI Podcast: voice episodes](https://podcasts.apple.com/us/podcast/building-voice-ai-agents-that-dont-suck-with-kwindla-kramer/id1116303051?i=1000717421464): Strong technical interviews; the Kwin Kramer episode is a great starting point.
- [This Week In Voice (Project Voice)](https://thisweekinvoice.substack.com/): News-roundtable format covering conversational AI.

## 19. Communities

- [LiveKit Community Slack](https://livekit.io/join-slack): Direct access to maintainers and other agent builders.
- [Pipecat Discord](https://discord.com/invite/pipecat): Active community with weekly office hours; invite link from the homepage.
- [HuggingFace Discord: #ml-for-audio-and-speech](https://hf.co/join/discord): 200k-member server with strong audio/speech channels.
- [Vapi Discord](https://discord.com/invite/mGpJhPkU5Y): Builder community for Vapi voice agents; invite from the homepage.
- [Retell AI Community](https://community.retellai.com/?_gl=1*11wnryf*_gcl_au*MTg0MzA5NjAxOC4xNzgxNjQzMTU5): Forum for Retell developers building phone-call voice agents.
- [ElevenLabs Discord](https://discord.gg/elevenlabs): Large TTS, voice cloning, and Conversational AI community with daily help threads.
- [Deepgram Discord](https://discord.com/invite/deepgram): STT/TTS/Voice Agent API support and build-with-us threads.
- [Reddit: r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/): Active threads on local Whisper/Parakeet, on-device TTS, and end-to-end voice stacks.
- [Reddit: r/AI_Agents](https://www.reddit.com/r/AI_Agents/): General AI-agent community where voice topics surface frequently.

## 20. Conferences and events

- [AI Engineer World's Fair](https://www.ai.engineer/worldsfair): Biggest AI-engineering conference; the Voice track has hosted major launches from ElevenLabs, Vapi, LiveKit, Pipecat, and Cartesia. The 2026 edition runs 29 June - 2 July 2026 at Moscone West, San Francisco.
- [AI Engineer YouTube channel](https://www.youtube.com/@aiDotEngineer): All World's Fair and Summit talks are posted free; the best library of recent voice-AI talks.
- [AI Engineer Summit Online: Voice playlist](https://www.youtube.com/playlist?list=PLcfpQ4tk2k0VetQVGT1EqTbcr-qcgbfFs): Curated playlist including voice-track sessions from leading labs.
- [AIEWF 2025 Recap (Latent Space)](https://www.latent.space/p/aiewf-2025-keynotes): Written deep-dive into 2025's voice-track talks and major launches.
- [VOICE & AI (Modev)](https://www.voicesummit.ai/): Long-running voice technology conference with broader CX and voicebot focus, happening on Oct 5–7, 2026
- [Interspeech 2026](https://interspeech2026.org/): Top academic speech-science conference; intimidating but worth knowing, since most landmark papers debut here. Sydney, Australia, 27 September - 1 October 2026.

## 21. Hackathons and competitions

- [ElevenHacks (weekly sprints)](https://hacks.elevenlabs.io/): Weekly themed challenges with credits and prizes; low-pressure way to ship one project per week. **🟢 Beginner**
- [AI Engineer World's Fair Hackathon](https://cerebralvalley.ai/e/aiewf-hackathon-2026): Co-located with the conference; $10K prizes judged by 3,000+ AI engineers, with a strong voice track, happening on Jun 27 at 9:00 AM - Jun 28 at 5:00 PM (PDT). **🟡 Intermediate**
- [lablab.ai AI Hackathons](https://lablab.ai/event): Continuous calendar of short online hackathons frequently sponsored by voice-AI vendors. **🟢 Beginner**
- [Devpost: Voice AI Hackathons](https://devpost.com/hackathons?search=voice+ai): Centralized search for active voice-AI hackathons; the best way to find what's open right now. **🟢 Beginner**

---

## Suggested learning path

1. **Week 1: Foundations:** Read the LiveKit pipeline post and Voice AI Illustrated Primer (sections 1, 8).
2. **Week 2: First agent:** Finish the LiveKit _or_ Pipecat quickstart end-to-end (sections 2, 10).
3. **Week 3: Components:** Swap STT, TTS, and LLM providers; benchmark latency (sections 3, 4, 5).
4. **Week 4: Turn-taking, audio cleanup & telephony:** Add Silero VAD, a turn detector, and a speech-enhancement pass; connect a SIP trunk (sections 6, 7, 9).
5. **Week 5: Production:** Add evaluation, observability, and read the FCC/EU AI Act material (sections 14, 15, 16).
6. **Ongoing:** Subscribe to two newsletters, follow Voice AI Space, and join the Voice AI community on [LinkedIn group](https://www.linkedin.com/groups/14269127/) (sections 17, 18, 19).

## Contributing

Pull requests welcome. Resources must be **active in the last 12 months**, **accessible to developers**, and **vendor-neutral or clearly labeled** when authored by a commercial party. Open an issue to suggest additions or removals. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

## ⭐ Stargazers and contributors

[![Star History Chart](https://api.star-history.com/svg?repos=mahimairaja/voiceai&type=Date)](https://star-history.com/#mahimairaja/voiceai&Date)

<a href="https://github.com/mahimairaja/voiceai/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mahimairaja/voiceai&max=40&columns=10&anon=0" alt="Contributors" />
</a>

## 📜 License

[MIT](LICENSE). Fork it, ship it.
